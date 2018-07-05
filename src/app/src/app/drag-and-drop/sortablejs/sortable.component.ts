import { Component, OnInit,ViewEncapsulation } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {SortablejsOptions} from "angular-sortablejs";
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-sortable',
	templateUrl:'./sortable-component.html',
	styleUrls: ['./sortable-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class SortableDemoComponent implements OnInit {

	list1: any[];
	list2: any[];
	numbers: any[];
	groupOptions: SortablejsOptions = {
		group: 'testGroup',
		handle: '.drag-handle',
		animation: 300
	};

	simpleOptions: SortablejsOptions = {
		animation: 300
	};

	constructor(private pageTitleService: PageTitleService) {}

	ngOnInit() {
		
		this.pageTitleService.setTitle("SortableJS");

		this.list1 = [
		{
			image: 'assets/img/user-1.jpg',
			name: 'Dennis',
			subject: 'Project',
			content: 'Setup the project..!'
		},
		{
			image: 'assets/img/user-2.jpg',
			name: 'Harry',
			subject: 'Birthday',
			content: 'See You there!'
		},
		{
			image: 'assets/img/user-3.jpg',
			name: 'Peter',
			subject: 'Rating',
			content: 'You are awesome!'
		},
		{
			image: 'assets/img/user-4.jpg',
			name: 'Bella',
			subject: 'Exam',
			content: 'Good Luck !'
		},
		{
			image: 'assets/img/user-1.jpg',
			name: 'Joy',
			subject: 'Issue',
			content: 'Update Crashed'
		}];

		this.list2 = [
		{
			name: 'Lou Jordan'
		},
		{
			name: 'Mic Ward'
		},
		{
			name: 'Lois Gold'
		},
		 {
			name: 'Anna Betty'
		},
        {
			name: 'Noris Lewis'
		},
		{
			name: 'Vicky Smith'
		},
		 {
			name: 'Anna Michel'
		}];

		this.numbers = [
		{
			name: 'Anne Boyd'
		},
		{
			name: 'Daniel Myers'
		},
		{
			name: 'Will Gibbs'
		},
		{
			name: 'Kathy Alex'
		},
        {
			name: 'Kate Golmes'
		},
		{
			name: 'Denna Michel'
		},
		{
			name: 'Steve White'
		}];
	}
}


