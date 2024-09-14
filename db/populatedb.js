#! /usr/bin/env node

const { Client } = require("pg");
require("dotenv").config();

const SQL = `
CREATE TABLE IF NOT EXISTS messages (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  users VARCHAR ( 255 ),
  text TEXT,
  added DATE
);

DELETE FROM messages;
ALTER SEQUENCE messages_id_seq RESTART WITH 1;

INSERT INTO messages (users, text, added) 
VALUES
  ('Amando', 'Hi there!', NOW()),
  ('Charles', 'Hello World!', NOW());
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false }, // The default port
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
