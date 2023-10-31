import SQLiteAdapter from "./sqlite-adapter.js";
import Memo from "./memo.js";

export default class MemoDataAccessor {
  #adapter;

  constructor() {
    this.#adapter = new SQLiteAdapter();
  }

  createTable() {
    return this.#adapter.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)"
    );
  }

  async all() {
    const memos = await this.#adapter.all(
      "SELECT * FROM memos ORDER BY id ASC"
    );
    return memos.map((memo) => new Memo(memo));
  }

  async count() {
    const result = await this.#adapter.get("SELECT COUNT(*) FROM memos");
    return result["COUNT(*)"];
  }

  close() {
    return this.#adapter.close();
  }

  save(memo) {
    return this.#adapter.run(
      "INSERT INTO memos(content) VALUES(?)",
      memo.content
    );
  }

  destroy(id) {
    return this.#adapter.run("DELETE FROM memos WHERE id = ?", id);
  }
}
