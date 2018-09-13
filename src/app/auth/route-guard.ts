import {CanActivate} from '@angular/router';
import * as firebase from 'firebase';

export class RouteGuard implements CanActivate {
    canActivate() {
        return !!firebase.auth().currentUser;
    }
}
