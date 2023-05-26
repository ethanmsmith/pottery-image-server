import sqlite from 'sqlite3';
const databaseName = `${process.env.DATABASE}.db`;

let instance: sqlite.Database;

export const connection = (): sqlite.Database => { return instance || (instance = new sqlite.Database(databaseName)) };
