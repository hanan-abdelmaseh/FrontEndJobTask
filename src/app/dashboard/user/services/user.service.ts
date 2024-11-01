import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response, User, UserData } from '../Models/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private _HttClient: HttpClient) { }
//  users/
   apiUrl:string =' https://reqres.in/api/';

  getAllUsers(parmasData:any):Observable<User>{
    return this._HttClient.get<User>(`${this.apiUrl}users?`,{params:parmasData})
  }
  getUserByID(id:number):Observable<response>{
    return this._HttClient.get<response>(`${this.apiUrl}users/${id}`)
  }
}
