import * as promiseLib from "./promise-func.js";
import sqlite3 from "sqlite3";

const createBooksTable =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBookErr = "INSERT INTO books(noExistsColumn) values(?);";
const selectBookErr = "SELECT * FROM noExistsTable WHERE id = ?;";
const dropBooksTable = "DROP TABLE books;";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await promiseLib.runPromise(db, createBooksTable);
  try {
    await promiseLib.runPromise(db, insertBookErr, ["JavaScript Primer"]);
  } catch (err) {
    console.error(err.message);
  }

  try {
    await promiseLib.getPromise(db, selectBookErr, [1]);
  } catch (err) {
    console.error(err.message);
  }

  await promiseLib.getPromise(db, dropBooksTable);
};

main();
