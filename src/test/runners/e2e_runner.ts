import { getDateTimeString, run, setEnvironmentVariables } from './runner_utils';

const dateTime = getDateTimeString();

const reportFolder = `reports/e2e/e2e-report-${dateTime}`;

const reportTitle = `E2E Test Report ${dateTime}`;

setEnvironmentVariables(reportFolder, reportTitle);

run(`npx playwright test --grep-invert "/record|smoke/"`);