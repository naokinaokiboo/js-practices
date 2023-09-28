#! /usr/bin/env node

import minimist from "minimist";

const CALENDAR_ROWS = 6;

const main = () => {
  const args = minimist(process.argv.slice(2));
  const [year, month] = decideDispYearMonth(args.y, args.m);
  process.stdout.write(generateCalendar(year, month));
};

export const decideDispYearMonth = (year, month) => {
  const now = new Date();

  if (year === undefined) {
    year = now.getFullYear();
  }
  if (month === undefined) {
    month = now.getMonth() + 1;
  }

  try {
    if (!isWithinRange(year, 1, 9999)) {
      throw new Error(`cal: year '${year}' not in range 1..9999`);
    }
    if (!isWithinRange(month, 1, 12)) {
      throw new Error(`cal: ${month} is not a month number (1..12)`);
    }
  } catch (err) {
    console.error(err.message);
    process.exit(1);
  }

  return [year, month];
};

const isWithinRange = (num, min, max) => {
  return min <= num && num <= max;
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
  return new Array(firstDayOfWeek).fill("   ").join("");
};

const generateDatesOfMonth = (year, month) => {
  const lastDay = new Date(year, month, 0).getDate();
  return [...Array(lastDay)].map(
    (_, day) => new Date(year, month - 1, day + 1)
  );
};

main();
