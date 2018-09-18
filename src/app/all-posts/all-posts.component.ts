import {Component, OnDestroy, OnInit} from '@angular/core';
import * as firebase from 'firebase';
import _ from 'lodash';

@Component({
    selector: 'app-all-posts',
    templateUrl: './all-posts.component.html',
    styleUrls: ['./all-posts.component.css']
})

export class AllPostsComponent implements OnInit, OnDestroy {
    all: any = [];
    allRef: any;
    loadMoreRef: any;

    constructor() {
    }

    ngOnInit() {

        this.allRef = firebase.database().ref('allposts').limitToFirst(3);
        this.allRef.on('child_added', data => {
            this.all.push({
                key: data.key,
                data: data.val()
            });
        });
    }

    ngOnDestroy() {
        this.allRef.off();

        if (this.loadMoreRef) {
            this.loadMoreRef.off();
        }
    }

    onLoadMore() {
        if ( this.all.length > 0 ) {

            const lastLoaddedPost = this.all[this.all.length - 1];
            const lastLoaddedPostKey = lastLoaddedPost.key;

            this.loadMoreRef = firebase.database().ref('allposts').startAt(null, lastLoaddedPostKey).limitToFirst(2);

            this.loadMoreRef.on('child_added', data => {
                if (data.key === lastLoaddedPostKey) {
                    return;
                } else {
                    this.all.push({
                        key: data.key,
                        data: data.val()
                    });
                }
            });

        }
    }


    onFavoritesClicked() {

    }

    onFollowClicked() {

    }
}
