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
    return this.#content.split("\n")[0];
  }

  get content() {
    return this.#content;
  }
}
