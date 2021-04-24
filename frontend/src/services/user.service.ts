import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Move } from 'src/models/move.model';
import { User } from 'src/models/user.model';
import { storageService } from './storageService'
import { utilService } from './util.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private _user$ = new BehaviorSubject({ name:'', coins:0, moves:[]});
    public user$ = this._user$.asObservable();

    LOGGEDIN_USER_KEY = "loggedinUser"

    displayMoves:Move[] = [
        { toId: '6071cb7da166544b0e0c9368', to: 'Ollie Christian', at: 1620162000000, amount:5 },
        { toId: '6071cb7da166544b0e0c936f', to: 'Lilly Conner', at: 1620594000000, amount:1 },
        { toId: '6071cb7da166544b0e0c936a', to: 'Glenna Santana', at: 1620853200000, amount:3 },
    ]
    public signup(userName) {
        const newUser:User = {_id:utilService.makeId(), name:userName, coins:100, moves:this.displayMoves}
        this._saveUser(newUser)
        this._user$.next(newUser)
    }

    public logout() {
        storageService.store(this.LOGGEDIN_USER_KEY, null)
        this._user$.next({ name:'', coins:0, moves:[]})
    }

    public checkLoggedIn() {
        const user = this._getUser()
        return user && !!Object.keys(user).length
    }

    public getUserMoves() {
        const user = storageService.load(this.LOGGEDIN_USER_KEY)
        return user.moves
    }

    
    public addMove(contact, amount) {
        const user:User = this._getUser();

        if (user.coins >= amount) {
            user.coins -= amount
            const move: Move = { toId: contact._id, to: contact.name, at: Date.now(), amount }
            user.moves = [...user.moves, move]
            storageService.store(this.LOGGEDIN_USER_KEY, user)
            this._user$.next(user)
        }
    }

   
    private _getUser(){
        const user= storageService.load(this.LOGGEDIN_USER_KEY)
        return user

    }

    private _saveUser(user){
        storageService.store(this.LOGGEDIN_USER_KEY, user)

    }


}