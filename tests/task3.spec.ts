import { test, expect } from "@playwright/test";
import { CouponFollowMainPage } from "../pages/main-page";
import { Utils } from "../utils/utils";

test ('Validate that Staff Picks contains unique stores with proper discounts for monetary, percentage or text values.', async ({page, isMobile}) => {

    const mainPage = new CouponFollowMainPage(page);
    const utils = new Utils();
    
    await mainPage.goTo();

    if (isMobile) {
        await expect(mainPage.mobileStaffPicksSection).toBeVisible();
    } else { 
        await expect(mainPage.staffPicksSection).toBeVisible();
    }

    const staffPicksCount:number = await mainPage.staffPicksCoupons.count();

    await utils.checkCollectionIsUnique(mainPage.staffPicksCoupons, mainPage.staffPicksMerchants);
    

    for (let i = 1; i <= staffPicksCount; i++) {

        await expect(await mainPage.singleStaffPicksCoupon(i)).toBeVisible();
        await utils.expectInnerTextToBe(await mainPage.singleStaffPicksCouponMerchant(i), /[\S]+/);
        await utils.expectInnerTextToBe(await mainPage.singleStaffPicksCouponTitle(i), /[a-zA-Z\d\$\£\€\¥\%]+/);
        
        const merchName:string = await (await mainPage.singleStaffPicksCouponMerchant(i)).innerText();
        const discountText:string = await (await mainPage.singleStaffPicksCouponTitle(i)).innerText();

        if (/[a-zA-Z]*/.test(discountText)) {
            console.log("Coupon for", merchName, "contains text value:", discountText)
        }

        if (/[\d]%/.test(discountText)) {
            console.log("Coupon for", merchName, "contains percentage value:", discountText)
        }
        
        if (/\$[\d]/.test(discountText) || /\£[\d]/.test(discountText) || /[\d]\€/.test(discountText) || /\¥[\d]/.test(discountText)) {
            console.log("Coupon for", merchName, "contains monetary value:", discountText)
        }
    }
});