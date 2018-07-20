import { Component, ViewChild, ElementRef, OnInit,ViewEncapsulation } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import {UserService} from '../../services/user.service';
import {ImageUploadService} from '../../services/image-upload.service';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import {TeamService} from '../../services/team.service';


@Component({
    selector: 'ms-userlist',
    templateUrl:'./userlist-component.html',
    styleUrls: ['./userlist-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class UserListComponent implements OnInit {
  @ViewChild('userImage') userImage: ElementRef;
  editUserForm: FormGroup;
  users:any;
  currentUser: any;
  userIndex: number;
  endpoint:string;
  new_image: string;
  showPopup:boolean=false
  teams:any;
  noResult:boolean=false;
  constructor(private imageupload: ImageUploadService, private userservice: UserService, private toastr: ToastrService, private fb: FormBuilder,
   private auth:AuthenticationService, private pageTitleService: PageTitleService, private team:TeamService) {
    this.users = [{
        id: 0,
        firstName: '',
        lastName:'',
        verified: false
      }
    ];
    this.currentUser = {
      id:0,
      firstName: '',
      lastName: ''      
    }
    this.userIndex =0;
    this.new_image = "";
    this.editUserForm = fb.group({
      firstName:  [this.currentUser.firstName, Validators.required],
      lastName:  [this.currentUser.lastName, Validators.required],
      email:  [this.currentUser.email, Validators.required]      
    } );
  }

  ngOnInit() {
    this.endpoint = this.auth.getBaseUrl(); 
    this.pageTitleService.setTitle("User List");
    this.getUsers();
  }
	getUsers(){    
    this.userservice.getUsers().subscribe(
      data=>{
        this.users=data;
      },
      error=>{
        console.log(error)
      }
    )
  }
  editUser(id, user){
    this.currentUser = user;
    this.userIndex = id;
  }
  trackByUsers(index: number, user: any): number {return index; }
  errorHandler(event) {
    event.target.src = "assets/img/logo-lockerroom.png";
  }
  getFormateDate(val){
    let date=new Date(val)
    return date.toString().split("GMT",1)
  }
  submitUpdateUser( updateUser) {

    let user = {      
      firstName: updateUser.firstName,
      lastName: updateUser.lastName,
      email: updateUser.email
    }
    //this.toastr.success('Well Done', 'User Updated ' + JSON.stringify(updateUser), {positionClass:"toast-top-center"});
    alert(JSON.stringify(updateUser));
    let result = this.userservice.updateUser(this.currentUser.id, user).subscribe(
      data=>{
        //document.getElementById("teamList").innerHTML = ''
        this.users[ this.userIndex ]= data;
        this.toastr.success('Well Done', 'User Updated ' + this.userIndex + ' - ' + this.new_image , {positionClass:"toast-top-center"});
        
        if(this.new_image != ""){
          this.imageupload.uploadImage( this.currentUser.id ,'user', this.new_image).subscribe(
              data=> {
                this.toastr.success('Well Done', 'Image Updated' + this.new_image, {positionClass:"toast-top-center"});
              },
              error=>{
                console.log(error);
              }
            )
        }
        this.currentUser = data;
        //this.getMyTeams();
      },
      error=>{
        console.log(error)
      }
    )
      
  }

  onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      //myReader.readAsDataURL(file);

      reader.readAsDataURL(file);      
      
      reader.onloadend = () => {        
        
        this.userImage.nativeElement.src = reader.result;

          //event.target.src = reader.result;
          //this.new_image = reader.result.split(',')[1];// reader.result;
      };
        reader.onload =this._handleReaderLoaded.bind(this);
        reader.readAsBinaryString(file);
        //reader2.readAsDataURL(file);
    }
  }
  _handleReaderLoaded(readerEvt) {
    let binaryString = readerEvt.target.result;
    this.new_image=btoa(binaryString);
  }
	deleteUser(index, user_id) {
    let result = this.userservice.deleteUser(user_id).subscribe(
      data=>{
        //document.getElementById("teamList").innerHTML = ''
        this.currentUser = data;
        //this.getMyTeams();
        this.users.splice(this.userIndex, 1);
        this.toastr.success('Well Done', 'The Team has been deleted', {positionClass:"toast-top-center"});
      },
      error=>{
        console.log(error)
      }
    )
  }
  showPopUp(id){
    this.team.getData(`roles?where={"user":"${id}"}`).subscribe(
      result=>{
        if(result['length']>0){
          this.teams=result;
          this.noResult=false;
        }
        else{
          this.noResult=true;
        }
        this.showPopup=true
      },
      e=>{
        console.log(e)
        this.toastr.error('Something wrong happened. please try again', 'Error', {positionClass:"toast-top-center"});
      }
    )
  }
  closePopUp(){
    this.showPopup=false
  }
}



