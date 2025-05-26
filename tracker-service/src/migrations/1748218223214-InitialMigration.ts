import { MigrationInterface, QueryRunner } from "typeorm";

export class InitialMigration1748218223214 implements MigrationInterface {
    name = 'InitialMigration1748218223214'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."readings_status_enum" AS ENUM('not_started', 'in_progress', 'completed', 'paused')`);
        await queryRunner.query(`CREATE TABLE "readings" ("id" SERIAL NOT NULL, "userId" integer NOT NULL, "bookTitle" character varying(255) NOT NULL, "currentPage" integer NOT NULL DEFAULT '0', "totalPages" integer NOT NULL, "status" "public"."readings_status_enum" NOT NULL DEFAULT 'not_started', "startDate" date, "completionDate" date, "readingProgress" double precision NOT NULL DEFAULT '0', "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_a0f3aa79140b41884f2e53ba52a" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "username" character varying(255) NOT NULL, "email" character varying(255) NOT NULL, "password" character varying(255) NOT NULL, "totalBooksRead" integer NOT NULL DEFAULT '0', CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "readings" ADD CONSTRAINT "FK_c2a7827076a2ca8393ef61a0255" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "readings" DROP CONSTRAINT "FK_c2a7827076a2ca8393ef61a0255"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TABLE "readings"`);
        await queryRunner.query(`DROP TYPE "public"."readings_status_enum"`);
    }

}
