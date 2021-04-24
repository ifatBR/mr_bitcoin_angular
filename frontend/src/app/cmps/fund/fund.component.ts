import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'fund',
  templateUrl: './fund.component.html',
  styleUrls: ['./fund.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class FundComponent implements OnInit {
  amount: number
  @Output() moveCoins= new EventEmitter<number>()

  onMoveCoins(){
    this.moveCoins.emit(this.amount);
    this.amount=null
  }
  constructor() { }
  ngOnInit(): void {
  }

}
