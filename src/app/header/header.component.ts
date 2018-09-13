import {Component, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import {UserService} from '../shared/user.service';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
    isLoggedIn: boolean = false;

    constructor(private userService: UserService) {
    }

    ngOnInit() {

        firebase.auth().onAuthStateChanged(userData => {
            if (userData && userData.emailVerified) {
                userData.sendEmailVerification();
                this.isLoggedIn = true;
            } else {
                this.isLoggedIn = false;
            }
        });
    }

    onLogout() {
        firebase.auth().signOut()
            .then(() => {
                this.userService.destroy(); // deletelocal storage data
                this.isLoggedIn = false;

            });
    }

}
