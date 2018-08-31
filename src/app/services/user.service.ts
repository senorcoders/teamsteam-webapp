import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
const  API_ENDPOINT="http://138.68.19.227:8188/";
//const  API_ENDPOINT="https://api.lockerroomapp.com/";
@Injectable()
export class UserService {
  token:string;
  id:string;
  httpOptions:any;
  teamId:string;
  constructor(private http:HttpClient) {this.getToken() }
  getToken(){
    let data=localStorage.getItem('sessionToken');
    if (data) {
      let json= JSON.parse(data);
      this.token= json['token'];
      console.log(this.token);
      this.id=json['id'];
      this.httpOptions = {
        headers: new HttpHeaders({ 'Content-Type': 'application/json', 'token':`${this.token}` })        
      };
    } 
  }
  
  getUsers(){
     return this.http.get(`/user?sort=createdAt DESC&limit=3000`)
  }
  updateUser(user_id, user){
    let body = JSON.stringify(user);
    return this.http.put(`/user/${user_id}`,body)
  }
  deleteUser(user_id){
    return this.http.delete(`/user/${user_id}`)
  }
  getDashboard(){
    return this.http.get(`/dashboard`,this.httpOptions) 
  }
  
}
