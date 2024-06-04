variable "region" {}
variable "node_count" {}
variable "machine_size" {}

variable "db_user" {}
variable "db_ps" {}
variable "db_name" {}

terraform {
  backend "remote" {
    organization = "JonathanLNB"

    workspaces {
      name = "CodigoFacilito_Kuber"
    }
  }
  required_providers {
    digitalocean = {
      source  = "digitalocean/digitalocean"
      version = "~> 2.16.0"
    }

    kubernetes = {
      source  = "hashicorp/kubernetes"
      version = "~> 2.6.0"
    }

    kubectl = {
      source  = "gavinbunney/kubectl"
      version = ">= 1.7.0"
    }
  }
}

resource "digitalocean_project" "codigo_facilito_devops" {
  name        = "codigo-facilito-devops"
  description = "Proyecto final del Bootcamp de Código Facilito"
  purpose     = "Publicar una aplicación con lo aprendido en el Bootcamp"
  environment = "Development"

  resources = [
    digitalocean_kubernetes_cluster.vacupet.urn
  ]
}

resource "digitalocean_vpc" "k8s" {
  name   = "k8s-vpc"
  region = var.region

  timeouts {
    delete = "4m"
  }
}

data "digitalocean_kubernetes_versions" "prefix" {
  version_prefix = "1.21."
}

resource "digitalocean_kubernetes_cluster" "vacupet" {
  name         = "vacupet"
  region       = var.region
  auto_upgrade = true
  version      = data.digitalocean_kubernetes_versions.prefix.latest_version

  vpc_uuid = digitalocean_vpc.k8s.id

  maintenance_policy {
    start_time = "04:00"
    day        = "sunday"
  }

  node_pool {
    name       = "worker-pool"
    size       = var.machine_size
    node_count = var.node_count
  }
}

provider "kubernetes" {
  host  = digitalocean_kubernetes_cluster.vacupet.endpoint
  token = digitalocean_kubernetes_cluster.vacupet.kube_config[0].token
  cluster_ca_certificate = base64decode(
    digitalocean_kubernetes_cluster.vacupet.kube_config[0].cluster_ca_certificate
  )
}

provider "kubectl" {
  host  = digitalocean_kubernetes_cluster.vacupet.endpoint
  token = digitalocean_kubernetes_cluster.vacupet.kube_config[0].token
  cluster_ca_certificate = base64decode(
    digitalocean_kubernetes_cluster.vacupet.kube_config[0].cluster_ca_certificate
  )
  load_config_file = false
}

resource "kubernetes_secret" "vacupet_secret" {
  metadata {
    name      = "vacupet-secret"
    namespace = "default"
  }

  data = {
    db_user = var.db_user
    db_ps = var.db_ps
    db_name = var.db_name
  }

  type = "Opaque"
}

resource "kubernetes_persistent_volume_claim" "vacupet_database_claim" {
  metadata {
    name = "vacupet_database_claim-postgresql"
  }
  spec {
    access_modes = ["ReadWriteMany"]
    resources {
      requests = {
        storage = "1Gi"
      }
    }
    volume_name = "${kubernetes_persistent_volume.vacupet_database_volume.metadata.0.name}"
  }
}


resource "kubernetes_persistent_volume" "vacupet_database_volume" {
  metadata {
    name = "vacupet-database-volume-postgresql"
  }
  spec {
    capacity = {
      storage = "2Gi"
    }
    access_modes = ["ReadWriteMany"]
    persistent_volume_source {
      vsphere_volume {
        volume_path = "/data/postgresql"
      }
    }
  }
}

data "kubectl_path_documents" "docs" {
  pattern = "./deployment/*.yaml"
}

resource "kubectl_manifest" "kubegres" {
  for_each  = toset(data.kubectl_path_documents.docs.documents)
  yaml_body = each.value
}
