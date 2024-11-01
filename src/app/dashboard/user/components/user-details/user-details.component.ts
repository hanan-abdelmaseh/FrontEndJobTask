import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { response, UserData } from '../../Models/user.model';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit {

  userData: response={
    data:{
      id: 0,
      email: "",
      first_name: "",
      last_name: "",
      avatar:"",
    },support:{ url: "",
    text: ""
  }
}

  userId: number = 0;
  constructor(private _UserService: UserService, 
    private _ActivatedRoute: ActivatedRoute ,
  private _Router:Router) {

  }
  ngOnInit(): void {
    this._ActivatedRoute.params.subscribe((params: Params) => {
      this.userId = +params['id']
    })
    if (this.userId) {
      this.viewUser(+this.userId);
    }

  }

  viewUser(id: number) {
    this._UserService.getUserByID(id).subscribe((res) => {
      this.userData = res;
      console.log(this.userData);
    })
  }

  back(){
    this._Router.navigateByUrl('/')
  }

}
