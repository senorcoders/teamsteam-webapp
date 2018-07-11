import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
const  API_ENDPOINT="http://138.68.19.227:8187/";
@Injectable()
export class ImageUploadService {
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
  uploadImage(id,model,image){
    let body = JSON.stringify(image);
    return this.http.post(`${API_ENDPOINT}images/${model}/${id}`,body, this.httpOptions )
  }

}
