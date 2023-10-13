#! /usr/bin/env node
import readline from "readline";
import minimist from "minimist";
import enquirer from "enquirer";
import Memo from "./memo.js";

export default class MemoApp {
  #optionList;
  #optionReference;
  #optionDelete;

  constructor() {
    const args = minimist(process.argv.slice(2));
    this.#optionList = args.l;
    this.#optionReference = args.r;
    this.#optionDelete = args.d;
  }

  async execute() {
    try {
      await this.#prepareDB();
      await this.#executeCommand();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        throw err;
      }
    } finally {
      await Memo.close();
    }
  }

  #prepareDB() {
    return Memo.createTable();
  }

  async #executeCommand() {
    if (!this.#optionList && !this.#optionReference && !this.#optionDelete) {
      return this.#saveMemo();
    }

    const numOfMemos = await Memo.count();
    if (numOfMemos === 0) {
      console.log("No memos have been registered.");
      return;
    }

    if (this.#optionList) {
      return this.#showTitleList();
    } else if (this.#optionReference) {
      return this.#referenceMemo();
    } else if (this.#optionDelete) {
      return this.#deleteMemo();
    }
  }

  async #saveMemo() {
    const lines = await this.#readlinePromise();
    const memo = new Memo(lines);
    return memo
      .save()
      .then(() => console.log("The memo was successfully saved."));
  }

  #readlinePromise() {
    console.log("Enter your memo. (Press Ctrl+D to finish typing).");
    const reader = readline.createInterface({
      input: process.stdin,
    });

    const lines = [];
    return new Promise((resolve) => {
      reader.on("line", (line) => {
        lines.push(line);
      });
      reader.on("close", () => {
        resolve(lines);
      });
    });
  }

  async #showTitleList() {
    const memos = await Memo.all();
    for (const memo of memos) {
      console.log(memo.title);
    }
  }

  async #referenceMemo() {
    const selectedMemo = await this.#selectMemo(
      "Select the memo you want to display."
    );
    console.log(selectedMemo.title);
    console.log(selectedMemo.content);
  }

  async #deleteMemo() {
    const selectedMemo = await this.#selectMemo(
      "Select the memo you want to delete."
    );
    return Memo.destroy(selectedMemo.id).then(() =>
      console.log("The memo was successfully deleted.")
    );
  }

  async #selectMemo(msg) {
    const memos = await Memo.all();
    const question = {
      type: "select",
      name: "value",
      message: msg,
      choices: memos.map((memo) => {
        return {
          name: memo.title,
          message: memo.title,
          value: { id: memo.id, title: memo.title, content: memo.content },
        };
      }),
      result() {
        return this.focused.value;
      },
    };

    const answer = await enquirer.prompt(question);
    return answer.value;
  }
}
