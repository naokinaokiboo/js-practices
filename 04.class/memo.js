export class Memo {
  static createTable(adapter) {
    return adapter.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, content TEXT NOT NULL)"
    );
  }
  static all(adapter) {
    return adapter.all("SELECT * FROM memos ORDER BY id ASC");
  }

  static destroy(adapter, id) {
    return adapter.run("DELETE FROM memos WHERE id = ?", id);
  }

  static async count(adapter) {
    const result = await adapter.get("SELECT COUNT(*) FROM memos");
    return result["COUNT(*)"];
  }

  #title;
  #content;

  constructor(title, content) {
    this.#title = title;
    this.#content = content;
  }

  save(adapter) {
    return adapter.run(
      "INSERT INTO memos(title, content) VALUES(?, ?)",
      this.#title,
      this.#content
    );
  }
}
