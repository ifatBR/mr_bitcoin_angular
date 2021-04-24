import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { Move } from 'src/models/move.model';

@Component({
  selector: 'move-list',
  templateUrl: './move-list.component.html',
  styleUrls: ['./move-list.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class MoveListComponent implements OnInit {
  @Input() moves:Move[]
  @Input() title:string
  @Input() isShowTo:boolean
  @Input() moveClass:string
  constructor() { }

  trackByFn(idx){
    return idx
  }

  ngOnInit(): void {
    
  }

}
