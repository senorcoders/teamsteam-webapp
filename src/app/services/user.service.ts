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
     return this.http.get(`${API_ENDPOINT}user/`,this.httpOptions)
  }
  updateTeam(team_id, team){
    let body = JSON.stringify(team);
    return this.http.put(`${API_ENDPOINT}user/${team_id}`,body, this.httpOptions )
  }
  deleteTeam(team_id){
    return this.http.delete(`${API_ENDPOINT}user/${team_id}`, this.httpOptions )
  }
  
  
}
