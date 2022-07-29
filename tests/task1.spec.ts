import { test, expect } from '@playwright/test';
import { CouponFollowMainPage } from '../pages/main-page';
import { Utils } from '../utils/utils';

test ('Validate that 3 out of 6 or 9 total Top Deal coupons are displayed.', async ({page, isMobile}) => {
    //There were 3 coupons in Top Deal section all the time

    const mainPage = new CouponFollowMainPage(page);
    const utils = new Utils();

    await mainPage.goTo();
    
    if (isMobile) {
        await expect(mainPage.mobileTopDealsSlider).toBeVisible();
    } else {
        await expect(mainPage.topDealsSlider).toBeVisible();
    }
    
    const dealsCount:number = await utils.getNumberOfUniqueValues(mainPage.topDealsSliderCoupons);
    expect(dealsCount).toBeGreaterThanOrEqual(3);

    for (let i = 1; i <= dealsCount; i++) {
        await expect(await mainPage.singleTopDealsCoupon(i)).toBeVisible();
        await utils.expectInnerTextToBe(await mainPage.singleTopDealsCouponTitle(i, isMobile), /[\S]+/);
        await utils.expectInnerTextToBe(await mainPage.singleTopDealsCouponMerchant(i, isMobile), /[\S]+/);        
        //Other checks that could be done in similar fashion as above: check site name and domain, check urls. 
        //But above are enough to tell the coupon is displayed.
    }
});