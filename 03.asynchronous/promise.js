import sqlite3 from "sqlite3";
import * as commonSQL from "./common-sql.js";
import * as promiseLib from "./promise-func.js";

const db = new sqlite3.Database(":memory:");

promiseLib
  .runPromise(db, commonSQL.createBooksTable)
  .then(() =>
    promiseLib.runPromise(db, commonSQL.insertBook, "JavaScript Primer")
  )
  .then((result) => {
    console.log(`自動採番されたID:${result.lastID}`);
    return promiseLib.getPromise(db, commonSQL.selectBook, result.lastID);
  })
  .then((result) => {
    console.log(result);
    promiseLib.getPromise(db, commonSQL.dropBooksTable);
  });
