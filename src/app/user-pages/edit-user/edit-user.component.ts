import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
//my imports
import {AuthenticationService} from '../../services/authentication.service';
import {TeamService} from '../../services/team.service';
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
@Component({
    selector: 'ms-edit-user',
    templateUrl:'./edit-user-component.html',
    styleUrls: ['./edit-user-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class EditUserComponent implements OnInit {
  //my variables
  perfilImage:string;
  userData:any;
  editForm:FormGroup;
  changePasswordForm:FormGroup;
  showForm:boolean=false;
  constructor(private pageTitleService: PageTitleService, private auth:AuthenticationService, private fb:FormBuilder, private team:TeamService,private toastr:ToastrService) {}

  ngOnInit() {
    this.pageTitleService.setTitle("Edit User Profile");
    this.getUserInfo();
    this.editForm=this.fb.group({
      username:[this.userData.username, Validators.required],
      firstName:[this.userData.firstName, Validators.required],
      lastName:[this.userData.lastName, Validators.required],
      email:[this.userData.email, [Validators.required, Validators.email]]
    });
    this.changePasswordForm=this.fb.group({
      current:['',Validators.required],
      new:['', Validators.required],
      repeat:['', Validators.required],
    })
  }
	getUserInfo(){
        this.userData= this.auth.getLoginData();
        let ramdon=new Date().getTime();
        //get user image
        this.auth.getPerfilImage(this.userData.id,ramdon).subscribe(
            result=>{
                if (result==null) {
                    this.perfilImage=`http://138.68.19.227:8187/images/${ramdon}/users/${this.userData.id}`
                }
                else{
                    this.perfilImage="assets/img/user-3.jpg"
                }
            },
            error=>{
                console.log(error);
                this.perfilImage="assets/img/user-3.jpg"
            }
        )
    }
    editPerfil(){
      this.team.editUser(this.editForm.value).subscribe(
        result=>{
          //if everthing if correct update cookie.
          this.auth.updateSession(this.userData,result);
          this.getUserInfo();
          this.showSuccess('Everything was Changed Successfully');
        },
        error=>{
          console.log(error)
          this.showError('Something went wrong. Please try again')
        }
      )
    }
    changePassword(){
    //if new password and repassword are correct change password
    if (this.changePasswordForm.get('new').value==this.changePasswordForm.get('repeat').value) {
      //create json with the new password
      let data={'id':this.userData.id,'password':this.changePasswordForm.get('current').value,'newPassword':this.changePasswordForm.get('new').value};
      this.auth.changePassword(data, this.userData.token).subscribe(
        result=>{
          //if password was changed show message
          if(result['id']){
            this.showSuccess('Your Password was Changed Successfully')
            this.changePasswordForm.reset;
          }
          //if password was not changed show error
          else if(!result['valid']){
            this.showError('Current Password Incorrect!');
          }
        }
      )
    }
    else{
      this.showError('passwords not match');
    }
  }
  showFormPassword(){
    if (this.showForm) {
      this.showForm=false;
    }
    else{
      this.showForm=true;
    }
  }
  showError(e) {
    this.toastr.error('Error', e,{positionClass:"toast-top-center"});
  }
  showSuccess(s) {
    this.toastr.success('Well Done', s,{positionClass:"toast-top-center"});
  }
}