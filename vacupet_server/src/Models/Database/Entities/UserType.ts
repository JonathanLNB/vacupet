import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class UserType {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Name: string
}
