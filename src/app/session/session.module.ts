import {NgModule} from '@angular/core';
import {RouterModule} from '@angular/router';
import {CommonModule} from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import {ChartsModule} from 'ng2-charts/ng2-charts';
import {EasyPieChartModule} from 'ng2modules-easypiechart';
import {Ng2GoogleChartsModule} from 'ng2-google-charts';
import {NgxChartsModule} from '@swimlane/ngx-charts';

import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {ComingSoonComponent} from './coming-soon/coming-soon.component';
import {LockScreenComponent} from './lockscreen/lockscreen.component';
import {SubscribesComponent} from './subscribes/subscribes.component';
import {UnderMaintanceComponent} from './under-maintance/under-maintance.component';
import {NotFoundComponent} from './not-found/not-found.component';
import {SessionRoutes} from './session.routing';
import {AuthenticationService} from '../services/authentication.service';
import {HttpClientModule} from '@angular/common/http';
import {ToastrModule} from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    Ng2GoogleChartsModule,
    NgxChartsModule,
    ChartsModule,
    EasyPieChartModule,
    RouterModule.forChild(SessionRoutes),
    ToastrModule.forRoot(),
  ],
  declarations: [
    ForgotPasswordComponent,
    ComingSoonComponent,
    LockScreenComponent,
    SubscribesComponent,
    UnderMaintanceComponent,
    NotFoundComponent,
  ],
  providers: [
    AuthenticationService
  ]
})

export class SessionDemoModule {
}
