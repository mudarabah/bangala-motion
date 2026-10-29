import { Config } from "@remotion/cli/config";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);

// Headless Chrome can crash when the project path has unusual characters (e.g. a
// double space). If ~/.remotion-chrome holds a copy of chrome-headless-shell, use
// it. See reference/qa-and-troubleshooting.md → Environment problems.
const chromeCopy = path.join(
  os.homedir(),
  ".remotion-chrome/chrome-headless-shell-mac-arm64/chrome-headless-shell",
);
if (fs.existsSync(chromeCopy)) {
  Config.setBrowserExecutable(chromeCopy);
}
