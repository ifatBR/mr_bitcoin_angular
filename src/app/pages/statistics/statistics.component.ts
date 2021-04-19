import { Component, OnInit } from '@angular/core';
import { BitcoinService } from '../../../services/bitcoin.service';
import {MarketPriceValue} from '../../../models/Market-price.model'

@Component({
  selector: 'statistics',
  templateUrl: './statistics.component.html',
  styleUrls: ['./statistics.component.scss']
})
export class StatisticsComponent implements OnInit {
  // marketPrice:MarketPriceValue['value']
  marketPrice
  confirmedTransactions
  constructor(private bitcoinService: BitcoinService) { }


  ngOnInit(): void {
    this.marketPrice = this.bitcoinService.getMarketPrice()
    this.confirmedTransactions = this.bitcoinService.getConfirmedTransactions()

  }

}
