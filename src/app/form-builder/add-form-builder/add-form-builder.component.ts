import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {TeamService} from '../../services/team.service';
import {AuthenticationService} from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-form-builder',
  templateUrl: './add-form-builder.component.html',
  styleUrls: ['./add-form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class AddFormBuilderComponent implements OnInit {
  form:any=[];
	editForm:boolean=false;
	formEdit:FormGroup;
	builderForm:FormGroup;
	teams:any;
	userData:any;
  constructor(private pageTitleService: PageTitleService,private fb:FormBuilder, private teamService: TeamService, private auth: AuthenticationService, private toast:ToastrService) { }

  ngOnInit() {
    this.pageTitleService.setTitle("Add Form Builder");
  	//get user info from login
  	this.getUserInfo();
  	//add required fields to form
  	this.initialData();
    //create form to edit the fields values
    this.formEdit=this.fb.group({
    	label:['', Validators],
    	description:['', Validators],
    	required:[''],
    	index:[''],
    	arrayFieldIndex:['']

    })
    //create form to save the forms
    this.builderForm=this.fb.group({
    	title:['', Validators.required],
    	description:['', Validators.required],
    	team:['', Validators.required]
    })
  }
  initialData(){
    this.form.push({
  		group:"name",
  		fields:[{
  			label: 'Participant First Name',
	      	type: "text",
	      	required:true,
	      	col:6,
	      	desc:'User Name',
  		},
		{
  			label: 'Participant Last Name',
      		type: "text",
      		required:true,
	      	col:6,
	      	desc:'User Name',
  		}
  		]
  	},
  	{
  		group:'email',
  		fields:[{
  			label: 'Participant Email',
      		type: "email",
	      	required:true,
	      	col:12,
	      	desc:'User Email',
	      	collection:"email",
  		}
  		]
  	});
  }
  getUserInfo(){
    this.userData= this.auth.getLoginData();
    this.getTeams();
  }
  //get teams by current user
  getTeams(){
   this.teams=this.userData.roles;
  }
  //show the edit form with the default data
  ShowEditForm(data,i,j){
  	this.editForm=true;
  	this.formEdit=this.fb.group({
      label:[data.label,Validators.required],
      description:[data.desc,Validators.required],
      required:[data.required],
      arrayIndex:[i],
      arrayFieldIndex:[j]
    });
  }
  //delete fields
  deleteField(i, j){
  	if (this.form[i].fields.length==1) {
  		this.form.splice(i,1);
  	}
  	else{
  		this.form[i].fields.splice(j,1)
  	}
  }
  orderUp(i){
  	if(i>2){
		let tmp = this.form[i];
		this.form[i]= this.form[i-1];
		this.form[i-1] = tmp;
  	}
  }
   orderDown(i){
   	let j=i+1;
   	if(j<this.form.length){
	  	let tmp = this.form[i];
		this.form[i]= this.form[i+1];
		this.form[i+1] = tmp;
	}
  }
  //save the forms
  saveForm(){
  	//create the json data
  	let data={
  		'title':this.builderForm.get('title').value,
  		'description':this.builderForm.get('description').value,
  		'team':this.builderForm.get('team').value,
  		'fields':this.form
  	}
    this.showSuccess('Form was saved');
  	//send the data to service
  	this.teamService.formBuilder(data).subscribe(
  		result=>{
  			this.builderForm.reset();
        this.form=[];
        this.initialData();
  		},
  		error=>{
  			this.showError(error.error)
  			console.log(error)
  		}
  	)
  }
  //save the data edited
  saveDataEdited(){
  	//get the array index
  	let i=this.formEdit.get('arrayIndex').value;
  	let j=this.formEdit.get('arrayFieldIndex').value;
  	//save preview data before save the new one
  	let oldData=this.form[i];
  	//create the new data
  	this.form[i].fields[j]={
		label:this.formEdit.get('label').value,
	  	type: oldData.fields[j].type,
	  	required:this.formEdit.get('required').value,
	  	col:oldData.fields[j].col,
	  	desc:this.formEdit.get('description').value,
  	}
  	//hide the form
  	this.editForm=false
  	//clean the form
  	this.formEdit.reset
  }
  //add new input to the form
  addInput(groupName,label, type, required, col, desc){
  	let orderPlus=this.form[this.form.length - 1].order;
  	//school has two inputs. so here is adding school and grade
  	if(label=="School"){
  		this.form.push({
  			group:groupName,
  			fields:[{
				label: label,
		      	type: type,
		      	required:required,
		      	col:col,
		      	desc:desc
  			},
  			{
				label: "grade",
		      	type: type,
		      	required:required,
		      	col:col,
		      	desc:desc
  			}]
	    })
  	} //address has many inputs.
  	else if(label=="Address"){
  		this.form.push({
  			group:groupName,
  			fields:[{
  				label:"Street Address",
	  			type: type,
		      	required:required,
		      	col:col,
		      	desc:desc
  			},
  			{
  				label:"Apartment, Suite, unit etc",
	  			type: type,
		      	required:required,
		      	col:col,
		      	desc:desc,
  			},
  			{
  				label:"City",
	  			type: type,
		      	required:required,
		      	col:6,
		      	desc:desc,
  			},
  			{
  				label:"Zip Code / Postal Code",
	  			type: "number",
		      	required:required,
		      	col:6,
		      	desc:desc,
  			},
  			{
  				label:"Select a State",
	  			type: "select",
		      	required:required,
		      	col:6,
		      	desc:desc,
  			},
  			{
  				label:"select a country",
	  			type: "select",
		      	required:required,
		      	col:6,
		      	desc:desc,
  			}]
  		})
  	}//emergency has many inputs.
  	else if(label=="Emergency"){
  		this.form.push({
  			group:groupName,
  			fields:[{
  				label:"Emergency Contact Name",
	  			type: "text",
		      	required:required,
		      	col:6,
		      	desc:desc,
  			},
  			{
				label:"Emergency Contact Relationship",
	  			type: "text",
		      	required:required,
		      	col:6,
		      	desc:desc,
  			},
  			{
  				label:"Emergency Contact Phone",
	  			type: "tel",
		      	required:required,
		      	col:12,
		      	desc:desc,
  			}]
  		})
  	}//when only need to add one input
  	else{
  		this.form.push({
  			group:groupName,
  			fields:[{
				label: label,
		      	type: type,
		      	required:required,
		      	col:col,
		      	desc:desc
  			}]
	    });
  	}
  }
  showError(e){
  	this.toast.error(e,"Error",{positionClass:"toast-top-center"})
  }
  showSuccess(s){
  	this.toast.success(s,"Well Done",{positionClass:"toast-top-center"})
  }

}
