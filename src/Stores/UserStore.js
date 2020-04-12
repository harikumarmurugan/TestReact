import {extendObservable, action} from 'mobx';




class UserStore{
    constructor()
    {
        extendObservable(this,{

            loading:false,
            isLoggedin:false,
            username:''
        })

    }
}

export default new UserStore();