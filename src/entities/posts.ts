import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Posts {

    @PrimaryGeneratedColumn()
    id: number

    @Column({
        nullable: false,
    })
    title: string

    @Column({
        nullable: true,
    })
    description: string
    @Column({
        nullable: false,
    })
    user: string
    @Column({
        nullable: false,
        type: "bigint",
        default: 0
    })
    created_at: number

    @Column({
        nullable: false,
        type: "bigint",
        default: 0
    })
    updated_at: number
    @BeforeInsert()
    onCreation(){
        this.created_at = Date.now();
        this.updated_at = Date.now();
    }

    @BeforeUpdate()
    onUpdate() {
        this.updated_at = Date.now();
    }

}