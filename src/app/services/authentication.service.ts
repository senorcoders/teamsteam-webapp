import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Interceptor } from 'app/interceptor/interceptor';

@Injectable()
export class AuthenticationService {

  public urlImageUserDefault = "/assets/img/user.png";

  constructor(private http: HttpClient) { }
  login(login) {
    let body = JSON.stringify(login);
    return this.http.post(`/login`, body);
  }
  setLoginData(data) {
    data = JSON.stringify(data);
    localStorage.setItem('sessionToken', data);
  }
  setLocalStorage(name, data) {
    localStorage.setItem(name, data)
  }
  getLocalStorage(name) {
    return localStorage.getItem(name)
  }
  getLoginData() {
    let data = localStorage.getItem('sessionToken');
    return JSON.parse(data);
  }
  logOut() {
    localStorage.removeItem('sessionToken');
  }
  getPerfilImage() {
    let userData = this.getLoginData(),
    perfilImage = "";
    for(let rol of userData.roles){
      if(rol.hasOwnProperty("team")){
        if( Object.prototype.toString.call(rol.team) === "[object Object]" ){
          perfilImage = Interceptor.transformUrl("/userprofile/images/" + userData.id + "/" + rol.team.id);
          break;
        }else{
          perfilImage = Interceptor.transformUrl("/userprofile/images/" + userData.id + "/" + rol.team);
          break;
        }
      }
    }
    if(perfilImage !== "")
      return perfilImage;
    else
      return this.urlImageUserDefault;
  }
  isLogged() {
    let data = this.getLoginData();
    if (data !== null) {
      return true;
    }
    else {
      return false;
    }
  }
  updateSession(old, newinfo) {
    let data = {
      "role": old.role,
      "username": newinfo.username,
      "firstName": newinfo.firstName,
      "lastName": newinfo.lastName,
      "email": newinfo.email,
      "id": old.id,
      "token": old.token
    }
    let dataString = JSON.stringify(data);
    localStorage.removeItem('sessionToken');
    localStorage.setItem('sessionToken', dataString);
  }
  changePassword(data, token) {
    let body = JSON.stringify(data);
    return this.http.post(`/password/change`, body);
  }
  //check if email already exist
  checkEmail(email) {
    return this.http.get(`/user/enable/${email}`)
  }
}
