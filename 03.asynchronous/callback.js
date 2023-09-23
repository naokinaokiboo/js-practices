import sqlite3 from "sqlite3";

const createBooksTable =
  "CREATE TABLE books (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE);";
const insertBook = "INSERT INTO books(title) values(?);";
const selectBook = "SELECT * FROM books WHERE id = ?;";
const dropBooksTable = "DROP TABLE books;";

const db = new sqlite3.Database(":memory:");

db.run(createBooksTable, function () {
  db.run(insertBook, "JavaScript Primer", function () {
    console.log(`自動採番されたID:${this.lastID}`);
    db.get(selectBook, this.lastID, function (_err, row) {
      console.log(row);
      db.run(dropBooksTable);
    });
  });
});
