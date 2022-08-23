import { Component, OnInit } from '@angular/core';
import { collectionData, Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection } from '@firebase/firestore';
import { map, Observable } from 'rxjs';
import { User } from 'src/models/user.class';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  users$: Observable<any>;
  user = {};
  userId: any;
  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(paramMap => {
      this.userId = paramMap.get('id');
      console.log(this.userId);
      this.getUser();

    })
  }

  getUser() {
    const coll = collection(this.firestore, 'users');
/*     const docRef = doc(coll, this.userId); */
    this.users$ = collectionData(coll, );
    this.users$.subscribe((newUser) => {
      this.user = newUser;
      console.log(this.user);
      // console.log(this.allUsers);
    })


/*     getDoc(docRef).then((user: any) => {
      this.user = user;
      console.log(this.user);
    }); */
  }

}
