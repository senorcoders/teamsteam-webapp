import { Component, OnInit, ChangeDetectorRef, AfterViewInit, OnDestroy, ViewChild, ElementRef} from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient, HttpBackend } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../services/authentication.service';
import { PageTitleService } from '../core/page-title/page-title.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements  AfterViewInit, OnDestroy {
  @ViewChild('cardInfo') cardInfo: ElementRef;

  card: any;
  cardHandler = this.onChange.bind(this);
  error: string;
  private http: HttpClient;
  email:any;
  teams:any = [];
  amount:number = 0;
  showPayCard:boolean = true;
  public showLoading = false;
  user_id:any;
  leagues:any = [];


  constructor(private cd: ChangeDetectorRef, handler: HttpBackend, public toastr: ToastrService, public auth:AuthenticationService, 
    private pageTitleService: PageTitleService, public route: Router, public httpInt: HttpClient) { 
    this.http = new HttpClient(handler);
  }

  ngOnInit() {
    let user = this.auth.getLoginData();
    console.log(user);
    this.email = user.email;
    this.user_id = user.id;
    this.getLeagues();
    user.roles.forEach(element => {
      if(element.name =="Manager"){
        this.teams.push(element);
      }
    });
    this.pageTitleService.setTitle("Payment");

  }

  getLeagues(){
    this.httpInt.get(`/roles?where={"name":"OwnerLeague","user":"${this.user_id}"}`).subscribe(
      result => {
        var res:any = result;
        console.log("Leagues", result);
        res.forEach(element => {
          if(element.league != ""){
            let l = element.league.name;
            this.leagues.push(l);
          }
        });
      }
    )
  }
  ngAfterViewInit() {
    this.card = elements.create('card');
    this.card.mount(this.cardInfo.nativeElement);

    this.card.addEventListener('change', this.cardHandler);
  }

  ngOnDestroy() {
    this.card.removeEventListener('change', this.cardHandler);
    this.card.destroy();
  }

  onChange({ error }) {
    if (error) {
      this.error = error.message;
      
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  async onSubmit(form: NgForm) {
    this.showLoading = true;
    const { token, error } = await stripe.createToken(this.card);

    if (error) {
      console.log('Something is wrong:', error);
      this.showLoading = false;
      this.toastr.error(error, 'Something is wrong', { positionClass: "toast-top-right" });

    } else {
      console.log('Success!', token);
      this.createCharge(token.id);
    }
  }


  createCharge(token){
    console.log(token);
    const httpOptions:any = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer sk_test_p2AJi6UrvZG4QGBXp2Zle391'
      })
    };
  
    let body = `amount=${this.amount}&currency=usd&source=${token}&description=Locker Room Payment from ${this.email}`;

    this.http.post('https://api.stripe.com/v1/charges', body, httpOptions).subscribe(result => {
      console.log(result);
      if(result['status'] === 'succeeded'){
        console.log("All Done");
        this.toastr.success('Well Done', 'Thank you for your payment!', { positionClass: "toast-top-right" });
        this.teams= [];
        this.showLoading = false;
        this.route.navigate(['/dashboard-v1']);

      }
    });
  }

  getDollars(amount){
    return amount / 100;
  }

  onSelectChange(newValue) {
    console.log(newValue);
    this.showPayCard = false;
    this.amount = newValue;
    // ... do other stuff here ...
}
}
