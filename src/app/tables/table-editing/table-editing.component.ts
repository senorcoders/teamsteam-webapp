"use strict";

import { Component, OnInit,ViewEncapsulation} from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";

@Component({
    selector: 'ms-editing-table',
    templateUrl:'./table-editing-component.html',
    styleUrls: ['./table-editing-component.scss'],
    encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})
export class EditingTableComponent implements OnInit {

      editing = {};
      rows = [];

      constructor(private pageTitleService: PageTitleService) {
        this.fetch((data) => {
          this.rows = data;
        });
      }

      ngOnInit() {
        this.pageTitleService.setTitle("Editing");
      }

      fetch(cb) {
        const req = new XMLHttpRequest();
        req.open('GET', `assets/data/company.json`);

        req.onload = () => {
          cb(JSON.parse(req.response));
        };

        req.send();
      }

      updateValue(event, cell, cellValue, row) {
        this.editing[row.$$index + '-' + cell] = false;
        this.rows[row.$$index][cell] = event.target.value;
      }
  
}



