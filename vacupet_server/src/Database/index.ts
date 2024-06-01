import "reflect-metadata"
import {DataSource} from "typeorm"
import {Person} from "../Models/Database/Entities/Person/Person";
import {Setting} from "../Models/Database/Entities/Setting";
import {User} from "../Models/Database/Entities/Person/User";
import {UserType} from "../Models/Database/Entities/UserType";

const AppDataSource = new DataSource({

    type: "postgres",
    host: process.env.PSQL_DATABASE_HOST,
    port: Number.parseInt(process.env.PSQL_DATABASE_PORT),
    username: process.env.PSQL_DATABASE_USER,
    password: process.env.PSQL_DATABASE_PASSWORD,
    database: process.env.PSQL_DATABASE_DB,
    synchronize: true,
    logging: false,
    entities: [Person, Setting, User, UserType,],
    migrations: ["src/migrations/**/*.ts"]
});
export default AppDataSource;
