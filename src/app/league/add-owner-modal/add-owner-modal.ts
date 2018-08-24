import {Component, Input} from '@angular/core';
import {NgbModal, NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import { HttpClient } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';
import { Interceptor } from '../../interceptor/interceptor';

@Component({
  selector: 'add-owner-modal',
  templateUrl: "./add-owner-modal.html",
  styleUrls: ["./add-owner-modal.scss"]
})
export class AddOwnerModal {

  public search="";
  public owners=[];
  public ownersSelect=[];

  constructor(public activeModal: NgbActiveModal,
    public http:HttpClient
  ) {
    
  }

  public async searchOwners(){
    if(this.search==="" || !/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/.test(this.search)){
      this.owners=[];
      return;
    }
    this.owners = (await this.http.get(`/user?where={"email":"${this.search}"}`).toPromise() as any[]).map(it=>{
      it.imgSrc = Interceptor.url+ "/images/random/users/"+it.id;
      return it;
    }).filter(it=>{
      let index = this.ownersSelect.findIndex(t=>{
        return t.id===it.id;
      })
      return index === -1;
    });
    
  }

  public addOwner(owner){
    this.ownersSelect.push(owner);
    this.owners = this.owners.filter(it=>{
      let index = this.ownersSelect.findIndex(t=>{
        return t.id===it.id;
      })
      return index === -1;
    });
    this.search="";
  }

  public loadImage(owner){
    owner.loadImage=true;
  }
  
}