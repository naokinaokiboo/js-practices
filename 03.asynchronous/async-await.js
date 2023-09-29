import sqlite3 from "sqlite3";
import * as promiseLib from "./promise-func.js";

const createBooksTable =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBook = "INSERT INTO books(title) values(?);";
const selectBook = "SELECT * FROM books WHERE id = ?;";
const dropBooksTable = "DROP TABLE books;";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await promiseLib.runPromise(db, createBooksTable);
  let result = await promiseLib.runPromise(db, insertBook, [
    "JavaScript Primer",
  ]);
  console.log(`自動採番されたID:${result.lastID}`);

  let resultRow = await promiseLib.getPromise(db, selectBook, [1]);
  console.log(resultRow);
  await promiseLib.getPromise(db, dropBooksTable);
};

main();
