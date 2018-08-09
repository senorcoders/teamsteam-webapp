import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import {Router} from "@angular/router";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {TeamService} from "../../services/team.service";
import {AuthenticationService} from "../../services/authentication.service";
import {Observable} from "rxjs";
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
  uuid:any;
  model='Navigator';
  platform:any;
  versionOS:any;
  showEmailStatus:boolean=false;
  showButton:boolean=true
  constructor(
    private teamService:TeamService, private fb:FormBuilder,private toastr: ToastrService, private auth:AuthenticationService, private router:Router
  ) { }
  ngOnInit() {
    this.getSO();
    this.getBrowserVersion();
    this.randomString();
    this.sports=[
		{
	    id: 'default',
	    text: 'choose one'
		},
		{
			id:'football',
			text:'SOCCER'
		},
		{
			id:'basketball',
			text:'BASKETBALL'
		},
		{
			id:'bowling',
			text:'BOWLING'
		},
		{
			id:'baseball',
			text:'BASEBALL & SOFTBALL'
		},
    {
      id:'cheerleading',
      text:'CHEERLEADING'
    },
    {
      id:'crew&rowing',
      text:'CREW&ROWING'
    },
    {
      id:'crosscountry',
      text:'BCROSSCOUNTRY'
    },
    {
      id:'fieldhockey',
      text:'FIELDHOCKEY'
    },
    {
      id:'golf',
      text:'GOLF'
    },
    {
      id:'hockey',
      text:'HOCKEY'
    },
    {
      id:'lacrosse',
      text:'LACROSSE'
    },
    {
      id:'rugby',
      text:'RUGBY'
    },
    {
      id:'swimming&diving',
      text:'SWIMMING&DIVING'
    },
    {
      id:'tennis',
      text:'TENNIS'
    },
    {
      id:'track&field',
      text:'TRACK&FIELD'
    },
    {
      id:'volleyball',
      text:'VOLLEYBALL'
    },
    {
      id:'waterpolo',
      text:'WATERPOLO'
    },
    {
      id:'WRESTLING',
      text:'WRESTLING'
    }
		];
    this.registerForm=this.fb.group({
  		username:['', Validators.required],
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
    //prepare data
  	let data={
			"username":this.registerForm.get('username').value,
			"firstName":this.registerForm.get('firstName').value,
			"lastName":this.registerForm.get('lastName').value,
			"email":this.registerForm.get('email').value,
      "uuid": this.uuid ,
      "model": this.model,
      "platform": this.platform,
      "versionOS": this.versionOS,
			"teamName":this.registerForm.get('teamName').value,
			"description":this.registerForm.get('description').value,
			"sport":this.registerForm.get('sport').value,
			"city":this.registerForm.get('city').value,
      "newTeam": true,
			"configuration": { "valid": true }
  	}
		this.teamService.register(data).subscribe(
			result=>{
				this.showSuccess('Team Registered, Login to enjoy the app');
        this.registerForm.reset();
        this.router.navigate(['/loginone'])
			},
			error=>{
				this.showError(error.error);
				console.log(error);
			}
	  )
  }
  checkEmail(){
    this.auth.checkEmail(this.registerForm.get('email').value).subscribe(
      result=>{
        if(result['valid']){
          this.showEmailStatus=false
          this.showButton=true
        }
        else{
          this.showEmailStatus=true;
          this.showButton=false;
        }
      }
    )
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
  showSuccess(m){
  	this.toastr.success(m,'Well Done',{positionClass:"toast-top-right"})
  }
  showError(e){
  	this.toastr.error(e,'Error',{positionClass:"toast-top-right"})
  }	
}



