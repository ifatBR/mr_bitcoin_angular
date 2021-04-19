import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Observable } from 'rxjs';
import {Contact} from '../../../models/contact.model'
import {ContactService} from 'src/services/contact.service'
@Component({
  selector: 'contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {
  contacts$: Observable<Contact[]>
  selectedContactId:String
  filterBy
  constructor(private contactService:ContactService) { }

  loadContacts(){
    this.contactService.loadContacts(this.filterBy);
    this.contacts$ = this.contactService.contacts$
  }
  onSetFilter(filterBy){
    this.filterBy = filterBy
    this.loadContacts()
  }

  ngOnInit(): void {
    this.loadContacts()
  }

}
