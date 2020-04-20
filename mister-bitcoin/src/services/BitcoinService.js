const axios = require('axios');
import StorageService from './Storage.service.js';

const isInDevMode = true;

const RATE_KEY = "rate";
const MARKET_PRICE_KEY = "marketPrice";
const CONFIRMED_TRANSACTIONS = "confirmedTransactions";

async function getRate(coins) {
    let rate = null;

    if (isInDevMode) {
        rate = StorageService.localLoad(RATE_KEY);
    }

    if (!isInDevMode || !rate) {
        const res = await axios.get(`https://blockchain.info/tobtc?currency=USD&value=${coins}`);
        rate = res.data;
        if (isInDevMode) {
            StorageService.localStore(RATE_KEY, rate);
        }
    }

    return rate;
}

/**
 * return array of {x, y} - x:timestamp, y:price in USD
 */
async function getMarketPrice() {
    let values = null;

    if (isInDevMode) {
        values = StorageService.localLoad(MARKET_PRICE_KEY);
    }

    if (!isInDevMode || !values) {
        const res = await axios.get(`https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true`);
        values = res.data.values;
        if (isInDevMode) {
            StorageService.localStore(MARKET_PRICE_KEY, values);
        }
    }

    return values;
}

/**
 * return array of {x, y} - x:timestamp, y:number of daily bitcoin transactions
 */
async function getConfirmedTransactions() {
    let values = null;

    if (isInDevMode) {
        values = StorageService.localLoad(CONFIRMED_TRANSACTIONS);
    }

    if (!isInDevMode || !values) {
        const res = await axios.get(`https://api.blockchain.info/charts/n-transactions`);
        values = res.data.values;
        if (isInDevMode) {
            StorageService.localStore(CONFIRMED_TRANSACTIONS, values);
        }
    }

    return values;
}

export default {
    getRate,
    getMarketPrice,
    getConfirmedTransactions
}