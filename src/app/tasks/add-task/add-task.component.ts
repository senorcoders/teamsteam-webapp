import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {PageTitleService} from '../../core/page-title/page-title.service';
import {fadeInAnimation} from '../../core/route-animation/route.animation';
import {FormBuilder, Validators, FormGroup} from '@angular/forms';
import {TeamService} from '../../services/team.service';
import {AuthenticationService} from '../../services/authentication.service';
import {ToastrService} from 'ngx-toastr';
import {INgxMyDpOptions} from 'ngx-mydatepicker';

@Component({
  selector: 'app-add-tasks',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss'],
  encapsulation: ViewEncapsulation.None,
  host: {
    '[@fadeInAnimation]': 'true'
  },
  animations: [fadeInAnimation]
})
export class AddTaskComponent implements OnInit {
  form: any = [];
  editForm = false;
  formEdit: FormGroup;
  taskForm: FormGroup;
  teams: any = [];
  userData: any;
  currentDate = new Date();
  players: any;
  showPlayer = false;
  CurrentTime: any;
  public myDatePickerOptions: INgxMyDpOptions = {
    dateFormat: 'mm.dd.yyyy',
    alignSelectorRight: true,
    disableUntil: {
      year: this.currentDate.getFullYear(),
      month: this.currentDate.getMonth() + 1,
      day: this.currentDate.getDate() - 1,
    }
  };

  constructor(private pageTitleService: PageTitleService, private fb: FormBuilder, private team: TeamService,
              private auth: AuthenticationService, private toast: ToastrService) {
  }

  ngOnInit() {
    this.CurrentTime = this.currentDate.getHours() + ':' + this.currentDate.getMinutes() + ':' + this.currentDate.getSeconds()
    this.pageTitleService.setTitle('Add Task');
    this.userData = this.auth.getLoginData();
    this.getTeams()
    this.taskForm = this.fb.group({
      name: ['', Validators.required],
      text: ['', Validators.required],
      team: ['', Validators.required],
      dateTime: ['', Validators.required],
      time: [this.CurrentTime],
      for: ['', Validators.required]
    })
  }

  getPlayerByTeam(id) {
    this.team.getData(`players?where={"team":"${id}"}`).subscribe(
      result => {
        this.showPlayer = true;
        this.players = result;
      },
      e => {
        console.log(e)
      }
    )
  }

  saveTask() {
    let dateTime = this.taskForm.get('dateTime').value;
    dateTime = dateTime['date']['year'] + '-' + dateTime['date']['month'] + '-' + dateTime['date']['day'] + ' ' + this.taskForm.get('time').value
    const date = new Date(dateTime);
    const formatDate = date.toISOString()
    const data = {
      name: this.taskForm.get('name').value,
      text: this.taskForm.get('text').value,
      dateTime: formatDate,
      team: this.taskForm.get('team').value,
      from: this.userData.id,
      for: this.taskForm.get('for').value,
      completad: false
    }
    this.team.saveData('task/', data).subscribe(
      result => {
        this.toast.success('Task saved', 'Well Done', {positionClass: 'toast-top-right'});
        this.taskForm.reset()
      },
      e => {
        console.log(e)
        this.toast.error('Something wrong happened. Please try again', 'Error', {positionClass: 'toast-top-right'});
      }
    )
  }

  setDate(): void {
    const date = new Date();
    this.taskForm.patchValue({
      dateTime: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }

  clearDate(): void {
    // Clear the date using the patchValue function
    this.taskForm.patchValue({dateTime: null});
  }

  getTeams(): void {
    this.userData.roles.forEach((data) => {
      if (data.name === 'Manager' && data.team) {
        const val = {
          id: data.team.id,
          name: data.team.name
        }
        this.teams.push(val)
      }
    })
  }
}
