import sqlite3 from "sqlite3";
import * as promiseLib from "./promise-func.js";

const createBooksTable =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBookErr = "INSERT INTO books(noExistsColumn) values(?);";
const selectBookErr = "SELECT * FROM noExistsTable WHERE id = ?;";
const dropBooksTable = "DROP TABLE books;";

const db = new sqlite3.Database(":memory:");

promiseLib
  .runPromise(db, createBooksTable)
  .then(() => promiseLib.runPromise(db, insertBookErr, ["JavaScript Primer"]))
  .catch((err) => {
    console.error(err.message);
    return promiseLib.getPromise(db, selectBookErr, [1]);
  })
  .catch((err) => {
    console.error(err.message);
    promiseLib.getPromise(db, dropBooksTable);
  });
