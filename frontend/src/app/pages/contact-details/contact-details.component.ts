import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { Contact } from 'src/models/contact.model';
import { ContactService } from 'src/services/contact.service';
import { ActivatedRoute, Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Move } from 'src/models/move.model';
import { UserService } from 'src/services/user.service';
import { User } from 'src/models/user.model';

@Component({
  selector: 'contact-details',
  templateUrl: './contact-details.component.html',
  styleUrls: ['./contact-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactDetailsComponent implements OnInit {
  @Output() onEdit = new EventEmitter()

  contact: Contact
  user$: Observable<User>
  moves: Move[]
  subscription: Subscription
  subscriptionMoves: Subscription
  form: FormGroup

  constructor(private userService: UserService,
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute,
    private fb: FormBuilder) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;

    this.form = this.fb.group({
      amount: ''
    })
  }

  onRemoveContact() {
    this.contactService.deleteContact(this.contact._id)
    this.onBack()
  }

  onBack() {
    this.router.navigateByUrl('/contact')
  }

  onMoveCoins(amount) {
    this.userService.addMove(this.contact, amount)
    // this.setContactMoves(this.contact._id)
  }

  setContactMoves(contactId) {
    this.user$ = this.userService.user$
    this.subscriptionMoves = this.user$.subscribe(user => {
      this.moves = user.moves.filter(({ toId }) => toId === contactId)
    })
  }

  async onChangeContact(diff) {
    const contactId = await this.contactService.getNeighborContactId(this.contact._id, diff)
    await this.router.navigateByUrl('/contact/' + contactId)

    this.setContactMoves(contactId)
  }


  ngOnInit(): void {

    this.subscription = this.route.data.subscribe(data => {
      this.contact = data.contact
      // console.log('data', data);

    })
    this.subscriptionMoves = this.route.params.subscribe(
      params => this.setContactMoves(params.id)
    )
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
    this.subscriptionMoves.unsubscribe()
  }
}
