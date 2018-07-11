import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
const  API_ENDPOINT="http://138.68.19.227:8188/";
@Injectable()
export class TeamService {
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
  getSports() {
    return this.http.get(`${API_ENDPOINT}sports`,this.httpOptions)
  }
  getMyTeams() {
    let userData=localStorage.getItem('sessionToken');
    return this.http.get(`${API_ENDPOINT}user/${this.id}/team`,this.httpOptions)
  }
  getTeams(){
     return this.http.get(`${API_ENDPOINT}teams/`,this.httpOptions)
  }
  updateTeam(team_id, team){
    let body = JSON.stringify(team);
    return this.http.put(`${API_ENDPOINT}teams/${team_id}`,body, this.httpOptions )
  }
  deleteTeam(team_id){
    return this.http.delete(`${API_ENDPOINT}teams/${team_id}`, this.httpOptions )
  }
  getTeamPlayers(team_id){
   return this.http.get(`${API_ENDPOINT}team/${team_id}`,this.httpOptions) 
  }
  createUser(user){
    let body = JSON.stringify(user);
    return this.http.post(`${API_ENDPOINT}user/player/`,body, this.httpOptions )
  }
  createPlayer(player){
    let body = JSON.stringify(player);
    //return body
    return this.http.post(`${API_ENDPOINT}players/`,body, this.httpOptions )
  }
  uploadImage(image){
    let body = JSON.stringify(image);
    return this.http.post(`${API_ENDPOINT}images/users`,body, this.httpOptions )
  }
//   getTeamsByUser(type,id){
//     type=type.toLowerCase();
//     return this.http.get(`${API_ENDPOINT}teams/${type}/${id}`,this.httpOptions)
//   }
  editUser(data){
    let body = JSON.stringify(data);
    return this.http.put(`${API_ENDPOINT}user/${this.id}`,body, this.httpOptions )
  }
  register(data){
    let body = JSON.stringify(data);
    return this.http.post(`${API_ENDPOINT}user/team`,body, {headers: new HttpHeaders({ 'Content-Type': 'application/json'})})
  }
  formBuilder(data){
    let body = JSON.stringify(data);
    return this.http.post(`${API_ENDPOINT}registrationtemplate`,body, this.httpOptions )
  }

}
