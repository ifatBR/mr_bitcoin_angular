import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit {
  @Input() title
  @Input() data
  @Input() columnNames
  @Input() vTitle

  options = {
    colors: ['#8dd6e9'],
    backgroundColor:'transparent',
    hAxis: {
      title: 'Date'
   },
   vAxis:{
      title: ''
   },
  }
  type='AreaChart'
  width=1500
  height=600
  constructor() { }

  ngOnInit(): void {
    this.options.vAxis.title = this.vTitle
  }

}
