import { Component, OnInit, Output, EventEmitter, Input, ChangeDetectionStrategy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Contact } from 'src/models/contact.model';
import { ContactService } from 'src/services/contact.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactEditComponent implements OnInit {
  @Input() contactId: string
  contact: Contact
  subscription: Subscription

  form: FormGroup
  constructor(private contactService: ContactService,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder) {

  }

  async onSaveContact() {
    // console.log('this.form.value:', this.form.value)
    const updatedContact = { ...this.form.value }
    if (this.contact._id) updatedContact._id = this.contact._id
    await this.contactService.saveContact(updatedContact)
    this.onBack()
  }

  onBack() {
    if (this.contact._id) this.router.navigateByUrl('/contact/' + this.contact._id)
    else this.router.navigateByUrl('/contact')
  }

  ngOnInit(): void {
    this.route.data.subscribe(data => {
      this.contact = data.contact
    })

    this.form = this.fb.group({
      name: this.contact.name,
      phone: this.contact.phone,
      email: this.contact.email
    })
  }


}
