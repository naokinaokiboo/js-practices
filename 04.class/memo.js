//import SQLiteAdapter from "./sqlite-adapter.js";

export default class Memo {
  #id;
  #content;

  constructor(id, content) {
    this.#id = id;
    this.#content = content;
  }

  get id() {
    return this.#id;
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
