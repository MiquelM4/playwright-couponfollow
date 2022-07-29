import { Locator, Page } from "@playwright/test";

export class CouponFollowMainPage {
    readonly page: Page;
    readonly topDealsSlider: Locator;
    readonly topDealsSliderCoupons: Locator;
    readonly trendingCoupons: Locator;
    readonly staffPicksSection: Locator;
    readonly staffPicksCoupons: Locator;
    readonly staffPicksMerchants: Locator;
    readonly swiperPaginationBullets: Locator;
    readonly mobileTrendingCoupons: Locator;
    readonly mobileTopDealsSlider: Locator;
    readonly mobileStaffPicksSection: Locator;

    constructor(page:Page) {
        this.page = page;
        this.topDealsSlider = page.locator('#top-slider');
        this.topDealsSliderCoupons = page.locator('div[class*="top-deal swiper-slide"]');
        this.trendingCoupons = page.locator('article.trending-offer');
        this.staffPicksSection = page.locator('div.staff-picks');
        this.staffPicksCoupons = page.locator('div.staff-pick');
        this.staffPicksMerchants = page.locator('div.staff-pick a span.merch');
        this.swiperPaginationBullets = page.locator('div.swiper-pagination span.bullet');
        this.mobileTopDealsSlider = page.locator('#mobile-swiper');
        this.mobileTrendingCoupons = page.locator('article.trending-mobile');
        this.mobileStaffPicksSection = page.locator('div.staff-picks-mobile');
    }

    async goTo() {
        await this.page.goto('/');
    }

    async singleTopDealsCoupon(i:number) {
        let singleTopDealsCoupon:Locator;
        singleTopDealsCoupon = this.page.locator(`div[class*="top-deal swiper-slide"]:nth-child(${i}) a[data-index="${i}"]`);
        
        return singleTopDealsCoupon;
    }

    async singleTopDealsCouponTitle(i:number, isMobile:boolean | undefined) {
        let singleTopDealsCouponTitle:Locator;

        if(isMobile) {
            singleTopDealsCouponTitle= this.page.locator(`#mobile-swiper div.top-deal:nth-child(${i}) a[data-index="${i}"] p.title`);
        } else {
            singleTopDealsCouponTitle= this.page.locator(`#top-slider a[data-index="${i}"] p.title`);
        }
        return singleTopDealsCouponTitle
    }

    async singleTopDealsCouponMerchant(i:number, isMobile:boolean | undefined) {
        let singleTopDealsCouponMerchant:Locator;
        
        if(isMobile) {
            singleTopDealsCouponMerchant = this.page.locator(`#mobile-swiper div.top-deal:nth-child(${i}) a[data-index="${i}"] span.merchant`);
        } else {
            singleTopDealsCouponMerchant = this.page.locator(`#top-slider a[data-index="${i}"] span.merchant`);
        }
        return singleTopDealsCouponMerchant
    }

    async singleTrendingCoupon(i:number, isMobile:boolean | undefined) {
        let singleTrendingCoupon:Locator;

        if (isMobile) {
            singleTrendingCoupon = this.mobileTrendingCoupons.filter({ has: this.page.locator(`a[data-index="${i}"]`) });
        } else {
            singleTrendingCoupon = this.trendingCoupons.filter({ has: this.page.locator(`a[data-index="${i}"]`) });
        }
        return singleTrendingCoupon
    }

    async singleStaffPicksCoupon(i:number) {
        const singleStaffPicksCoupon:Locator = this.staffPicksCoupons.filter({ has: this.page.locator(`a[data-index="${i}"]`) });
        return singleStaffPicksCoupon
    }

    async singleStaffPicksCouponTitle(i:number) {
        const singleStaffPicksCouponTitle:Locator = this.page.locator(`div.staff-pick a[data-index="${i}"] p.title`);
        return singleStaffPicksCouponTitle
    }

    async singleStaffPicksCouponMerchant(i:number) {
        const singleStaffPicksCouponMerchant:Locator = this.page.locator(`div.staff-pick a[data-index="${i}"] span.merch`);
        return singleStaffPicksCouponMerchant
    }
}