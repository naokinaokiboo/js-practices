import sqlite3 from "sqlite3";
import * as commonSQL from "./common-sql.js";
import * as promiseLib from "./promise-func.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await promiseLib.runPromise(db, commonSQL.createBooksTable);
  const result = await promiseLib.runPromise(db, commonSQL.insertBook, [
    "JavaScript Primer",
  ]);
  console.log(`自動採番されたID:${result.lastID}`);

  const resultRow = await promiseLib.getPromise(db, commonSQL.selectBook, [1]);
  console.log(resultRow);
  await promiseLib.getPromise(db, commonSQL.dropBooksTable);
};

main();
