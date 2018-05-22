import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {TeamService} from "../../services/team.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs/Rx";
import { ToastrService } from 'ngx-toastr';

@Component({
   selector: 'ms-register-session',
   templateUrl:'./register-component.html',
   styleUrls: ['./register-component.scss'],
   encapsulation: ViewEncapsulation.None,
})
export class RegisterComponent {
  sports: Array<any>;
	registerForm:FormGroup;
  constructor(
    private teamService:TeamService, private fb:FormBuilder,private toastr: ToastrService, private auth:AuthenticationService
  ) { }
  ngOnInit() {
    this.sports=[
		{
	    id: 'default',
	    text: 'choose one'
		},
		{
			id:'soccer',
			text:'soccer'
		},
		{
			id:'football',
			text:'football'
		},
		{
			id:'voleyball',
			text:'voleyball'
		},
		{
			id:'baseball',
			text:'baseball'
		}
		];
    this.registerForm=this.fb.group({
  		username:['', Validators.required],
  		password:['', Validators.required],
  		repassword:['', Validators.required],
  		firstName:['', Validators.required],
  		lastName:['', Validators.required],
  		email:['', [Validators.required, Validators.email]],
  		teamName:['', Validators.required],
  		description:['', Validators.required],
  		sport:['', Validators.required],
  		city:['', Validators.required]
  	})
  	}
  register(){
  	//check password and repassword
  	if (this.registerForm.get('password').value==this.registerForm.get('repassword').value) {
  		//prepare data
  		let data={
  			"username":this.registerForm.get('username').value,
  			"password":this.registerForm.get('password').value,
  			"firstName":this.registerForm.get('firstName').value,
  			"lastName":this.registerForm.get('lastName').value,
  			"email":this.registerForm.get('email').value,
  			"teamName":this.registerForm.get('teamName').value,
  			"description":this.registerForm.get('description').value,
  			"sport":this.registerForm.get('sport').value,
  			"city":this.registerForm.get('city').value,
  			"configuration": { "valid": true }
  		}
  		this.auth.checkEmail(this.registerForm.get('email').value).subscribe(
	  		result=>{
	  			if (result['valid']) {
	  				this.teamService.register(data).subscribe(
			  			result=>{
			  				this.showSuccess('Team Registered');
                let loginCredential={
                  'email':data.email,
                  'password':data.password
                }
                this.auth.login(loginCredential).subscribe(
                  result=>{
                    this.auth.setLoginData(result)
                    window.location.href = '/dashboard/dashboard-v1';
                  },
                  error=>{
                    this.showError(error.error)
                    console.log(error)
                  }
                )
			  			},
			  			error=>{
			  				this.showError(error.error);
			  				console.log(error);
			  			}
					)
	  			}
			  	else{
			  		this.showError('Email is already in use')
			  	}
	  		},
	  		error=>{
				console.log(error);
	  		}
  		)
  	}
  	else{
  		this.showError('Password and Repeat password not matched')
  	}
  }
  showSuccess(m){
  	this.toastr.success(m,'Well Done',{positionClass:"toast-top-right"})
  }
  showError(e){
  	this.toastr.error(e,'Error',{positionClass:"toast-top-right"})
  }	
}



