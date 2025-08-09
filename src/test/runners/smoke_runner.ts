import { getDateTimeString, run, setEnvironmentVariables } from './runner_utils';

const dateTime = getDateTimeString();

const reportFolder = `reports/smoke/smoke-report-${dateTime}`;

const reportTitle = `Smoke Test Report ${dateTime}`;

setEnvironmentVariables(reportFolder, reportTitle);

run(`npx playwright test smoke`);
