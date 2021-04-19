import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/models/contact.model';
import { ContactService } from 'src/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss']
})
export class ContactDetailsComponent implements OnInit {
  @Input() contactId: string
  @Output() onEdit = new EventEmitter()

  contact: Contact
  subscription: Subscription
  form:FormGroup
  constructor(private contactService: ContactService, 
    private router: Router, 
    private route: ActivatedRoute,
    private fb: FormBuilder) {
      this.form = this.fb.group({
        amount:''
      })
     }

  onRemoveContact() {
    this.contactService.deleteContact(this.contact._id)
    this.onBack()
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }
  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
  ngOnInit(): void {

    this.subscription = this.route.params.pipe(
      mergeMap(params => this.contactService.getContactById(params.id))
    ).subscribe(contact => {
      this.contact = contact
    })
  }
}
