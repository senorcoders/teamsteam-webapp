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
  constructor(
    private router: Router,private fb:FormBuilder,private auth:AuthenticationService,private toastr: ToastrService
  ) { }

  login(){
    this.auth.login(this.loginForm.value).subscribe(

      data=>{
        if (data['message']) {
          this.showError(data['message'])
        }
        else{
          this.auth.setLoginData(data)
          window.location.href = '/dashboard/dashboard-v1';
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
    this.loginForm=this.fb.group({
      email:['', [Validators.required, Validators.email]],
      password:['', Validators.required],
    })
    if(this.auth.isLogged()){
      this.router.navigate(["/dashboard/dashboard-v1"])
    }
  }	
}



