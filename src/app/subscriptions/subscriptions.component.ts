import { Component, OnInit } from '@angular/core';
import { PageTitleService } from '../core/page-title/page-title.service';
import { HttpClient, HttpBackend, HttpHeaders } from '@angular/common/http';
import { AuthenticationService } from '../services/authentication.service';
import { Interceptor } from '../interceptor/interceptor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss']
})
export class SubscriptionsComponent implements OnInit {

  user_id:any;
  plans:any = [];
  showLoading:boolean = true;
  endpoint:any;
  private http: HttpClient;


  constructor(private pageTitleService: PageTitleService, public httpInt: HttpClient, public auth:AuthenticationService, handler: HttpBackend, public toastr: ToastrService) {
    this.http = new HttpClient(handler);

   }

  ngOnInit() {
    this.endpoint = Interceptor.url; 
    this.pageTitleService.setTitle("Subscriptions");
    let user = this.auth.getLoginData();
    this.user_id = user.id;
    this.getPlans();

  }

  getPlans(){
    this.httpInt.get(`/roles?where={"planID":{"not":null},"customerID":{"not":null},"user":"${this.user_id}"}`).subscribe(result => {
      console.log("Plans", result);
      this.plans = result;
      this.showLoading = false;
    })
  }

  errorHandler(event) {
    event.target.src = "assets/img/logo-lockerroom.png";
  }

  cancelPayment(sub, rolID){
    this.showLoading = true;
    const httpOptions:any = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer sk_test_p2AJi6UrvZG4QGBXp2Zle391'
      })
    };

    let body = `cancel_at_period_end=true`;

    this.http.post('https://api.stripe.com/v1/subscriptions/' +  sub, body, httpOptions).subscribe(result => {
      console.log("Cancelling", result);
      if(result['cancel_at_period_end'] == true){
        this.removeIDs(rolID);
        this.showLoading = false;
      }
    })
  }

  removeIDs(rolID){
    this.httpInt.put("/roles/" + rolID, {customerID: null, planID: null}).subscribe(result => {
      console.log("IDS", result);
      this.toastr.success('Success', 'This team has been scheduled to cancel subscription at the end of billing period!', {positionClass:"toast-top-center"});

    })
  }

}
