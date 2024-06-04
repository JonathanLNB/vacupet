import {
    Entity,
    Column,
    JoinColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm"
import {UserType} from "../UserType";
import {Person} from "./Person";
import {Owner} from "./Owner";

@Entity()
export class User extends Person {
    @Column({type: 'boolean', default: true})
    IsActive: boolean = true
    @CreateDateColumn()
    UpdatedAt: Date
    @CreateDateColumn()
    CreatedAt: Date
    @Column()
    FirebaseId: string
    @ManyToOne(() => UserType)
    @JoinColumn()
    UserType: UserType
    Owner?: Owner;
}
