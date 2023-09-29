import sqlite3 from "sqlite3";
import * as promiseLib from "./promise-func.js";

const createBooksTable =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBook = "INSERT INTO books(title) values(?);";
const selectBook = "SELECT * FROM books WHERE id = ?;";
const dropBooksTable = "DROP TABLE books;";

const db = new sqlite3.Database(":memory:");

promiseLib
  .runPromise(db, createBooksTable)
  .then(() => promiseLib.runPromise(db, insertBook, ["JavaScript Primer"]))
  .then((result) => {
    console.log(`自動採番されたID:${result.lastID}`);
    return promiseLib.getPromise(db, selectBook, [result.lastID]);
  })
  .then((result) => {
    console.log(result);
    promiseLib.getPromise(db, dropBooksTable);
  });
