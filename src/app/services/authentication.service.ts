import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable()
export class AuthenticationService {
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
  getPerfilImage(id, ramdon) {
    return this.http.get(`/images/${ramdon}/users/${id}`)
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
