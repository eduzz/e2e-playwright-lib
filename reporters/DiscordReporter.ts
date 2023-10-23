import type { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
import axios from 'axios';

class DiscordReporter implements Reporter {
  private botzzUrl?: string;
  private project?: string;
  private countStatus: any = {
    passed: 0,
    failed: 0,
    timedOut: 0,
    skipped: 0,
    interrupted: 0
  };
  // eslint-disable-next-line @typescript-eslint/member-ordering
  private ansiRegex = new RegExp(
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))',
    'g'
  );
  constructor(options: { botzzUrl?: string; project?: string } = {}) {
    this.botzzUrl = options.botzzUrl;
    this.project = options.project;
  }

  onBegin(config: FullConfig, suite: Suite) {}

  onTestBegin(test: TestCase) {}

  async onTestEnd(test: TestCase, result: TestResult) {
    this.countStatus[result.status]++;
    if (!this.botzzUrl) return;
    await axios.post(this.botzzUrl, this.map(test, result));
  }

  async onEnd(result: FullResult) {
    if (!this.botzzUrl) return;
    await axios.post(this.botzzUrl, {
      project: this.project,
      type: 'countStatus',
      data: this.countStatus
    });
  }

  private map(test: TestCase, result: TestResult) {
    return {
      project: this.project,
      type: 'test',
      data: {
        title: test.title,
        status: result.status,
        // retry: result.retry,
        error: {
          ...result.error,
          message: this.stripAnsi(result.error?.message),
          stack: this.stripAnsi(result.error?.stack),
          snippet: this.stripAnsi(result.error?.snippet)
        }
        // attachments: result.attachments,
      },
      args: {
        env: process.env.NODE_ENV || 'local',
        branch: process.env.BRANCH || 'local',
        branch_test: process.env.BRANCH_TEST || 'local',
        jira: process.env.JIRA || 'local',
        jenkins_user: process.env.JENKINS_USER || 'local'
      }
    };
  }

  private stripAnsi(str?: string): string {
    if (!str) return '';
    return str.replace(this.ansiRegex, '');
  }
}

export default DiscordReporter;
