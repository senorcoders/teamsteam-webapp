import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PageTitleService } from '../../core/page-title/page-title.service';
import { fadeInAnimation } from "../../core/route-animation/route.animation";
import { TeamService } from '../../services/team.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../services/authentication.service';
import { Interceptor } from '../../interceptor/interceptor';
import { Router } from '@angular/router';
import { environment } from 'environments/environment';

@Component({
	selector: 'app-list-player',
	templateUrl: './list-player.component.html',
	styleUrls: ['./list-player.component.scss'],
	encapsulation: ViewEncapsulation.None,
	host: {
		"[@fadeInAnimation]": 'true'
	},
	animations: [fadeInAnimation]
})
export class ListPlayerComponent implements OnInit {
	teams: any = [];
	teamID: any;
	res: boolean
	players: any;
	images: any = [];
	userID: string;
	playerID: string;
	showPlayer: boolean = false;
	showNoPlayer: boolean = false;
	showPopup: boolean = false;
	showLoading: boolean = false;
	private base64image: String = "";
	editPlayer: FormGroup;
	preview: string;
	contacts: any;
	contactEmerg: any = [];
	def: any = `/assets/img/user-3.jpg`;
	isSuperAdmin: boolean = false;
	constructor(private pageTitleService: PageTitleService, private team: TeamService,
		private auth: AuthenticationService, private fb: FormBuilder,
		private toast: ToastrService, private route: Router
	) {

	}

	ngOnInit() {
		this.pageTitleService.setTitle("Player list");
		this.getTeam()
	}
	getTeam() {
		let login = this.auth.getLoginData();
		environment.superadmin.forEach((data) => {
			if (login.email === data) {
				this.team.getRoles().subscribe(result => {
					let equipos: any = result;
					equipos.forEach((data) => {
						if (data.name == "Manager") {
							let team = {
								id: data.team.id,
								name: data.team.name
							}
							this.teams.push(team);
						}
					})
				})
				this.isSuperAdmin = true
			}
		})

		if (this.isSuperAdmin == false) {
			login.roles.forEach((data) => {
				if (data.name == "Manager") {
					let team = {
						id: data.team.id,
						name: data.team.name
					}
					this.teams.push(team);
				}
			})
		}

	}
	getUserImage(player) {
		return Interceptor.url + `/userprofile/images/${player.user.id}/${player.team.id}`;
	}

	getPlayerByTeam(val) {
		this.showLoading = true;
		if (val != '') {
			this.teamID = val;
			this.team.getData(`players?where={"team":"${val}"}`).subscribe(
				result => {
					result = (result as any).filter(it => {
						return it.hasOwnProperty("user");
					});
					this.players = result
					if (this.players.length > 0) {
						this.showPlayer = true
						this.showNoPlayer = false
						this.showLoading = false;
					}
					else {
						this.showPlayer = false
						this.showNoPlayer = true;
						this.showLoading = false;
					}
				},
				e => {
					console.log(e)
					this.showLoading = false;
				}
			)
		}
	}
	errorHandler(event) {
		event.target.src = "/assets/img/user.png";
	}
	showPopUp(index) {
		this.userID = this.players[index].user.id
		this.playerID = this.players[index].id
		this.contacts = this.players[index].family;
		this.showPopup = true
		this.editPlayer = this.fb.group({
			username: [this.players[index].user.username, Validators.required],
			firstname: [this.players[index].user.firstName, Validators.required],
			lastname: [this.players[index].user.lastName, Validators.required],
			birthDay: [this.players[index].birthDay],
			email: new FormControl({ value: this.players[index].user.email, disabled: true }),
			gender: [this.players[index].gender, Validators.required],
			positions: [this.players[index].positions[0], Validators.required],
			yerseyNumber: [this.players[index].yerseyNumber, Validators.required],
			nonPlayer: [this.players[index].nonPlayer, Validators.required],
			managerAccess: [this.players[index].managerAccess, Validators.required],
			team: [this.players[index].team.id, Validators.required],
		})
	}
	deletePlayer(i) {
		//need to get role of player to delete it.
		let role;
		this.team.getData(`roles?where={"user":"${this.players[i].user.id}","team":"${this.teamID}"}`).subscribe(
			result => {
				role = result[0].id
				this.team.deleteData('players/' + this.players[i].id).subscribe(
					result => {
						this.team.deleteData('roles/' + role).subscribe(
							result => {
								this.getPlayerByTeam(this.teamID)
								this.toast.success('Player deleted', 'Well Done', { positionClass: "toast-top-right" });
							},
							e => {
								this.toast.error('Something wrong happened, Please try again', 'Error', { positionClass: "toast-top-right" });
							}
						)
					},
					e => {
						this.toast.error('Something wrong happened, Please try again', 'Error', { positionClass: "toast-top-right" });
					}
				)
			},
			e => { console.log(e) }
		)
	}
	savePlayer() {
		//edit user
		let user = {
			username: this.editPlayer.get('username').value,
			firstName: this.editPlayer.get('firstname').value,
			lastName: this.editPlayer.get('lastname').value
		}
		let player = {
			birthDay: this.editPlayer.get('birthDay').value,
			gender: this.editPlayer.get('gender').value,
			positions: this.editPlayer.get('positions').value,
			yerseyNumber: this.editPlayer.get('yerseyNumber').value,
			nonPlayer: this.editPlayer.get('nonPlayer').value,
			managerAccess: this.editPlayer.get('managerAccess').value,
			team: this.editPlayer.get('team').value,
		}
		this.team.editData('user/' + this.userID, user).subscribe(
			result => {
				//edit player
				this.team.editData('players/' + this.playerID, player).subscribe(
					result => {
						this.toast.success('Player Updated', 'Well Done', { positionClass: "toast-top-right" });
					}
					, e => {
						console.log(e);
						this.toast.error('Something wrong happened, Please try again', 'Error', { positionClass: "toast-top-right" });
					}
				)
			}
			, e => {
				console.log(e);
				this.toast.error('Something wrong happened, Please try again', 'Error', { positionClass: "toast-top-right" });
			}
		)
		//edit image
		if (this.base64image != "") {
			let image = { 'id': this.userID, 'image': this.base64image }
			this.team.uploadImage(image).subscribe(
				data => {
					this.toast.success('Player Image Updated', 'Well Done', { positionClass: "toast-top-right" });
				},
				error => {
					this.toast.error('Something wrong happened trying to upload the player image, Please try again', 'Error', { positionClass: "toast-top-right" });
				}
			)
		}
		//set image array empty
		this.images = [];
		this.getPlayerByTeam(this.editPlayer.get('team').value)
		this.showPopup = false
	}
	closePopUp() {
		this.showPopup = false
	}
	uploadImage(event: FileList) {
		let preview = document.querySelector('#previewPlayerImg');
		let file = event.item(0);
		//to convert base64
		let reader = new FileReader();
		//to show image
		let reader2 = new FileReader();
		// Client-side validation example
		if (file.type.split('/')[0] !== 'image') {
			this.toast.error('unsupported file type', 'Error', { positionClass: "toast-top-right" });
			return;
		}
		reader2.onloadend = function () {
			preview.setAttribute('src', reader2.result as string);
		}
		if (file) {
			reader.onload = this._handleReaderLoaded.bind(this);
			reader.readAsBinaryString(file);
			reader2.readAsDataURL(file);
		}
	}
	_handleReaderLoaded(readerEvt) {
		let binaryString = readerEvt.target.result;
		this.base64image = btoa(binaryString);
	}

	toViewPlayer(player) {
		this.route.navigate([`player/view/${player.id}`]);
	}
}