import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'})
  };
const  API_ENDPOINT="http://138.68.19.227:8187/";

@Injectable()
export class AuthenticationService {

 constructor(private http: HttpClient) { }
  login(login){
    let body = JSON.stringify(login);
	return this.http.post(`${API_ENDPOINT}login`, body, httpOptions);
  }
  setLoginData(data){
    data=JSON.stringify(data);
    localStorage.setItem('sessionToken',data);
  }
  getLoginData(){
    let data=localStorage.getItem('sessionToken');
    return JSON.parse(data);
  }
  logOut(){
    localStorage.removeItem('sessionToken');
  }
  getPerfilImage(id, ramdon){
    return this.http.get(`${API_ENDPOINT}images/${ramdon}/users/${id}`, httpOptions)
  }
  isLogged(){
    let data=this.getLoginData();
    if(data!==null){
      return true;
    }
    else{
      return false;
    }
  }

}
