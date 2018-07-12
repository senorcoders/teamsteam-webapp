import { Component, OnInit,ViewEncapsulation, Input } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import {FormBuilder, Validators, FormGroup} from "@angular/forms";
import {TeamService} from '../../services/team.service';
import {AuthenticationService} from '../../services/authentication.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-edit-form-builder',
  templateUrl: './edit-form-builder.component.html',
  styleUrls: ['./edit-form-builder.component.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class EditFormBuilderComponent implements OnInit {
  @Input() data: any;
  form:any=[];
	editForm:boolean=false;
	formEdit:FormGroup;
	builderForm:FormGroup;
	teams:any=[];
	userData:any;
  dataFormat:any;
  constructor(private pageTitleService: PageTitleService,private fb:FormBuilder, private teamService: TeamService, private auth: AuthenticationService, private toast:ToastrService) { }

  ngOnInit() {
    this.dataFormat=JSON.parse(this.data);
    //set the values
    this.dataFormat.fields.forEach((data)=>{
      this.form.push(data)
    })
    console.log(this.form)
    console.log(this.dataFormat)
  	//get user info from login
  	this.getUserInfo();
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
    	title:[this.dataFormat.title, Validators.required],
    	description:[this.dataFormat.description, Validators.required],
    	team:[this.dataFormat.team.id, Validators.required]
    })
  }
  getUserInfo(){
    this.userData= this.auth.getLoginData();
    this.getTeams();
  }
  //get teams by current user only is user is manager
  getTeams(){
    this.userData.roles.forEach((data)=>{
      if(data.name=="Manager"){
        let val={
          id:data.team.id,
          name:data.team.name
        }
        this.teams.push(val)
      }
    })
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
  //edit the forms
  EditForm(){
  	//create the json data
  	let data={
  		'title':this.builderForm.get('title').value,
  		'description':this.builderForm.get('description').value,
  		'team':this.builderForm.get('team').value,
  		'fields':this.form
  	}
  	//send the data to service
  	this.teamService.editData(`registrationtemplate/${this.dataFormat.id}`,data).subscribe(
  		result=>{
  			this.builderForm.reset();
        this.form=[];
        this.showSuccess('Form was edited')
  		},
  		error=>{
  			this.showError('Something wrong happened. Please try again')
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
    console.log(this.form[i])
  	//hide the form
  	this.editForm=false
  	//clean the form
  	this.formEdit.reset
  }
  //add textarea input
  addTextarea(){
    this.form.push({
      group:"textarea",
      fields:[{
        label:"textarea",
        type:"textarea",
        required:false,
        col:"12",
        desc:"textarea"
      }]
    })
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
