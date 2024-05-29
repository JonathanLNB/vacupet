import {Column, Entity} from "typeorm";
import {Person} from "./Person";

@Entity()
export class Owner extends Person {
    @Column()
    Address: string
    @Column()
    FirebaseId: string
}
