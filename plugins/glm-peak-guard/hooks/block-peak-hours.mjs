#!/usr/bin/env node

import { readFileSync } from "fs";

/**
 * Peak hour blocker for z.ai
 * Blocks usage during peak hours (06:00–10:00 UTC) to save quota.
 */

const PEAK_START_UTC = 6;   // 06:00 UTC
const PEAK_END_UTC   = 10;  // 10:00 UTC (Note: you had a comment saying 10:00 earlier)

function getCurrentHourUTC() {
  return new Date().getUTCHours();
}

function isPeakHour(hourUTC = getCurrentHourUTC()) {
  return hourUTC >= PEAK_START_UTC && hourUTC < PEAK_END_UTC;
}

function getLocalTimeInfo() {
  const now = new Date();
  const localTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const localTimeStr = now.toLocaleString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZoneName: "short",
  });

  // Convert peak hours to local timezone for display
  const peakStartLocal = new Date(Date.UTC(2026, 0, 1, PEAK_START_UTC, 0))
    .toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: localTimezone,
    });

  const peakEndLocal = new Date(Date.UTC(2026, 0, 1, PEAK_END_UTC, 0))
    .toLocaleString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
      timeZone: localTimezone,
    });

  return {
    localTimeStr,
    localTimezone,
    peakStartLocal,
    peakEndLocal,
  };
}

function generateBlockMessage({ localTimeStr, localTimezone, peakStartLocal, peakEndLocal }) {
  return `🚫 **z.ai Usage Blocked During Peak Hours**

🕒 Your local time: ${localTimeStr} (${localTimezone})
⚠️ Peak hours are currently active:
   ${peakStartLocal} – ${peakEndLocal} (your local time)
   (Original: ${PEAK_START_UTC}:00 – ${PEAK_END_UTC}:00 UTC)

During peak hours:
• GLM-5.1 and GLM-5-Turbo consume **3× quota**
• You will burn through your GLM Coding Plan much faster

💡 Recommendation:
• Wait until after ${peakEndLocal} in your local time
• Or switch to a lighter model (e.g. GLM-4.7) for now

Try again during off-peak hours for better efficiency!`;
}

function main() {
  try {
    // Read and parse input from stdin (even if we don't use it)
    JSON.parse(readFileSync(0, "utf-8").trim() || "{}");

    const currentHourUTC = getCurrentHourUTC();

    if (isPeakHour(currentHourUTC)) {
      const timeInfo = getLocalTimeInfo();
      const blockMessage = generateBlockMessage(timeInfo);

      console.error(blockMessage);
      process.exit(2); // 2 = blocked due to peak hours
    }

    // Off-peak → allow silently
    process.exit(0);

  } catch (err) {
    // Fail-open policy: if anything goes wrong (invalid JSON, date issues, etc.), allow the request
    console.error("Peak hour checker encountered an error. Allowing request to prevent blocking issues.");
    process.exit(0);
  }
}

// Run the script
main();