// import {utilService} from '../services/util.service'
export class Contact {

    constructor(public name: string = '', public email: string = '', public phone: string = '',public _id?: string) {

    }

    // public setId() {
    //     // Implement your own set Id
    //     this._id = utilService.makeId()
    // }
}