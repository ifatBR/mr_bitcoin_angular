import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Move } from 'src/models/move.model';
import { User } from 'src/models/user.model';
import { BitcoinService } from '../../../services/bitcoin.service';
import { UserService } from '../../../services/user.service';
@Component({
  selector: 'homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class HomepageComponent implements OnInit {
  rate$: Observable<string>
  user: User
  userName: string
  lastMoves: Move[]
  constructor(private bitcoinService: BitcoinService, private userService: UserService) { }
  subscription: Subscription

  onSignup() {
    if(!this.userName) return;
    this.userService.signup(this.userName)
    // this.userService.signup(this.userName).subscribe(user => { this.user = user })
    this.userName = ''
    this.lastMoves = (this.user.moves.slice(this.user?.moves.length-3)).reverse()
  }

  onLogout(){
    this.userService.logout()
    // this.userService.logout().subscribe(user => {this.user=user})
    this.lastMoves = []
  }

  ngOnInit(): void {

    this.userService.user$.subscribe(user => {
      this.user = user
      this.lastMoves = (this.user?.moves.slice(this.user?.moves.length-3)).reverse()
    })
    if (this.user.name) this.rate$ = this.bitcoinService.getRate(this.user.coins)
  }

}
