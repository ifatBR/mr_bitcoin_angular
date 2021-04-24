import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';
import { Contact } from '../models/contact.model';
import { throwError } from 'rxjs';
import { httpService } from './http.service'
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ContactService {


  private _contacts$ = new BehaviorSubject<Contact[]>([])
  public contacts$ = this._contacts$.asObservable()

  private _contact$ = new BehaviorSubject<Contact>(new Contact)
  public contact$ = this._contacts$.asObservable()

  constructor(private http: HttpClient) { }

  public getEmptyContact() {
    return of({ name: '', phone: '', email: '' })
  }

  public async loadContacts(filterBy = { term: '' }) {
    // console.log('got filterBy',filterBy);
    // let params = new HttpParams().set('term', filterBy.term)
    // return this.http.get<any>('http://localhost:3030/api/contact/?term='+filterBy.term)
    // .subscribe(contacts => this._contacts$.next(this._sort(contacts)))
    try {

      var queryStr = !filterBy ? '' : `?term=${filterBy.term}`;
      const contacts = await httpService.get(`contact${queryStr}`);
      this._contacts$.next(this._sort(contacts))
    } catch (err) {
      console.log(err);

    }
  }


  public getNeighborContactId(contactId, diff) {
    let neighborContactId;
    this.contacts$.subscribe(contacts => {
      let contactIdx = contacts.findIndex(({ _id }) => _id === contactId)
      contactIdx += diff;
      if (contactIdx < 0) contactIdx = contacts.length - 1;
      else if (contactIdx >= contacts.length) contactIdx = 0;
      
      neighborContactId= (contacts[contactIdx]._id)
    })
    return neighborContactId
    
  }

  public async getContactById(id: string) {
    console.log('id:', id)
    if (!id) return this.getEmptyContact()
    const contact = await httpService.get(`contact/${id}`);
    return contact


  }

  public async deleteContact(id: string) {
    await httpService.delete(`contact/${id}`);
    return this._contacts$.subscribe(contacts => {
      contacts = contacts.filter(contact => contact._id !== id)
    })

  }

  public async saveContact(contact: Contact) {
    const savedContact = contact._id ?
      await httpService.put(`contact/${contact._id}`, contact) :
      await httpService.post(`contact/`, contact)
    return savedContact
  }

  private _sort(contacts: Contact[]): Contact[] {
    return contacts.sort((a, b) => {
      if (a.name.toLocaleLowerCase() < b.name.toLocaleLowerCase()) {
        return -1;
      }
      if (a.name.toLocaleLowerCase() > b.name.toLocaleLowerCase()) {
        return 1;
      }

      return 0;
    })
  }

}