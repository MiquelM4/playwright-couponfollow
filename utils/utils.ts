import { expect, Locator, Page } from '@playwright/test';

export class Utils {

    async expectInnerTextToBe(locator:Locator, expected: string | RegExp) {
        await expect(locator).toContainText(expected);
    }

    async getNumberOfUniqueValues(locator:Locator) {
        return new Set(await locator.allTextContents()).size;
    }

    async checkCollectionIsUnique(locator1:Locator, locator2:Locator) {
        const count:number = await locator1.count();

        if (count !== await this.getNumberOfUniqueValues(locator2)) {
            console.error("This is NOT a collection of unique items.");
        } else { console.log("This is a collection of unique items.") } 
    }
}