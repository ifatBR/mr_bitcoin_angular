import { Component, EventEmitter, Input, OnInit, Output, } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from 'src/models/contact.model';

@Component({
  selector: 'contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.scss']
})
export class ContactListComponent implements OnInit {
  @Input() contacts: Contact[]

  constructor(private router: Router) { }

  onSelectContact(contactId){
    this.router.navigateByUrl('contact/'+contactId)
    
  }

  trackByFn(contact:Contact){
    return contact._id
  }

  ngOnInit(): void {
  }
}
