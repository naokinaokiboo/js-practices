export default class Memo {
  static createMemo(id, content) {
    const memo = new Memo(content);
    memo.#id = id;
    return memo;
  }

  #id;
  #content;

  constructor(content) {
    this.#id = null;
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
