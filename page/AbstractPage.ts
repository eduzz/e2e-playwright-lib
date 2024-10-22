import { type Locator, type Page } from '@playwright/test';

import type { Roles } from './types';

export class AbstractPage<TPageLocator> {
  protected pageLocator!: TPageLocator;

  constructor(public readonly page: Page) {}

  public get locators() {
    return this.pageLocator;
  }

  public async toHome() {
    await this.page.goto('/');
  }

  public locator(selector: string, options?: { exact?: boolean }): Locator {
    return this.locate(selector, options);
  }

  public locate(selector: string, options?: { exact?: boolean }): Locator {
    if (selector.startsWith('s:')) {
      return this.page.getByText(selector.substring(2), options);
    }

    if (selector.startsWith('p:')) {
      return this.page.getByPlaceholder(selector.substring(2), options);
    }

    return this.page.locator(selector);
  }

  public getByRole(
    role: Roles,
    options?: {
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
    return this.page.getByRole(role, options);
  }

  public getByTitle(role: string | RegExp, options?: { exact?: boolean }) {
    return this.page.getByTitle(role, options);
  }

  public getByTestId(role: string | RegExp) {
    return this.page.getByTestId(role);
  }

  public getByText(text: string, options?: { exact?: boolean }) {
    return this.page.getByText(text, options);
  }

  public getByPlaceholder(text: string, options?: { exact?: boolean }) {
    return this.page.getByPlaceholder(text, options);
  }

  public getByLabel(
    text: string | RegExp,
    options?: {
      exact?: boolean;
    }
  ) {
    return this.page.getByLabel(text, options);
  }
}
