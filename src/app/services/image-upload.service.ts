import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {Observable} from 'rxjs/Observable';
//const  API_ENDPOINT="http://138.68.19.227:8187/";
@Injectable()
export class ImageUploadService {
  token:string;
  id:string;
  httpOptions:any;
  teamId:string;
  constructor(private http:HttpClient) { }
   uploadImage(id,model,image){
    return this.http.post(`/images/${model}/`,{id:id, image:image})
  }

}
