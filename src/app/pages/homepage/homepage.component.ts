import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { User } from 'src/models/user.model';
import { BitcoinService } from '../../../services/bitcoin.service';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent implements OnInit {
  rate$: Observable<string>
  user: User
  constructor(private bitcoinService: BitcoinService, private userService: UserService) { }
  subscription: Subscription
  ngOnInit(): void {
    this.user = this.userService.getUser()
    this.rate$  = this.bitcoinService.getRate(this.user.coins)    
  }

}
