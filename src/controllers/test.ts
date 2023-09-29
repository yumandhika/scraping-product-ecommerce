import * as cheerio from 'cheerio';
import express from 'express';
import randomUseragent from 'random-useragent';
import puppeteer from 'puppeteer';

export const tokped = async (req: express.Request, res: express.Response) => {
    try {
        const randomAgent = randomUseragent.getRandom()
        const browser = await puppeteer.launch({ headless:'new',args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]});
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        await page.setJavaScriptEnabled(true);
        await page.setUserAgent(randomAgent);
        await page.goto('https://www.tokopedia.com/search?st=&q=epson%20l1800&srp_component_id=02.01.00.00&srp_page_id=&srp_page_title=&navsource=', {waitUntil : 'domcontentloaded'});
        await page.waitForSelector('body');

        const body = await page.evaluate(() => {
            return document.querySelector('body').innerHTML;
        });
        const $ = cheerio.load(body);
        const listItems = $('[data-testid="master-product-card"]');
        
        // Checking list item
        if (listItems.length <= 0) return res.status(400).json({ 'Error' : body.toString() }).end() 
        
        const result: any = [];
        listItems.each((index , element) => {
            const name = $('[data-testid="spnSRPProdName"]', element).text();
            const price = $('[data-testid="spnSRPProdPrice"]', element).text();
            const location = $('[data-testid="spnSRPProdTabShopLoc"]', element).text();
            const sold = $('span.prd_label-integrity.css-1sgek4h', element).text();
            result.push({
                name : name,
                price : price,
                location : location,
                sold : sold,
            })
        })
        await browser.close();
        return res.status(200).json(result).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};

export const shopee = async (req: express.Request, res: express.Response) => {
    try {
        const randomAgent = randomUseragent.getRandom()
        const browser = await puppeteer.launch({ headless:'new',args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
        ]});
        const context = await browser.createIncognitoBrowserContext();
        const page = await context.newPage();
        await page.setJavaScriptEnabled(true);
        await page.setUserAgent(randomAgent);
        await page.goto('https://shopee.co.id/search?keyword=jaket%20jeans&page=0&sortBy=relevancy', {waitUntil : 'domcontentloaded'});
        await page.waitForSelector('body');

        const body = await page.evaluate(() => {
            return document.querySelector('body').innerHTML;
        });
        const $ = cheerio.load(body);
        const listItems = $('[data-sqe="item"]');
        
        // Checking list item
        if (listItems.length <= 0) return res.status(400).json({ 'Error' : body.toString() }).end() 
        
        const result: any = [];
        listItems.each((index , element) => {
            const name = $('a > div > div > div.KMyn8J > div.dpiR4u > div > div', element).text();
            result.push({
                name : name,
            })
        })
        await browser.close();
        return res.status(200).json(result).end();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};