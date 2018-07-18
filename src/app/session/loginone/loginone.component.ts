import { Component, OnInit ,ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormBuilder, FormGroup, Validators,FormControl} from '@angular/forms';
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs/Rx";
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'ms-loginone-session',
   templateUrl:'./loginone-component.html',
   styleUrls: ['./loginone-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class LoginoneComponent implements OnInit {
	loginForm: FormGroup;
  uuid:any;
  model='Navigator';
  platform:any;
  versionOS:any;
  constructor(
    private router: Router,private fb:FormBuilder,private auth:AuthenticationService,private toastr: ToastrService
  ) { }
  login(){
    let data={
     uuid: this.uuid ,
     model: this.model,
     platform: this.platform,
     versionOS: this.versionOS,
     email:this.loginForm.get('email').value
    }
    this.auth.login(data).subscribe(
      data=>{
        console.log(data)
        if(data && data['verify']=="email"){
         this.toastr.success('We send you an email, please check it and login again', 'Well Done',{positionClass:"toast-top-center"});
        }
        else if(data['message']){
          this.showError(data['message'])
        }
        else{
          this.auth.setLoginData(data)
          this.router.navigate(['/userprofile']);
        }
      },
      error=>{
        console.error(error);
        this.showError(error.error);
        
      }
    );
  }
  showError(e) {
    this.toastr.error('Error', e,{positionClass:"toast-top-center"});
  }
  ngOnInit() {
    let uuid=this.auth.getLocalStorage('uuid')
    if(uuid && uuid!=''){
      this.uuid=uuid
    }
    else{
        console.log('no')
      this.randomString()
    }
    this.getSO();
    this.getBrowserVersion();
    this.loginForm=this.fb.group({
      email:['', [Validators.required, Validators.email]]
    })
    if(this.auth.isLogged()){
      this.router.navigate(["/userprofile"])
    }
  }	
  //get SO
  getSO(){
    this.platform=window.navigator.appVersion
  }
  //generate uuid random
  randomString() {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
    let string_length = 7;
    let randomstring = '';
    for (let i=0; i<string_length; i++) {
      let rnum = Math.floor(Math.random() * chars.length);
      randomstring += chars.substring(rnum,rnum+1);
    }
    this.auth.setLocalStorage('uuid',randomstring)
    this.uuid=randomstring;
  }
  //get browser version
  getBrowserVersion(){
    let sayswho= (()=>{
      var ua= navigator.userAgent, tem, 
      M= ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
      if(/trident/i.test(M[1])){
          tem=  /\brv[ :]+(\d+)/g.exec(ua) || [];
          return 'IE '+(tem[1] || '');
      }
      if(M[1]=== 'Chrome'){
          tem= ua.match(/\b(OPR|Edge)\/(\d+)/);
          if(tem!= null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
      }
      M= M[2]? [M[1], M[2]]: [navigator.appName, navigator.appVersion, '-?'];
      if((tem= ua.match(/version\/(\d+)/i))!= null) M.splice(1, 1, tem[1]);
      return M.join(' ');
    })();
    this.versionOS=sayswho
  }
}



