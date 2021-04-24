import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/models/contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[]

  constructor(private router: Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
   }

  onSelectContact(contactId) {
    this.router.navigateByUrl('contact/' + contactId)

  }

  trackByFn(contact: Contact) {
    return contact._id
  }

  ngOnInit(): void {
  }
}
