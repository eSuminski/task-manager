import { getDateTimeString, run, setEnvironmentVariables } from './runner_utils';


const reportFolder = `reports/smoke/smoke-report`;

const reportTitle = `Smoke Test Report`;

setEnvironmentVariables(reportFolder, reportTitle);

run(`npx playwright test smoke`);
