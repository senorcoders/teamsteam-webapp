import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8'})
  };
const API_ENDPOINT="https://api.lockerroomapp.com/";
//const API_ENDPOINT="http://138.68.19.227:8188/";


@Injectable()
export class AuthenticationService {  
 constructor(private http: HttpClient) { }
  login(login){
    let body = JSON.stringify(login);
	return this.http.post(`${API_ENDPOINT}login`, body, httpOptions);
  }
  getBaseUrl(){
    return API_ENDPOINT;
  }
  setLoginData(data){
    data=JSON.stringify(data);
    localStorage.setItem('sessionToken',data);
  }
  setLocalStorage(name,data){
    localStorage.setItem(name,data)
  }
  getLocalStorage(name){
    return localStorage.getItem(name)
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
  updateSession(old, newinfo){
		let data={
			"role":old.role,
			"username":newinfo.username,
			"firstName": newinfo.firstName,
    	"lastName": newinfo.lastName,
    	"email": newinfo.email,
    	"id": old.id,
    	"token": old.token
    }
		let dataString=JSON.stringify(data);
		localStorage.removeItem('sessionToken');
		localStorage.setItem( 'sessionToken', dataString );
	}
  changePassword(data,token){
		let body = JSON.stringify(data);
	  return this.http.post(`${API_ENDPOINT}password/change`, body, {headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=UTF-8','token':`${token}`})});
	}
  //check if email already exist
	checkEmail(email){
		return this.http.get(`${API_ENDPOINT}user/enable/${email}`, httpOptions)
	}
}
