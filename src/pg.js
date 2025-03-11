const { Client } = require('pg');
const dotenv = require('dotenv');

dotenv.config({
  path: `.env.dev`,
});

console.log('user --> ', process.env.DATABASE_USER);
console.log('database --> ', process.env.DATABASE_NAME);
console.log('port --> ', process.env.DATABASE_PORT);
console.log('host --> ', process.env.DATABASE_HOST);
console.log('password --> ', process.env.DATABASE_PASSWORD);

async function postgresRun() {
  const client = new Client({
    user: process.env.DATABASE_USER,
    database: process.env.DATABASE_NAME,
    port: parseInt(process.env.DATABASE_PORT),
    host: process.env.DATABASE_HOST,
    password: process.env.DATABASE_PASSWORD,
  });


  await client.connect(async (err) => {
    
    if(err) {
      console.log("INSIDE ERROR", err);
      await client.end();
      postgresRun();
      return;
    } else {
      const res = await client.query(
        `CREATE SCHEMA IF NOT EXISTS ${process.env.DATABASE_SCHEMA_NAME}`
      );
      console.log(res);
      await client.end();
    }
  });
}


postgresRun();