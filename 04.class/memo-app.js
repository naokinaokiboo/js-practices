#! /usr/bin/env node
import readline from "readline";
import minimist from "minimist";
import enquirer from "enquirer";
import Memo from "./memo.js";
import MemoDataAccessor from "./memo-data-accessor.js";

export default class MemoApp {
  #memoDataAccessor;
  #optionList;
  #optionReference;
  #optionDelete;

  constructor() {
    this.#memoDataAccessor = new MemoDataAccessor();
    const args = minimist(process.argv.slice(2));
    this.#optionList = args.l;
    this.#optionReference = args.r;
    this.#optionDelete = args.d;
  }

  async execute() {
    try {
      await this.#memoDataAccessor.createTable();
      await this.#executeCommand();
    } catch (err) {
      if (err instanceof Error) {
        console.error(err.message);
      } else {
        throw err;
      }
    } finally {
      await this.#memoDataAccessor.close();
    }
  }

  async #executeCommand() {
    if (!this.#optionList && !this.#optionReference && !this.#optionDelete) {
      await this.#saveMemo();
      return;
    }

    const numOfMemos = await this.#memoDataAccessor.count();
    if (numOfMemos === 0) {
      console.log("No memos have been registered.");
      return;
    }

    if (this.#optionList) {
      await this.#showTitleList();
    } else if (this.#optionReference) {
      await this.#referenceMemo();
    } else if (this.#optionDelete) {
      await this.#deleteMemo();
    }
  }

  async #saveMemo() {
    const lines = await this.#receiveInput();
    if (lines.length === 0) {
      console.log("To register a memo, you must enter some text.");
      return;
    }
    const memo = new Memo({ content: lines.join("\n") });
    await this.#memoDataAccessor.save(memo);
    console.log("The memo was successfully saved.");
  }

  #receiveInput() {
    console.log("Enter your memo. (Press Ctrl+D to finish typing).");
    const reader = readline.createInterface({
      input: process.stdin,
    });
    return new Promise((resolve) => {
      const lines = [];
      reader.on("line", (line) => {
        lines.push(line);
      });
      reader.on("close", () => {
        resolve(lines);
      });
    });
  }

  async #showTitleList() {
    const memos = await this.#memoDataAccessor.all();
    for (const memo of memos) {
      console.log(memo.title);
    }
  }

  async #referenceMemo() {
    const selectedMemo = await this.#selectMemo(
      "Select the memo you want to display."
    );
    console.log(selectedMemo.content);
  }

  async #deleteMemo() {
    const selectedMemo = await this.#selectMemo(
      "Select the memo you want to delete."
    );
    await this.#memoDataAccessor.destroy(selectedMemo.id);
    console.log("The memo was successfully deleted.");
  }

  async #selectMemo(promptMessage) {
    const memos = await this.#memoDataAccessor.all();
    const question = {
      type: "select",
      name: "value",
      message: promptMessage,
      choices: memos.map((memo) => ({
        name: memo.title,
        message: memo.title,
        value: memo,
      })),
      result() {
        return this.focused.value;
      },
    };

    try {
      const answer = await enquirer.prompt(question);
      return answer.value;
    } catch (error) {
      console.error("An unexpected error occurred.");
      process.exit(1);
    }
  }
}
