import dotenv from 'dotenv';
import os from 'os';

dotenv.config();
dotenv.config({ path: '/var/secrets-store/.env.generic', override: true });
dotenv.config({ path: '/var/secrets-store/.env', override: true });

const RP_API_KEY = process.env.RP_API_KEY;
const RP_ENDPOINT = process.env.RP_ENDPOINT;
const RP_PROJECT = process.env.RP_PROJECT;

const BOTZZ_URL = process.env.BOTZZ_URL;
const PROJECT = process.env.PROJECT;

export const HEADLESS = process.env.HEADLESS !== 'false';
export const BASE_URL = process.env.BASE_URL;
export const CI = process.env.CI;
export const ENABLE_RECORDER_ON_FAILURE = process.env.ENABLE_RECORDER_ON_FAILURE === 'true';

const rpAttributes = [
  {
    key: 'ENV',
    value: process.env.ENV || 'local'
  },
  {
    key: 'BRANCH',
    value: process.env.BRANCH || 'local'
  },
  {
    key: 'BRANCH_TEST',
    value: process.env.BRANCH_TEST || 'local'
  },
  {
    key: 'JIRA',
    value: process.env.JIRA || 'local'
  },
  {
    key: 'USER',
    value: process.env.JENKINS_USER || getMachineName()
  }
];

const RPconfig = {
  apiKey: RP_API_KEY,
  endpoint: RP_ENDPOINT,
  project: RP_PROJECT,
  launch: process.env.ARGS || 'local',
  attributes: rpAttributes,
  restClientConfig: {
    timeout: 10000
  }
};

const reportParseEnv = (process.env.REPORTERS || 'playwright-json-summary-reporter,html,dot')
  .split(',')
  .map(r => [r.trim()]);
export const REPORTERS = [
  ...(RP_API_KEY ? [['@reportportal/agent-js-playwright', RPconfig]] : []),
  ...reportParseEnv,
  ['@eduzz/e2e-playwright-base/reporters/DiscordReporter', { botzzUrl: BOTZZ_URL, project: PROJECT }]
];

export function getCPUCount() {
  const cpuCount = os.cpus().length;

  if (process.env.CPU_ALL === 'true') {
    return cpuCount;
  }

  return Math.ceil(cpuCount / 2);
}

function getMachineName() {
  const name = os.hostname();
  const machineName = name.split('-')[0];

  return machineName;
}
