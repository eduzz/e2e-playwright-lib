import { FullConfig, FullResult, Reporter, Suite, TestCase, TestResult } from '@playwright/test/reporter';
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
  private ansiRegex =
    '[\\u001B\\u009B][[\\]()#;?]*(?:(?:(?:[a-zA-Z\\d]*(?:;[-a-zA-Z\\d\\/#&.:=?%@~_]*)*)?\\u0007)|(?:(?:\\d{1,4}(?:;\\d{0,4})*)?[\\dA-PR-TZcf-ntqry=><~]))';

  constructor(options: { botzzUrl?: string; project?: string } = {}) {
    this.botzzUrl = options.botzzUrl;
    this.project = options.project;
  }

  public onBegin(_config: FullConfig, _suite: Suite) {}

  public onTestBegin(_test: TestCase) {}

  public async onTestEnd(test: TestCase, result: TestResult): Promise<void> {
    this.countStatus[result.status]++;

    if (!this.botzzUrl) {
      return;
    }

    await axios.post(this.botzzUrl, this.map(test, result));
  }

  public async onEnd(_result: FullResult) {
    if (!this.botzzUrl) {
      return;
    }

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
        error: {
          ...result.error,
          message: this.stripAnsi(result.error?.message),
          stack: this.stripAnsi(result.error?.stack),
          snippet: this.stripAnsi(result.error?.snippet)
        }
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
    if (!str) {
      return '';
    }

    return str.replace(new RegExp(this.ansiRegex, 'g'), '');
  }
}

export default DiscordReporter;
