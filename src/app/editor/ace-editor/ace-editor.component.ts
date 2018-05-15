import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { PageTitleService } from '../../core/page-title/page-title.service';
import {fadeInAnimation} from "../../core/route-animation/route.animation";
import { AceEditorComponent } from 'ng2-ace-editor'; 

@Component({
  selector: 'ms-ace-editor',
  templateUrl: './ace-editor.html',
  styleUrls: ['./ace-editor.scss'],
  encapsulation: ViewEncapsulation.None,
    host: {
        "[@fadeInAnimation]": 'true'
    },
    animations: [ fadeInAnimation ]
})

export class AceEditorDemoComponent implements OnInit {

  constructor(private pageTitleService: PageTitleService) {}
   ngOnInit() {
    	this.pageTitleService.setTitle("Ace Editor");
   	}  

    @ViewChild('editor') editor;
    text: string = "<style>.button{font-size: 12px; color: #ff0;}</style>";
 
    ngAfterViewInit() {
        this.editor.setTheme("monokai");
 
        this.editor.getEditor().setOptions({
            enableBasicAutocompletion: true
        });
 
        this.editor.getEditor().commands.addCommand({
            name: "showOtherCompletions",
            bindKey: "Ctrl-.",
            exec: function (editor) {
 
            }
        })
    }
}
