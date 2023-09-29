import sqlite3 from "sqlite3";
import * as commonSQL from "./common-sql.js";
import * as promiseLib from "./promise-func.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await promiseLib.runPromise(db, commonSQL.createBooksTable);
  try {
    await promiseLib.runPromise(db, commonSQL.insertBookErr, [
      "JavaScript Primer",
    ]);
  } catch (err) {
    console.error(err.message);
  }

  try {
    await promiseLib.getPromise(db, commonSQL.selectBookErr, [1]);
  } catch (err) {
    console.error(err.message);
  }

  await promiseLib.getPromise(db, commonSQL.dropBooksTable);
};

main();
