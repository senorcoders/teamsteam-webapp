import { Component, OnInit, OnDestroy, ViewChild, HostListener, ViewEncapsulation, AnimationTransitionEvent } from '@angular/core';
import { MenuItems } from '../core/menu/menu-items/menu-items';
import { BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import { PageTitleService } from '../core/page-title/page-title.service';
import { TranslateService } from 'ng2-translate/ng2-translate';
import { Router, NavigationEnd } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import * as Ps from 'perfect-scrollbar';
import { TourService } from 'ngx-tour-ng-bootstrap';
declare var $: any;
//my imports
import { AuthenticationService } from '../services/authentication.service';
const screenfull = require('screenfull');
import { PerfilImageService } from '../core/perfil-image/perfil-image.service';

@Component({
    selector: 'chankya-layout',
    templateUrl: './main-material.html',
    styleUrls: ['./main-material.scss'],
    encapsulation: ViewEncapsulation.None
})
export class MainComponent implements OnInit, OnDestroy {
    //my variables
    userData: any;
    perfilImage: string;
    isManager: boolean = false;

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

    constructor(public tourService: TourService, public menuItems: MenuItems, private breadcrumbService: BreadcrumbService, private pageTitleService: PageTitleService, public translate: TranslateService, private router: Router, private media: ObservableMedia, private auth: AuthenticationService, private PerfilImageService: PerfilImageService) {
        //get user data
        this.getUserInfo();
        for (let rol of this.userData.roles) {
            if (rol.name === "Manager") {
                this.isManager = true;
                break;
            }
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
        breadcrumbService.addFriendlyNameForRoute('/dashboard-v1', 'Dashboard V1');
        breadcrumbService.addFriendlyNameForRoute('/dashboard-v2', 'Dashboard V2');
        breadcrumbService.addFriendlyNameForRoute('/teams/list', 'Team List');
        breadcrumbService.addFriendlyNameForRoute('/components', 'Components');
        breadcrumbService.addFriendlyNameForRoute('/components/list', 'List');
        breadcrumbService.addFriendlyNameForRoute('/components/grids', 'Grids');
        breadcrumbService.addFriendlyNameForRoute('', 'User Pages');
        breadcrumbService.addFriendlyNameForRoute('/userlist', 'User List');
        breadcrumbService.addFriendlyNameForRoute('/usertable', 'User Table');
        breadcrumbService.addFriendlyNameForRoute('/userprofile', 'User Profile');
    }
    getUserInfo() {
        this.PerfilImageService.perfilImage.subscribe((val: string) => {
            this.perfilImage = val
        })
        this.userData = this.auth.getLoginData();
        let ramdon = new Date().getTime();
        //get user image
        this.auth.getPerfilImage(this.userData.id, ramdon).subscribe(
            result => {
                if (result == null) {
                    this.PerfilImageService.setPerfilImage(`http://138.68.19.227:8187/images/${ramdon}/users/${this.userData.id}-thumbnail`)
                    console.log('aqui')
                }
                else {
                    this.PerfilImageService.setPerfilImage("assets/img/user.png");
                }
            },
            error => {
                console.log(error);
                this.PerfilImageService.setPerfilImage("assets/img/user.png");
            }
        )
    }
    logOut() {
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

        if (this.media.isActive('xs') || this.media.isActive('sm')) {
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
        $('.dropdown').on('show.bs.dropdown', function (e) {
            $(this).find('.dropdown-menu').first().stop(true, true).slideDown(500);
        });

        // Add slideUp animation to dropdown
        $('.dropdown').on('hide.bs.dropdown', function (e) {
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

    chatSidebarFunction() {
        this.chatSidebar = !this.chatSidebar;
    }
    sidebarClosedFunction() {
        this.sidebarClosed = !this.sidebarClosed;
    }

    changeThemeColor(color) {
        this.themeSkinColor = color;
    }
    onActivate(e, scrollContainer) {
        scrollContainer.scrollTop = 0;
    }

}


