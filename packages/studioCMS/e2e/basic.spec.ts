import { test, expect } from '@playwright/test'
import { dev } from 'astro'
import { fileURLToPath } from 'url';

test.describe('basic', () => {
    let devServer: Awaited<ReturnType<typeof dev>>
    let serverUrl: string

    test.beforeAll(async () => {
        devServer = await dev({
            root: fileURLToPath(new URL('./fixtures/basic', import.meta.url)),
        })

        serverUrl = `http://localhost:${ devServer.address.port }`
    });
    
    test('Heading should be visible', async ({ page }) => {
        await page.goto(serverUrl)

        await expect(page.getByText('Hello world!')).toBeVisible()
    })
})