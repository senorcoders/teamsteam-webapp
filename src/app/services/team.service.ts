import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { environment } from 'environments/environment';
@Injectable()
export class TeamService {
  token: string;
  id: string;
  teamId: string;
  constructor(private http: HttpClient) {

  }
  getSports() {
    return this.http.get(`/sports`)
  }
  getMyTeams() {
    let userData: any = localStorage.getItem('sessionToken');
    userData = JSON.parse(userData);
    if(environment.superadmin === userData.email){
      return this.http.get(`/teams?limit=500`)

    }else{
      return this.http.get(`/user/${userData.id}/team`)

    }
  }
  getMyTeamsForUser(id) {
    return this.http.get(`/roles?where={"user":"${id}","name":"Manager"}`)
  }
  getTeams() {
    return this.http.get(`/teams/?limit=500`)
  }
  getRoles() {
    return this.http.get(`/roles/`)
  }

  getLeagues() {
    return this.http.get(`/leagues/`)
  }
  updateTeam(team_id, team) {
    let body = JSON.stringify(team);
    return this.http.put(`/teams/${team_id}`, body)
  }
  deleteTeam(team_id) {
    return this.http.delete(`/teams/${team_id}`)
  }
  getTeamPlayers(team_id) {
    return this.http.get(`/team/${team_id}`)
  }
  createUser(user) {
    let body = JSON.stringify(user);
    console.log(user)
    return this.http.post(`/user/player/`, body)
  }
  createPlayer(user, player) {
    return this.http.post(`/user/player`, { user: user, player: player })
  }
  uploadImage(image) {
    let body = JSON.stringify(image);
    console.log(body)
    return this.http.post(`/images/users`, body)
  }
  //   getTeamsByUser(type,id){
  //     type=type.toLowerCase();
  //     return this.http.get(`/teams/${type}/${id}`)
  //   }
  editUser(data) {
    let body = JSON.stringify(data);
    return this.http.put(`/user/${this.id}`, body)
  }
  register(data) {
    let body = JSON.stringify(data);
    return this.http.post(`/user/team`, body)
  }
  formBuilder(data) {
    let body = JSON.stringify(data);
    return this.http.post(`/registrationtemplate`, body)
  }
  getData(endpoint) {
    return this.http.get(`/${endpoint}`)
  }
  editData(endpoint, data) {
    return this.http.put(`/${endpoint}`, data)
  }
  deleteData(endpoint) {
    return this.http.delete(`/${endpoint}`);
  }
  saveData(endpoint, data) {
    return this.http.post(`/${endpoint}`, data)
  }
  uploadTemplateRoster(endpoint, data) {
    return this.http.post(`/${endpoint}`, data)
  }
  uploadFile(endpoint, field, fileToUpload){
    let httpOptionsForm:any = {headers: new HttpHeaders() };
    httpOptionsForm.headers.append('Content-Type', 'multipart/form-data');
    const formData: FormData = new FormData();
    for(var i = 0; i < fileToUpload.length; i++) {
      formData.append(field, fileToUpload[i]);
  }
    return this.http.post(`/${endpoint}`, formData, httpOptionsForm);
  }
}
