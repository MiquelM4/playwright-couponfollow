import { test, expect } from '@playwright/test';
import { CouponFollowCashbackPage } from '../pages/cashback-page';
import { Utils } from '../utils/utils';

test('Validate that the Top Deal swiper is automatically changed every 5 seconds.', async ({page, isMobile}) => {
    // There were only 3 Top Deals on main page so I did that for cashback page.
    // I can see maximum of 6 coupons, but if there were way more, the test might have been optimized to do less checks.

    const cashbackPage = new CouponFollowCashbackPage(page);
    const utils = new Utils();

    await cashbackPage.goTo();

    await expect(cashbackPage.topCashbackOffersSwiper).toBeVisible();
    const topCashbackOffersCount:number = await utils.getNumberOfUniqueValues(cashbackPage.topCashbackCoupons);
    console.log(topCashbackOffersCount);
    
    if(topCashbackOffersCount > 3 && await cashbackPage.swiperPagination.isVisible()) {

        const swpierPagesCount:number = await cashbackPage.swiperPaginationBullets.count();

        if (isMobile) {

            for (let i = 0; i < topCashbackOffersCount; i++) {
                await expect(await cashbackPage.singleTopCashbackCoupon(i, isMobile)).toBeVisible();
                await expect(await cashbackPage.singleTopCashbackCoupon(i, isMobile)).toHaveClass(/active/);
                if (i < (topCashbackOffersCount-1)) { await page.waitForTimeout(5000); }
            }        
        } else {

            for (let i = 0; i < topCashbackOffersCount; i=i+3) {
                await expect(await cashbackPage.singleTopCashbackCoupon(i, isMobile)).toBeVisible();
                await expect(await cashbackPage.singleTopCashbackCoupon(i, isMobile)).toHaveClass(/active/);
                if (i < (topCashbackOffersCount-3)) { await page.waitForTimeout(5000); }
            }        
        }
    } else {
        console.log("Top offers count is 3 or less, no pagination, no swiping, no need to test.")
    }
});