import {
    Entity,
    Column,
    JoinColumn,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne
} from "typeorm"
import {UserType} from "../UserType";
import {Person} from "./Person";

@Entity()
export class Doctor extends Person {
    @Column({type: 'boolean', default: true})
    IsActive: boolean = true
    @CreateDateColumn()
    UpdatedAt: Date
    @Column()
    CreateAt: Date
    @Column()
    FirebaseId: string
    @ManyToOne(() => UserType)
    @JoinColumn()
    UserType: UserType
}
