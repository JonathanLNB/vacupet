import express, {Application, Router} from "express";
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import {NotFound, ErrorHandler} from './Middlewares/handler';
import {GetUnauthorizedResponse, IsAuth} from './Middlewares/sessions';
import adminFB from "firebase-admin";
import pkg from "../package.json";
//import fileUpload from "express-fileupload";
import {Paths} from "./Enums/Paths";
import {GetSessionRoutes} from "./Routes/SessionRoutes";
import {GetCollectionsRoutes} from "./Routes/CollectionsRoutes";
import {GetUsersRoutes} from "./Routes/UsersRoutes";
import {GetSettingsRoutes} from "./Routes/SettingsRoutes";
import {GetOwnersRoutes} from "./Routes/OwnersRoutes";
import {GetPetsRoutes} from "./Routes/PetsRoutes";
import {GetAllergiesRoutes} from "./Routes/AllergiesRoutes";
import {decryptENV, encryptENV} from "./Tools/Utils";
import {DataSource, DataSourceOptions} from "typeorm";
import {Person} from "./Models/Database/Entities/Person/Person";
import {Setting} from "./Models/Database/Entities/Setting";
import {User} from "./Models/Database/Entities/Person/User";
import {UserType} from "./Models/Database/Entities/UserType";
import {Allergy} from "./Models/Database/Entities/Allergy";
import {Pet} from "./Models/Database/Entities/Pet";
import {Owner} from "./Models/Database/Entities/Person/Owner";
import {PetType} from "./Models/Database/Entities/PetType";
import {Vaccine} from "./Models/Database/Entities/Vaccine";
import {Vaccinated} from "./Models/Database/Entities/Vaccinated";

const AdminFirebaseFile = require(process.env.FIREBASE_ADMIN_FILE);

export class App {
    public app: Application;
    private router: Router;
    private AppDataSource: DataSource;

    constructor(private port: number, routes: Array<express.Router>, private apiPath: string = '/api', private staticPath: string = "public") {
        this.server();
        this.cors();
        this.firebase().then(() => {
            this.database().then(() => {
                this.assets(this.staticPath);
                this.routes();
                this.app.use(basicAuth({
                    users: JSON.parse(decryptENV(process.env.BA_USERPASS)),
                    unauthorizedResponse: GetUnauthorizedResponse
                }));

                this.app.use('/api/session', GetSessionRoutes(this.AppDataSource));

                this.app.use(NotFound);
                this.app.use(ErrorHandler);
                console.log("System intialized");
            });
        });
    }

    private server() {
        this.app = express();
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({limit: '50mb', extended: true}));
        //this.app.use(fileUpload({}));
    }

    private routes() {
        this.app.use("/api/collection", IsAuth, GetCollectionsRoutes(this.AppDataSource));
        this.app.use("/api/user", IsAuth, GetUsersRoutes(this.AppDataSource));
        this.app.use("/api/setting", IsAuth, GetSettingsRoutes(this.AppDataSource));
        this.app.use("/api/allergy", IsAuth, GetAllergiesRoutes(this.AppDataSource));
        this.app.use("/api/owner", IsAuth, GetOwnersRoutes(this.AppDataSource));
        this.app.use("/api/pet", IsAuth, GetPetsRoutes(this.AppDataSource));
    }


    private assets(path: string) {
        this.app.use(express.static(path));
        this.app.use(Paths.DefaultServicePath, express.static(path));
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log("Server listening on port:", this.port);
            console.log("Version:", pkg.version);
        });
    }

    private cors() {
        const corsConfig = {
            origin: '*',
            optionsSuccessStatus: 200
        };
        this.app.use(cors(corsConfig));
        this.app.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
            next();
        });
    }

    private async firebase() {
        adminFB.initializeApp({
            credential: adminFB.credential.cert(AdminFirebaseFile)
        });
        const remoteConfig = JSON.parse(JSON.stringify((await adminFB.remoteConfig().getTemplate()).parameters));
        process.env.ENV_SECRET_KEY = remoteConfig['SECRET_KEY'].defaultValue.value;
        process.env.ENV_SECRET_IV = remoteConfig['SECRET_IV'].defaultValue.value;
    }

    private async database(): Promise<void> {
        try {
            const DataSourceOptions: DataSourceOptions = {
                type: "postgres",
                host: decryptENV(process.env.DATABASE_HOST),
                port: Number.parseInt(decryptENV(process.env.DATABASE_PORT)),
                username: decryptENV(process.env.DATABASE_USER),
                password: decryptENV(process.env.DATABASE_PASSWORD),
                database: decryptENV(process.env.DATABASE_DB),
                synchronize: true,
                logging: false,
                entities: [Person, Setting, User, UserType, Allergy, Pet, Owner, PetType, Vaccine, Vaccinated],
                migrations: ["src/migrations/**/*.ts"]
            };
            this.AppDataSource = new DataSource(DataSourceOptions);
            await this.AppDataSource.initialize();
        } catch (e) {
            console.error("Error initializing database", e)
        }
    }
}



