import { Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation, AnimationTransitionEvent }      from '@angular/core';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import {BreadcrumbService} from 'ng2-breadcrumb/ng2-breadcrumb';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import {MediaChange, ObservableMedia} from "@angular/flex-layout";
import * as Ps from 'perfect-scrollbar';
import { TourService } from 'ngx-tour-ng-bootstrap';
declare var $ : any;
//my imports
import {AuthenticationService} from '../services/authentication.service';
const screenfull = require('screenfull');
import { PerfilImageService } from '../core/perfil-image/perfil-image.service';

@Component({
    selector: 'chankya-layout',
  	templateUrl:'./main-material.html',
  	styleUrls: ['./main-material.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy{
    //my variables
    userData:any;
    perfilImage:string;
    isManager:boolean=false;

    private _router: Subscription;
    header: string;
    currentLang = 'en';
    url: string;
    showSettings = false;
    themeSkinColor: any = "light";
    dark: boolean;
    boxed: boolean;
    collapseSidebar: boolean;
    compactSidebar: boolean;
    customizerIn: boolean = false;
    chatWindowOpen: boolean = false;
    teamWindowOpen: boolean = false;
    chatSidebar: boolean = false;
    sidebarClosed: boolean = false;
    root = 'ltr';
    chatpanelOpen: boolean = false;
    
    private _mediaSubscription: Subscription;
    sidenavOpen: boolean = true;
    sidenavMode: string = 'side';
    isMobile: boolean = false;
    private _routerEventsSubscription: Subscription;
    public innerWidth: any;

    @ViewChild('sidenav') sidenav;
    
    _opened: boolean = true;
    _mode: string = "push";
    _closeOnClickOutside: boolean = false;
    _showBackdrop: boolean = false;
 
    public _toggleOpened(): void {
        this._opened = !this._opened;
     }

	constructor(public tourService: TourService, public menuItems: MenuItems, private breadcrumbService: BreadcrumbService, private pageTitleService: PageTitleService, public translate: TranslateService, private router: Router, private media: ObservableMedia, private auth:AuthenticationService, private PerfilImageService:PerfilImageService) {
        //get user data
        this.getUserInfo();
        if(this.userData.roles[0].name=="Manager"){
           this.isManager=true
           }

        const browserLang: string = translate.getBrowserLang();
        translate.use(browserLang.match(/en|fr/) ? browserLang : 'en');


        this.tourService.events$.subscribe(console.log);
        this.tourService.initialize([{
          anchorId: 'start.tour',
          content: 'Welcome to the TeamSteam Tour!',
          placement: 'below',
          title: 'Welcome to TeamSteam',
        },
        {
          anchorId: 'tour-ui',
          content: 'Beautifully designed Menu-Panel. Easy to use.',
          placement: 'right',
          title: 'Awesome Menu-Panel',
        },
         {
          anchorId: 'tour-search',
          content: 'Enjoying Search box with sugestion and many more things',
          placement: 'below',
          title: 'Search Box',
        },
        {
          anchorId: 'tour-full-screen',
          content: 'By pressing this button you can switch to fullscreen mode.',
          placement: 'below',
          title: 'Full Screen',
        }]
      );
        this.tourService.start();
      



        breadcrumbService.addFriendlyNameForRoute('/dashboard', 'Dashboard');
        breadcrumbService.addFriendlyNameForRoute('/dashboard/dashboard-v1', 'Dashboard V1');
        breadcrumbService.addFriendlyNameForRoute('/dashboard/dashboard-v2', 'Dashboard V2');
        //breadcrumbService.addFriendlyNameForRoute('/inbox', 'Apps / Inbox');
        // breadcrumbService.addFriendlyNameForRoute('/chat', 'Apps / Chat');

        breadcrumbService.addFriendlyNameForRoute('/teams/list', 'Team List');
        
        //breadcrumbService.addFriendlyNameForRoute('/calendar', 'Apps / Calendar');

        // breadcrumbService.addFriendlyNameForRoute('/ui-elements', 'UI-Element');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/buttons', 'Buttons');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/progress', 'Progress');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/tabs', 'Tabs');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/accordions', 'Accordions');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/pagination', 'Pagination');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/tooltip', 'Tooltip');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/cards', 'Cards');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/social-icons', 'Social Icons');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/typography', 'Typography');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/dropdown', 'Dropdown');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/alert', 'Alert');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/carousel', 'Carousel');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/datepicker', 'Datepicker');
        // breadcrumbService.addFriendlyNameForRoute('/ui-elements/slider', 'Slider');

        breadcrumbService.addFriendlyNameForRoute('/components', 'Components');
        breadcrumbService.addFriendlyNameForRoute('/components/list', 'List');
        breadcrumbService.addFriendlyNameForRoute('/components/grids', 'Grids');

        // breadcrumbService.addFriendlyNameForRoute('/forms', 'Forms');
        // breadcrumbService.addFriendlyNameForRoute('/forms/form-elements', 'Form Elements');
        // breadcrumbService.addFriendlyNameForRoute('/forms/form-group', 'Form Group');
        // breadcrumbService.addFriendlyNameForRoute('/forms/form-wizard', 'Form Wizard');
        // breadcrumbService.addFriendlyNameForRoute('/forms/form-validation', 'Form Validation');
        // breadcrumbService.addFriendlyNameForRoute('/forms/form-upload', 'Form Upload');
        // breadcrumbService.addFriendlyNameForRoute('/forms/form-tree', 'Tree');

        // breadcrumbService.addFriendlyNameForRoute('/tables', 'Table');
        // breadcrumbService.addFriendlyNameForRoute('/tables/fullscreen', 'Full Screen');
        // breadcrumbService.addFriendlyNameForRoute('/tables/selection', 'Selection');
        // breadcrumbService.addFriendlyNameForRoute('/tables/pinning', 'Pinning');
        // breadcrumbService.addFriendlyNameForRoute('/tables/sorting', 'Sorting');
        // breadcrumbService.addFriendlyNameForRoute('/tables/Paging', 'Paging');
        // breadcrumbService.addFriendlyNameForRoute('/tables/editing', 'Editing');
        // breadcrumbService.addFriendlyNameForRoute('/tables/filter', 'Filter');

        // breadcrumbService.addFriendlyNameForRoute('/dragndrop', 'Drag and Drop');
        // breadcrumbService.addFriendlyNameForRoute('/dragndrop/dragula', 'Dragula');
        // breadcrumbService.addFriendlyNameForRoute('/dragndrop/sortable', 'SortableJS');

        // breadcrumbService.addFriendlyNameForRoute('/chart', 'Charts');
        // breadcrumbService.addFriendlyNameForRoute('/chart/ng2-charts', 'NG2 Charts');
        // breadcrumbService.addFriendlyNameForRoute('/chart/easy-pie-chart', 'Easy Pie');
        // breadcrumbService.addFriendlyNameForRoute('/chart/google-chart', 'Google Charts');

        // breadcrumbService.addFriendlyNameForRoute('/maps', 'Maps');
        // breadcrumbService.addFriendlyNameForRoute('/maps/googlemap', 'Google Map');
        // breadcrumbService.addFriendlyNameForRoute('/maps/vectormap', 'Vector Map');
        // breadcrumbService.addFriendlyNameForRoute('/maps/leaflet', 'Leaflet Map');

        breadcrumbService.addFriendlyNameForRoute('/user-pages', 'User Pages');
        breadcrumbService.addFriendlyNameForRoute('/user-pages/userlist', 'User List');
        breadcrumbService.addFriendlyNameForRoute('/user-pages/usertable', 'User Table');
        breadcrumbService.addFriendlyNameForRoute('/user-pages/userprofile', 'User Profile');

        // breadcrumbService.addFriendlyNameForRoute('/emails', 'Emails');
        // breadcrumbService.addFriendlyNameForRoute('/emails/email-listing', 'Email Listing');
        // breadcrumbService.addFriendlyNameForRoute('/emails/email-detail', 'Email Detail');
        // breadcrumbService.addFriendlyNameForRoute('/emails/email-compose', 'Email Compose');

        // breadcrumbService.addFriendlyNameForRoute('/ecommerce', 'Ecommerce');
        // breadcrumbService.addFriendlyNameForRoute('/ecommerce/ecommerce-product', 'Ecommerce Product');
        // breadcrumbService.addFriendlyNameForRoute('/ecommerce/ecommerce-product-detail', 'Ecommerce Product Detail');

        // breadcrumbService.addFriendlyNameForRoute('/pages', 'Pages');
        // breadcrumbService.addFriendlyNameForRoute('/pages/timeline', 'Timeline');
        // breadcrumbService.addFriendlyNameForRoute('/pages/subscribes', 'Subscribes');
        // breadcrumbService.addFriendlyNameForRoute('/pages/undermaintance', 'Under Maintance');
        // breadcrumbService.addFriendlyNameForRoute('/pages/testimonials', 'Testimonials');
        // breadcrumbService.addFriendlyNameForRoute('/pages/pricing', 'Pricing');
        // breadcrumbService.addFriendlyNameForRoute('/pages/blank', 'Blank');
        // breadcrumbService.addFriendlyNameForRoute('/session', 'Session');
        // breadcrumbService.addFriendlyNameForRoute('/session/login', 'Login');
        // breadcrumbService.addFriendlyNameForRoute('/session/register', 'Register');
        // breadcrumbService.addFriendlyNameForRoute('/session/forgot-password', 'Forgot');
        // breadcrumbService.addFriendlyNameForRoute('/session/lockscreen', 'Lock Screen');
    }
    getUserInfo(){
        this.PerfilImageService.perfilImage.subscribe((val:string)=>{
            this.perfilImage=val
        })
        this.userData= this.auth.getLoginData();
        let ramdon=new Date().getTime();
        //get user image
        this.auth.getPerfilImage(this.userData.id,ramdon).subscribe(
            result=>{
                if (result==null) {
                    this.PerfilImageService.setPerfilImage(`http://138.68.19.227:8187/images/${ramdon}/users/${this.userData.id}`)
                  console.log('aqui')
                }
                else{
                  this.PerfilImageService.setPerfilImage("assets/img/user-3.jpg");
                }
            },
            error=>{
                console.log(error);
              this.PerfilImageService.setPerfilImage("assets/img/user-3.jpg");
            }
        )
    }
    logOut(){
        this.auth.logOut();
        this.router.navigate(['/loginone'])
    }
    ngOnInit() {
        this.innerWidth = window.innerWidth;
        console.log(this.innerWidth);
        this.pageTitleService.title.subscribe((val: string) => {
            this.header = val;
        });
        
        this._router = this.router.events.filter(event => event instanceof NavigationEnd).subscribe((event: NavigationEnd) => {
            this.url = event.url;
        });
        
        if (this.url != '/session/login' && this.url != '/session/register' && this.url != '/session/forgot-password' && this.url != '/session/lockscreen') {
            const elemSidebar = <HTMLElement>document.querySelector('.sidebar-container ');
           
            /** Perfect scrollbar for sidebar menu **/
            if (window.matchMedia(`(min-width: 960px)`).matches) {
                Ps.initialize(elemSidebar, { wheelSpeed: 2, suppressScrollX: true });
               
            }

            /** Perfect scrollbar for chat window **/
            const elemChatbar = <HTMLElement>document.querySelector('.chat-inner ');
            if (window.matchMedia(`(min-width: 960px)`).matches) {
                Ps.initialize(elemChatbar, { wheelSpeed: 2, suppressScrollX: true });
               
            }
        }
        
        if (this.media.isActive('xs') || this.media.isActive('sm')){
            this._mode = 'over';
            this._closeOnClickOutside = true;
            this._showBackdrop = true;
            this._opened = false;
            this.sidebarClosed = false;
        
        }
        
        this._mediaSubscription = this.media.asObservable().subscribe((change: MediaChange) => {
            let isMobile = (change.mqAlias == 'xs') || (change.mqAlias == 'sm');

            this.isMobile = isMobile;
            this._mode = (isMobile) ? 'over' : 'push';
            this._closeOnClickOutside = (isMobile) ? true : false;
            this._showBackdrop = (isMobile) ? true : false;
            this._opened = !isMobile;
            this.sidebarClosed = false;
        });

        this._routerEventsSubscription = this.router.events.subscribe((event) => {
          if (event instanceof NavigationEnd && this.isMobile) {
            this.sidenav.close();
          }
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
        this._mediaSubscription.unsubscribe();
    }

	isFullscreen: boolean = false;
    
    menuMouseOver(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
            this._mode = 'over';
        }
    }

    menuMouseOut(): void {
        if (window.matchMedia(`(min-width: 960px)`).matches && this.collapseSidebar) {
            this._mode = 'push';
        }
    }

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
     sidebarClosedFunction(){
        this.sidebarClosed = !this.sidebarClosed;
    }

    changeThemeColor(color){
        this.themeSkinColor = color; 
    }

    addMenuItem(): void {
        this.menuItems.add({
            state: 'pages',
            name: 'CHANKYA MENU',
            type: 'sub',
            icon: 'icon-plus icons',
            children: [
                {state: 'blank', name: 'SUB MENU1'}
            ]
        });
    }
    
    onActivate(e, scrollContainer) {
    scrollContainer.scrollTop = 0;
  }

}


