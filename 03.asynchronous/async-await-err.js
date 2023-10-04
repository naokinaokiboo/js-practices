import sqlite3 from "sqlite3";
import * as commonSQL from "./common-sql.js";
import * as commonErr from "./common-err.js";
import * as promiseLib from "./promise-func.js";

const main = async () => {
  const db = new sqlite3.Database(":memory:");

  await promiseLib.runPromise(db, commonSQL.createBooksTable);
  try {
    await promiseLib.runPromise(
      db,
      commonSQL.insertBookErr,
      "JavaScript Primer"
    );
  } catch (err) {
    commonErr.handleError(err);
  }

  try {
    await promiseLib.runPromise(db, commonSQL.selectBookErr, 1);
  } catch (err) {
    commonErr.handleError(err);
  }

  await promiseLib.runPromise(db, commonSQL.dropBooksTable);
};

main();
