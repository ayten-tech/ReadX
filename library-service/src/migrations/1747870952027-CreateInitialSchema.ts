import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateInitialSchema1747870952027 implements MigrationInterface {
    name = 'CreateInitialSchema1747870952027'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // Create authors table
        await queryRunner.query(`
            CREATE TABLE "authors" (
                "id" SERIAL NOT NULL,
                "name" character varying(255) NOT NULL,
                "biography" text,
                CONSTRAINT "PK_authors" PRIMARY KEY ("id")
            )
        `);

        // Create books table
        await queryRunner.query(`
            CREATE TABLE "books" (
                "id" SERIAL NOT NULL,
                "title" character varying(255) NOT NULL,
                "genre" character varying(100) NOT NULL,
                "date_of_established" TIMESTAMP NOT NULL DEFAULT now(),
                "authorId" integer,
                CONSTRAINT "PK_books" PRIMARY KEY ("id"),
                CONSTRAINT "FK_books_authors" FOREIGN KEY ("authorId") REFERENCES "authors"("id") ON DELETE SET NULL
            )
        `);

        // Create users table
        await queryRunner.query(`
            CREATE TABLE "users" (
                "id" SERIAL NOT NULL,
                "username" character varying(255) NOT NULL,
                "email" character varying(255) NOT NULL,
                "password" character varying(255) NOT NULL,
                CONSTRAINT "UQ_users_email" UNIQUE ("email"),
                CONSTRAINT "PK_users" PRIMARY KEY ("id")
            )
        `);

        // Create users_books join table
        await queryRunner.query(`
            CREATE TABLE "users_books" (
                "user_id" integer NOT NULL,
                "book_id" integer NOT NULL,
                CONSTRAINT "PK_users_books" PRIMARY KEY ("user_id", "book_id"),
                CONSTRAINT "FK_users_books_users" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE CASCADE,
                CONSTRAINT "FK_users_books_books" FOREIGN KEY ("book_id") REFERENCES "books"("id") ON DELETE CASCADE
            )
        `);

        // Create indexes
        await queryRunner.query(`CREATE INDEX "IDX_books_authorId" ON "books" ("authorId")`);
        await queryRunner.query(`CREATE INDEX "IDX_users_books_user_id" ON "users_books" ("user_id")`);
        await queryRunner.query(`CREATE INDEX "IDX_users_books_book_id" ON "users_books" ("book_id")`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Drop indexes
        await queryRunner.query(`DROP INDEX "IDX_users_books_book_id"`);
        await queryRunner.query(`DROP INDEX "IDX_users_books_user_id"`);
        await queryRunner.query(`DROP INDEX "IDX_books_authorId"`);

        // Drop tables
        await queryRunner.query(`DROP TABLE "users_books"`);
        await queryRunner.query(`DROP TABLE "users"`);
        await queryRunner.query(`DROP TABLE "books"`);
        await queryRunner.query(`DROP TABLE "authors"`);
    }
} 