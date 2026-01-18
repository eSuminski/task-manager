import { getDateTimeString, run, setEnvironmentVariables } from './runner_utils';

const reportFolder = `reports/e2e/e2e-report`;

const reportTitle = `E2E Test Report`;

setEnvironmentVariables(reportFolder, reportTitle);

run(`npx playwright test --grep-invert "/record|smoke/"`);