import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ContactService } from 'src/services/contact.service';

@Component({
  selector: 'contact-filter',
  templateUrl: './contact-filter.component.html',
  styleUrls: ['./contact-filter.component.scss'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ContactFilterComponent implements OnInit {
  @Output() onSetFilter= new EventEmitter<{term:string}>()
  filterBy={term:''}

  ngOnInit(): void {
  }

}
