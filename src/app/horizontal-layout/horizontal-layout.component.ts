import { Component, OnInit, AfterViewInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation, AnimationTransitionEvent }      from '@angular/core';
import { BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import * as Ps from 'perfect-scrollbar';
import { TourService } from 'ngx-tour-ng-bootstrap';
declare var $ : any;

const screenfull = require('screenfull');

@Component({
   selector: 'ms-horizontal',
   templateUrl:'./horizontal-layout-component.html',
})
export class HorizontalLayoutComponent implements OnInit, AfterViewInit {

	  private _router: Subscription;
    header: string;
    currentLang = 'en';
    url: string;
    showSettings = false;
    themeSkinColor: any = "light";
    dark: boolean;
    boxed: boolean;
    customizerIn: boolean = false;
    chatWindowOpen: boolean = false;
    chatSidebar: boolean = false;
    sidebarClosed: boolean = false;
    root = 'ltr';
    
    private _mediaSubscription: Subscription;
    isMobile: boolean = false;
    private _routerEventsSubscription: Subscription;
    public innerWidth: any;


  	constructor(public tourService: TourService, private breadcrumbService: BreadcrumbService, private pageTitleService: PageTitleService, public translate: TranslateService, private router: Router, private media: ObservableMedia) {
      const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en'); 
    }

    ngAfterViewInit(){
      /** Add oveflow-menu class for horizontal layout on small screen resolution **/
      this.innerWidth = window.innerWidth;
        if(this.innerWidth <= 959){
           this.router.navigate(['/dashboard/dashboard-v1']);
         }
        if ($('.horizontal-menu').length > 0) {
           $(".horizontal-menu > li").each(function() {
              var $obj = $(this).offset();
              if (($(window).width()) - ($obj.left) < 600) {
                 $(this).addClass("overflow-left-menu");
              }
           });
        }
    }

  	ngOnInit() {

        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            this.url = event.url;
        });
        
        if (this.url != '/session/login' && this.url != '/session/register' && this.url != '/session/forgot-password' && this.url != '/session/lockscreen') {

            /** Perfect scrollbar for chat window **/
            const elemChatbar = <HTMLElement>document.querySelector('.chat-inner ');
            if (window.matchMedia(`(min-width: 960px)`).matches) {
                Ps.initialize(elemChatbar, { wheelSpeed: 2, suppressScrollX: true });
               
            }
        }

        this.pageTitleService.title.subscribe((val: string) => {
            this.header = val;
        });
        
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            this.url = event.url;
        });

        // Add slideDown animation to dropdown
        $('.dropdown').on('show.bs.dropdown', function(e){
          $(this).find('.dropdown-menu').first().stop(true, true).slideDown(500);
        });

        // Add slideUp animation to dropdown
        $('.dropdown').on('hide.bs.dropdown', function(e){
          $(this).find('.dropdown-menu').first().stop(true, true).slideUp(500);
        });

        //Add class on focus of search box in header
        $('.search-form input').focus(function () {
            $(this).parent().addClass('search-active');
        }).blur(function () {
            $(this).parent().removeClass('search-active');
        });
        
  	}

    ngOnDestroy() {
        this._router.unsubscribe();
      /**  this._mediaSubscription.unsubscribe(); **/
    }

  	/** Detect the screen resolution size on resize and perform action accordingly **/

    @HostListener('window:resize', ['$event'])
    onResize(event) {
    	this.innerWidth = window.innerWidth;

        if ($('.horizontal-menu').length > 0) {
           $(".horizontal-menu > li").each(function() {
              var $obj = $(this).offset();
              if (($(window).width()) - ($obj.left) < 600) {
                 $(this).addClass("overflow-left-menu");
              }
           });
        }

        if(this.innerWidth <= 959){
        	this.router.navigate(['/dashboard/dashboard-v1']);
        }
    }

    /** Functionality of full screen event **/
    isFullscreen: boolean = false;
    toggleFullscreen() {
      if (screenfull.enabled) {
        screenfull.toggle();
          this.isFullscreen = !this.isFullscreen;
      }
    }

    customizerFunction() {
        this.customizerIn = !this.customizerIn;
    }

    chatWindowFunction() {
        this.chatWindowOpen = !this.chatWindowOpen;
    }
    
    chatSidebarFunction(){
        this.chatSidebar = !this.chatSidebar;
    }

    changeThemeColor(color){
        this.themeSkinColor = color; 
    }
	
}



