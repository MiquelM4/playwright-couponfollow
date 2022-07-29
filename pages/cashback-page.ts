import { Locator, Page } from "@playwright/test";

export class CouponFollowCashbackPage {
    readonly page: Page;
    readonly topCashbackOffersSwiper: Locator;
    readonly topCashbackCoupons: Locator;
    readonly swiperPagination: Locator;
    readonly swiperPaginationBullets: Locator;

    constructor(page:Page) {
        this.page = page;
        this.topCashbackOffersSwiper = page.locator('#top-slider');
        this.topCashbackCoupons = page.locator('div.top-deal');
        this.swiperPagination = page.locator('div.swiper-pagination');
        this.swiperPaginationBullets = page.locator('div.swiper-pagination span.bullet');
    }

    async goTo() {
        await this.page.goto('/cashback');
    }

    async singleTopCashbackCoupon(i:number, isMobile:boolean | undefined) {
        let singleTopCashbackCoupon:Locator;

        if (isMobile) {
            singleTopCashbackCoupon = this.page.locator(`div.top-deal[data-swiper-slide-index="${i}"]:nth-child(${i+1})`);
        } else {
            singleTopCashbackCoupon = this.page.locator(`div.top-deal[data-swiper-slide-index="${i}"]:nth-child(${i+4})`);
        }
        return singleTopCashbackCoupon;
    }
}