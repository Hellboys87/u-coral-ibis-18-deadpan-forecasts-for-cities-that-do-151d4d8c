// Deadpan forecast for a city that does not exist.
// make.fun bounty: "Deadpan Forecasts for Cities That Do Not Exist".
//
// The program writes exactly one line — a deadpan TV weather forecast for
// the invented city of Mildew Falls — to entry.txt inside the output
// directory the grader mounts at /output (MAKEFUN_OUTPUT_DIR, or /output
// when the variable is unset). The line is a fixed constant, so every run
// produces byte-identical output. Node 22, standard library only, no
// network, no secrets, no reading of anything outside this repository.

import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';

// The forecast, as a straight-faced meteorologist would read it.
// 150 characters: an invented city, three concrete details (9 centimetres
// of sideways rain; a high of 4 degrees; a single cloud), and a deadpan
// twist at the end — the cloud stays until further notice.
const FORECAST =
  'In Mildew Falls, 9 centimetres of sideways rain and a high of 4 degrees, ' +
  'clearing overnight to a single cloud, which will remain until further notice.';

// The gate allows 1 to 160 characters, so refuse to ship a line that
// drifted out of range instead of writing a bad entry.
const MAX_CHARS = 160;
if (FORECAST.length < 1 || FORECAST.length > MAX_CHARS) {
  process.stderr.write(
    `forecast is ${FORECAST.length} characters, outside the 1-${MAX_CHARS} range\n`,
  );
  process.exitCode = 1;
} else {
  const outputDir = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';
  mkdirSync(outputDir, { recursive: true });
  // No trailing newline: the file is exactly the forecast line, so the
  // character count the gate sees is the line's length and nothing else.
  writeFileSync(join(outputDir, 'entry.txt'), FORECAST, 'utf8');
}
