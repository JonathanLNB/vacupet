import {Entity, Column, PrimaryGeneratedColumn} from "typeorm"

@Entity()
export class Setting {
    @PrimaryGeneratedColumn("uuid")
    Id: string
    @Column()
    Name: string
    @Column()
    Description: string
    @Column()
    Value: string
}
