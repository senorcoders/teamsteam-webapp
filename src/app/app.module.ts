import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpModule, Http } from '@angular/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MaterialModule } from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
// import { AgmCoreModule } from '@agm/core';
import { TourNgBootstrapModule } from 'ngx-tour-ng-bootstrap';

import { PerfectScrollbarModule, PerfectScrollbarConfigInterface } from "ngx-perfect-scrollbar";
import { TranslateModule, TranslateLoader, TranslateStaticLoader } from 'ng2-translate/ng2-translate';
import { SidebarModule } from 'ng-sidebar';
import { Ng2BreadcrumbModule, BreadcrumbService } from 'ng2-breadcrumb/ng2-breadcrumb';
import 'hammerjs';

import { ChankyaAppComponent } from './app.component';
import { AppRoutes } from "./app-routing.module";
import { MainComponent } from './main/main.component';
import { AuthComponent } from './auth/auth.component';
import { HorizontalLayoutComponent } from './horizontal-layout/horizontal-layout.component';
import { MenuToggleModule } from './core/menu/menu-toggle.module';
import { MenuItems } from './core/menu/menu-items/menu-items';
import { PageTitleService } from './core/page-title/page-title.service';

//my import
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication.service';
import { TeamService } from './services/team.service';
import { UserService } from './services/user.service';
import { ImageUploadService } from './services/image-upload.service';
import { LoginoneComponent } from './session/loginone/loginone.component';
import { RegisterComponent } from './session/register/register.component';
import { ToastrModule } from 'ngx-toastr';
import { MyGuardService } from './services/my-guard.service';
import { PerfilImageService } from './core/perfil-image/perfil-image.service';
import { PlayerRoutesService } from './services/player-routes.service';
import { TeamRoutesService } from './services/team-routes.service';
import { Interceptor } from './interceptor/interceptor';
import { AddTeamModal } from './league/add-team-modal/add-team-modal';
import { AddOwnerModal } from './league/add-owner-modal/add-owner-modal';
import { PaymentComponent } from './payment/payment.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';


export function createTranslateLoader(http: Http) {
	return new TranslateStaticLoader(http, 'assets/i18n', '.json');
}

const perfectScrollbarConfig: PerfectScrollbarConfigInterface = {
	suppressScrollX: true
};

@NgModule({
	imports: [
		BrowserModule,
		BrowserAnimationsModule,
		FormsModule,
		ReactiveFormsModule,
		MaterialModule,
		SidebarModule.forRoot(),
		RouterModule.forRoot(AppRoutes),
		TourNgBootstrapModule.forRoot(),
		FlexLayoutModule,
		NgbModalModule.forRoot(),
		Ng2BreadcrumbModule.forRoot(),
		// AgmCoreModule.forRoot({ apiKey: 'AIzaSyAFLgCYDZUvB1CeR3IQDjoIfK-yVkSBm7Q' }),
		PerfectScrollbarModule.forRoot(perfectScrollbarConfig),
		MenuToggleModule,
		HttpClientModule,
		HttpModule,
		ToastrModule.forRoot(),
		TranslateModule.forRoot({
			provide: TranslateLoader,
			useFactory: (createTranslateLoader),
			deps: [Http]
		}),
	],
	declarations: [
		ChankyaAppComponent,
		MainComponent,
		AuthComponent,
		HorizontalLayoutComponent,
		LoginoneComponent,
		RegisterComponent,
		AddTeamModal,
		AddOwnerModal,
		PaymentComponent,
		SubscriptionsComponent
	],
	entryComponents: [
		AddTeamModal,
		AddOwnerModal
	],
	bootstrap: [ChankyaAppComponent],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: Interceptor,
			multi: true,
		},
		MenuItems,
		BreadcrumbService,
		PageTitleService,
		AuthenticationService,
		TeamService,
		UserService,
		ImageUploadService,
		MyGuardService,
		PerfilImageService,
		PlayerRoutesService,
		TeamRoutesService
	]
})
export class ChankyaAppModule { }
