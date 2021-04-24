import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { map, tap } from 'rxjs/operators';
import { storageService } from './storageService'
import { of } from "rxjs";
import {MarketPriceValue} from '../models/Market-price.model'

@Injectable({
    providedIn: 'root'
})

export class BitcoinService {
    constructor(private http: HttpClient) { }
    MARKET_PRICE_KEY = 'marketPrice'
    CONFIRMED_TRANSACTIONS_KEY = 'confirmedTransactions'

    getRate(coins: number) {
        return this.http.get<number>('https://blockchain.info/tobtc?currency=USD&value=1')
            .pipe(
                map(res => {
                    const rate = coins / res;
                    return rate.toLocaleString('he-IL')
                })
            )
    }

    getMarketPrice() {
        const marketPrice = storageService.load(this.MARKET_PRICE_KEY)
        if (marketPrice && marketPrice?.length) return of(marketPrice)
        // return this.http.get<Array<MarketPriceValue>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
        return this.http.get<any>('https://api.blockchain.info/charts/market-price?timespan=5months&format=json&cors=true')
            .pipe(
                map(res => res.values.map(
                    ({ x, y }) => {
                        return [(new Date(x * 1000).toLocaleDateString(['ban', 'id'])), y]
                    }
                )),
                tap(values => storageService.store(this.MARKET_PRICE_KEY, values))
            )
    }

    getConfirmedTransactions(){
        const confirmedTransactions = storageService.load(this.CONFIRMED_TRANSACTIONS_KEY)
        if (confirmedTransactions && confirmedTransactions?.length) return of(confirmedTransactions)
        return this.http.get<any>('https://api.blockchain.info/charts/transactions-per-second?timespan=5weeks&rollingAverage=8hours&format=json&cors=true')
            .pipe(
                map(res => res.values.map(
                    ({ x, y }) => {
                        return [(new Date(x * 1000).toLocaleDateString(['ban', 'id'])), y]
                    }
                )),
                tap(values => storageService.store(this.CONFIRMED_TRANSACTIONS_KEY, values))
            )
    }
}