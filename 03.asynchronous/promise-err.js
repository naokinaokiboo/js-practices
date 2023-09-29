import sqlite3 from "sqlite3";
import * as commonSQL from "./common-sql.js";
import * as promiseLib from "./promise-func.js";

const db = new sqlite3.Database(":memory:");

promiseLib
  .runPromise(db, commonSQL.createBooksTable)
  .then(() =>
    promiseLib.runPromise(db, commonSQL.insertBookErr, ["JavaScript Primer"])
  )
  .catch((err) => {
    console.error(err.message);
    return promiseLib.getPromise(db, commonSQL.selectBookErr, [1]);
  })
  .catch((err) => {
    console.error(err.message);
    promiseLib.getPromise(db, commonSQL.dropBooksTable);
  });
