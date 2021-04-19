import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/models/contact.model';
import { ContactService } from 'src/services/contact.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss']
})
export class ContactEditComponent implements OnInit {
  @Input() contactId: string
  contact: Contact
  subscription: Subscription

  form: FormGroup
  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router:Router,
    private fb: FormBuilder) {
    this.form = this.fb.group({
      name: '',
      phone: '',
      email: ''
    })
  }

  onSaveContact() {
    this.contactService.saveContact(this.contact)
    this.onBack()
  }

  onBack(){
    if(this.contact._id) this.router.navigateByUrl('/contact/'+this.contact._id)
    else this.router.navigateByUrl('/contact')
  }

  ngOnInit(): void {
    this.subscription = this.route.params.pipe(
      mergeMap(params => params.id ? this.contactService.getContactById(params.id) : this.contactService.getEmptyContact()
      )
    ).subscribe(contact => {
      this.contact = contact as Contact
    })
    
  }

}
