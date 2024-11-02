import { Component, OnInit } from '@angular/core';
import { UserService } from './services/user.service';
import { User, UserData } from './Models/user.model';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent  implements OnInit{
  displayedColumns: string[] = ['FirstName', 'LastName', 'Email', 'Avatar' , 'Action'];
  dataSource:any[] = [];
  userData:UserData[]=[];
  search:string ='';
  searchId!:number;
  totalCount!: number;
  per_page = 6;
  page = 0;
  params = {
    page: this.page,
    //per_page: this.per_page

  }
  listView:boolean=false;
  cardsView:boolean= true;
  constructor(private _userService:UserService , private _Router:Router){

  }
  ngOnInit(): void {
     this.getAllUsers();
  }

  getAllUsers(){
     this._userService.getAllUsers(this.params).subscribe((res)=>{
     
       this.userData= res.data;
       console.log(this.userData);
       this.totalCount= res.total
     })
  }
  resetSearcgInput() {
    this.search = '';
    this.getAllUsers();
  }
  resetSearcgIdInput(){
    this.searchId = 0;
    this.getAllUsers();
  }

  filtetByName(searchValue: HTMLInputElement) {
   if(searchValue){
      this.userData= this.userData.filter(name=> name.first_name.includes(searchValue.value))
      this.totalCount= this.userData.length
  }
}
filtetById(searchValue: HTMLInputElement){
  if(searchValue){
    this.userData= this.userData.filter(i=> i.id === parseInt( searchValue.value));
    this.totalCount= this.userData.length
    
}
}
 //for paginaton
 changePage(e: PageEvent) {
  this.params.page = e.pageIndex + 1;
  //this.params.per_page = e.pageSize;
  this.getAllUsers();
}
//
view(id:number){
  this._Router.navigateByUrl(`/users/${id}`);
}
 //View as list
  viewList(){
    this.listView = true;
    this.cardsView= false;
  }
  //View as cards
  viewCards(){
    this.listView = false;
    this.cardsView= true;
  }

}
