import sqlite3 from "sqlite3";

const createBooksTable =
  "CREATE TABLE books (id integer PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBookErr = "INSERT INTO books(noExistsColumn) values(?);";
const selectBookErr = "SELECT * FROM noExistsTable WHERE id = ?;";
const dropBooksTable = "DROP TABLE books;";

const db = new sqlite3.Database(":memory:");

db.run(createBooksTable, () => {
  db.run(insertBookErr, "JavaScript Primer", (err) => {
    if (err) {
      console.error(err.message);
    }
    db.get(selectBookErr, 1, (err) => {
      if (err) {
        console.error(err.message);
      }
      db.run(dropBooksTable);
    });
  });
});
