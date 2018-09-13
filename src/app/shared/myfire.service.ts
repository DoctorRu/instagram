import * as firebase from 'firebase';


export class MyFireService {


    getUserFromDataBase(uid) {
        const ref = firebase.database().ref('users/' + uid);
        return ref.once('value')
            .then(spanshot => spanshot.val());

    }
}