import {INavbarData} from "./helper";

export const navbarDataAdmin: INavbarData[] = [
  {
    routeLink: 'owners',
    icon: 'fal fa-users',
    label: 'Propietarios'
  },
  {
    routeLink: 'allergies',
    icon: 'fal fa-disease',
    label: 'Alergias'
  },
  {
    routeLink: 'pets',
    icon: 'fal fa-paw',
    label: 'Mascotas'
  },
  {
    routeLink: 'users',
    icon: 'fal fa-user-doctor',
    label: 'Usuarios',
  },
  {
    routeLink: 'logout',
    icon: 'fal fa-right-from-bracket',
    label: 'Cerrar sesión'
  },
];
