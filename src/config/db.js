import {neon} from "@neondatabase/serverless";

import "dotenv/config";

//creates connection for sql using our db url
export const sql = neon(process.env.DATABASE_URL);

async function testConnection() {
    try {
        const result = await sql`SELECT 1`;
        console.log("Database connection successful");
    } catch (error) {
        console.error("Database connection failed", error);
        process.exit(1);
    }
}

testConnection();

export async function initDB() {
    try {
        const result = await sql`CREATE TABLE IF  NOT EXISTS transactions(
           id SERIAL PRIMARY key,
           user_id VARCHAR(255) NOT NULL,
           title VARCHAR(255) NOT NULL,
           amount DECIMAL(10,2) NOT NULL,
           category VARCHAR(255) NOT NULL,
           created_at DATE NOT NULL DEFAULT CURRENT_DATE
         )`;

         console.log("Database initialized successfully");
    } catch (error) {
        console.log("Error initializing DB",error);
        process.exit(1) //status code 1 means failure, 0 means success
    }
}