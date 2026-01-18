import { execSync } from "child_process";

function getDateTimeString() {
  const now = new Date();
  return now
    .toISOString()
    .replace(/[:.]/g, "-")
    .replace("T", "_")
    .replace("Z", "");
}

function run(command: string) {
  console.log(`Running: ${command}`);
  execSync(command, { stdio: "inherit" });
}

function setEnvironmentVariables(report_folder: string, report_title: string) {
  process.env.REPORT_FOLDER = report_folder;
  process.env.REPORT_TITLE = report_title;
}

export { getDateTimeString, run, setEnvironmentVariables };