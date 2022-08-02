import { test, expect } from "@playwright/test";
import { CouponFollowMainPage } from "../pages/main-page";

test ('Validate that at least 30 Todays Trending Coupons are displayed on the main page.', async ({page, isMobile}) => {

    const mainPage = new CouponFollowMainPage(page);
    
    await mainPage.goTo();
    let trendingCouponsCount:number;

    if (isMobile) {
        trendingCouponsCount = await mainPage.mobileTrendingCoupons.count();
    } else {
        trendingCouponsCount = await mainPage.trendingCoupons.count();
    }
    
    await expect(trendingCouponsCount).toBeGreaterThanOrEqual(30);

    for (let i = 1; i < trendingCouponsCount; i++) {
        await expect(await mainPage.singleTrendingCoupon(i, isMobile)).toBeVisible();
    }
    console.log('Total count of Today\'s Trending Coupons:', trendingCouponsCount);
});