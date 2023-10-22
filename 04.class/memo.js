import SQLiteAdapter from "./sqlite-adapter.js";

export default class Memo {
  static #adapter = new SQLiteAdapter();

  static createTable() {
    return this.#adapter.run(
      "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, content TEXT NOT NULL)"
    );
  }

  static async all() {
    const memos = await this.#adapter.all(
      "SELECT * FROM memos ORDER BY id ASC"
    );
    return memos.map((memo) => new Memo(memo.content, memo.id));
  }

  static async count() {
    const result = await this.#adapter.get("SELECT COUNT(*) FROM memos");
    return result["COUNT(*)"];
  }

  static close() {
    return this.#adapter.close();
  }

  static #save(content) {
    return this.#adapter.run("INSERT INTO memos(content) VALUES(?)", content);
  }

  static #destroy(id) {
    return this.#adapter.run("DELETE FROM memos WHERE id = ?", id);
  }

  #id;
  #content;

  constructor(content, id = null) {
    this.#id = id;
    if (id === null) {
      this.#content = content.join("\n");
    } else {
      this.#content = content;
    }
  }

  save() {
    return Memo.#save(this.#content);
  }

  destroy() {
    return Memo.#destroy(this.#id);
  }

  get title() {
    const firstNewlineIndex = this.#content.indexOf("\n");
    return firstNewlineIndex === -1
      ? this.#content
      : this.#content.slice(0, firstNewlineIndex);
  }

  get content() {
    return this.#content;
  }
}
