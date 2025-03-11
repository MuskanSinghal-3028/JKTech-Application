import { MigrationInterface, QueryRunner } from "typeorm";

export class Posts1741679665186 implements MigrationInterface {
    name = 'Posts1741679665186'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "jktech"."posts" ("id" SERIAL NOT NULL, "title" character varying NOT NULL, "description" character varying, "user" character varying NOT NULL, "created_at" bigint NOT NULL DEFAULT '0', "updated_at" bigint NOT NULL DEFAULT '0', CONSTRAINT "PK_2829ac61eff60fcec60d7274b9e" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "jktech"."posts"`);
    }

}
