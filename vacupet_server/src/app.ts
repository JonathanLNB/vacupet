import {App} from "./application";
import "reflect-metadata"

const port: number = parseInt(process.env.PORT) || 3000;
const app = new App(port, []);
app.listen();
