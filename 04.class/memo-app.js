#! /usr/bin/env node
import * as readline from "readline";
import minimist from "minimist";
import { Memo } from "./memo.js";
import { SQLiteAdapter } from "./SQLiteAdapter.js";

const main = async () => {
  const adapter = new SQLiteAdapter();
  try {
    await prepareDB(adapter);
    await receiveCommand(adapter);
  } finally {
    await adapter.close();
  }
};

const prepareDB = (adapter) => {
  return adapter.run(
    "CREATE TABLE IF NOT EXISTS memos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL UNIQUE, content TEXT NOT NULL)"
  );
};

const receiveCommand = async (adapter) => {
  const args = minimist(process.argv.slice(2));
  if (args.l) {
    // TODO:メモ一覧表示
  } else if (args.r) {
    // TODO:全文表示
  } else if (args.d) {
    // TODO:メモ削除
  } else {
    return saveMemo(adapter);
  }
};

const saveMemo = async (adapter) => {
  const lines = await readlinePromise();
  const memo = new Memo(lines[0], lines.slice(1).join("\n"));
  return memo.save(adapter);
};

const readlinePromise = () => {
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
};

main();
