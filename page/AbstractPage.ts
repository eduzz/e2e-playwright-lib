import { type Locator, type Page } from '@playwright/test';

import type { Roles } from './types';

export class AbstractPage<TPageLocator> {
  public readonly page: Page;
  protected pageLocator!: TPageLocator;

  constructor(page: Page) {
    this.page = page;
  }

  public get locators() {
    return this.pageLocator;
  }

  public async toHome() {
    await this.page.goto('/');
  }

  public locator(selector: string, opt?: { exact?: boolean }): Locator {
    return this.locate(selector, opt);
  }

  public locate(selector: string, opt?: { exact?: boolean }): Locator {
    if (selector.startsWith('s:')) {
      return this.page.getByText(selector.substring(2), opt);
    }

    if (selector.startsWith('p:')) {
      return this.page.getByPlaceholder(selector.substring(2), opt);
    }

    return this.page.locator(selector);
  }

  public getByRole(
    role: Roles,
    opt?: {
      name?: string;
      checked?: boolean;
      disabled?: boolean;
      exact?: boolean;
      expanded?: boolean;
      includeHidden?: boolean;
      level?: number;
      pressed?: boolean;
      selected?: boolean;
    }
  ) {
    return this.page.getByRole(role, opt);
  }

  public getByTitle(role: string | RegExp, opt?: { exact?: boolean }) {
    return this.page.getByTitle(role, opt);
  }

  public getByTestId(role: string | RegExp) {
    return this.page.getByTestId(role);
  }

  public getByText(text: string, opt?: { exact?: boolean }) {
    return this.page.getByText(text, opt);
  }

  public getByPlaceholder(text: string, opt?: { exact?: boolean }) {
    return this.page.getByPlaceholder(text, opt);
  }
}
