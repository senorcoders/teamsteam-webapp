import { Component, OnInit, ViewChild,ElementRef } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import { ToastrService } from 'ngx-toastr';
import {AuthenticationService} from '../../services/authentication.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list-player',
  templateUrl: './list-player.component.html',
  styleUrls: ['./list-player.component.scss'],
})
export class ListPlayerComponent implements OnInit {
  ngOnInit(){
    
  }
}