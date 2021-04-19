import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';
import { Move } from 'src/models/move.model';
import { User } from 'src/models/user.model';
import { storageService } from './storageService'
import { utilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user$ = new BehaviorSubject({});
    public user$ = this._user$.asObservable();

    LOGGEDIN_USER_KEY="loggedinUser"

    public getUser(): User{
        const user = storageService.load(this.LOGGEDIN_USER_KEY)
        if(user) return user
        return {_id:'u101', name:'Babo Bebe', coins : 100, moves:[]}
    }

    public signup(userName){
        const newUser = new User(utilService.makeId(), userName, 100, [])
        this._user$.next(newUser)
        return of(newUser)
    }

    public addMove(contact, amount){
        const move = new Move(contact._id, contact.name, Date.now(), amount)
        const user = this.getUser();
        user.moves.push(move)
        this._user$.next(user)
    }
}