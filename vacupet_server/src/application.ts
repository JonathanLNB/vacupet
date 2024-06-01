import express, {Application, Router} from "express";
import cors from 'cors';
import basicAuth from 'express-basic-auth';
import AppDataSource from "./Database";
import {NotFound, ErrorHandler} from './Middlewares/handler';
import {GetUnauthorizedResponse, IsAuth} from './Middlewares/sessions';
import adminFB from "firebase-admin";
import pkg from "../package.json";
//import fileUpload from "express-fileupload";
import {Paths} from "./Enums/Paths";
import {GetSessionRoutes} from "./Routes/SessionRouter";
import {GetCollectionsRoutes} from "./Routes/CollectionsRouter";
import {GetUsersRoutes} from "./Routes/UsersRouter";
import {GetSettingRoutes} from "./Routes/SettingsRoutes";
import {decrypt, decryptENV, encrypt} from "./Tools/Utils";

const AdminFirebaseFile = require("../config/firebase_admin_vacupet.json");

export class App {
    public app: Application;
    private router: Router;

    constructor(private port: number, routes: Array<express.Router>, private apiPath: string = '/api', private staticPath: string = "public") {
        this.server();
        this.cors();
        this.firebase();
       /* this.database().then(() => {
            this.assets(this.staticPath);
            this.routes();

            /*this.app.use(basicAuth({
                users: JSON.parse(decryptENV(process.env.BA_USERPASS)),
                unauthorizedResponse: GetUnauthorizedResponse
            }));

            this.app.use('/api/session', GetSessionRoutes(AppDataSource));

            this.app.use(NotFound);
            this.app.use(ErrorHandler);
            console.log("System intialized");
        });*/

        this.cors();


    }

    private server() {
        this.app = express();
        this.app.use(express.json({limit: '50mb'}));
        this.app.use(express.urlencoded({limit: '50mb', extended: true}));
        //this.app.use(fileUpload({}));
    }

    private routes() {
        this.app.use("/api/collection", IsAuth, GetCollectionsRoutes(AppDataSource));
        this.app.use("/api/user", IsAuth, GetUsersRoutes(AppDataSource));
        this.app.use("/api/setting", IsAuth, GetSettingRoutes(AppDataSource));
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
            await AppDataSource.initialize();
        } catch (e) {
            console.error("Error initializing database", e)
        }
    }
}



