import { Component, OnInit } from '@angular/core';
import { Firestore, doc, getDoc } from '@angular/fire/firestore';
import { ActivatedRoute } from '@angular/router';
import { collection } from '@firebase/firestore';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent implements OnInit {
  users = {};
  userId: any;
  constructor(private route: ActivatedRoute, private firestore: Firestore) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (paramMap) => {
      this.userId = paramMap.get('id');
      await this.getUser();
    })
  }


  async getUser() {
    const coll = collection(this.firestore, 'users');
    const docRef = doc(coll, this.userId);
    const docSnap = await getDoc(docRef);
    this.users = docSnap.data();
    console.log(this.users);
  }

}
