#! /usr/bin/env node

import minimist from "minimist";

const CALENDAR_ROWS = 6;

const main = () => {
  const args = minimist(process.argv.slice(2));
  let year = args.y;
  let month = args.m;
  const now = new Date();
  if (year === undefined || month === undefined) {
    year = now.getFullYear();
    month = now.getMonth() + 1;
  }

  process.stdout.write(generateCalendar(year, month));
};

export const generateCalendar = (year, month) => {
  const weeks = new Array(CALENDAR_ROWS).fill("");
  let weekIndex = 0;
  weeks[weekIndex] = generateBlankOfFirstWeek(year, month);
  for (const date of generateDatesOfMonth(year, month)) {
    weeks[weekIndex] += ("  " + date.getDate().toString()).slice(-2) + " ";
    if (date.getDay() === 6) {
      weekIndex++;
    }
  }
  weeks[CALENDAR_ROWS - 1] += "\n";

  return [`      ${month}月 ${year}`, "日 月 火 水 木 金 土", ...weeks].join(
    "\n"
  );
};

const generateBlankOfFirstWeek = (year, month) => {
  const firstDayOfWeek = new Date(year, month - 1, 1).getDay();
  let blanks = "";
  for (const blank of new Array(firstDayOfWeek).fill("   ")) {
    blanks += blank;
  }
  return blanks;
};

const generateDatesOfMonth = (year, month) => {
  const lastDay = new Date(year, month, 0).getDate();
  return [...Array(lastDay)].map(
    (_, day) => new Date(year, month - 1, day + 1)
  );
};

main();
