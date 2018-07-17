import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
//const  API_ENDPOINT="http://138.68.19.227:8188/";
const  API_ENDPOINT="https://api.lockerroomapp.com/";
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
     return this.http.get(`${API_ENDPOINT}user?limit=100`,this.httpOptions)
  }
  updateUser(user_id, user){
    let body = JSON.stringify(user);
    return this.http.put(`${API_ENDPOINT}user/${user_id}`,body, this.httpOptions )
  }
  deleteUser(user_id){
    return this.http.delete(`${API_ENDPOINT}user/${user_id}`, this.httpOptions )
  }
  
  
}
