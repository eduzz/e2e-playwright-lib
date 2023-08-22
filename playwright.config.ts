import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  fullyParallel: true, //roda os arquivos em paralelo, mas nao os testes dentro de um mesmo arquivo
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['playwright-json-summary-reporter'], ['html'], ['dot']],
  timeout: 1 * 70 * 1000,
  expect: {
    timeout: 20 * 1000
  },

  use: {
    headless: false,
    trace: 'on-first-retry',
    baseURL: process.env.BASE_URL,
    testIdAttribute: 'id'
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] }
    }
  ]
})
