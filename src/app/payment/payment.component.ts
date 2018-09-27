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
  amount:number = 500;
  showPayCard:boolean = true;
  public showLoading = false;
  user_id:any;
  leagues:any = [];
   ownerInfo = {
    owner: {
      name: '',
      address: {
        line1: '',
        city: '',
        postal_code: '',
        country: 'US',
      },
      email: ''
    },
  };
  plan:any = '';
  customerID:any;
  planID:any;
  selectedRole:any;
  subID:any;
  message:any;

  countries = [ 
    {"name": "Afghanistan", "code": "AF"}, 
    {"name": "land Islands", "code": "AX"}, 
    {"name": "Albania", "code": "AL"}, 
    {"name": "Algeria", "code": "DZ"}, 
    {"name": "American Samoa", "code": "AS"}, 
    {"name": "AndorrA", "code": "AD"}, 
    {"name": "Angola", "code": "AO"}, 
    {"name": "Anguilla", "code": "AI"}, 
    {"name": "Antarctica", "code": "AQ"}, 
    {"name": "Antigua and Barbuda", "code": "AG"}, 
    {"name": "Argentina", "code": "AR"}, 
    {"name": "Armenia", "code": "AM"}, 
    {"name": "Aruba", "code": "AW"}, 
    {"name": "Australia", "code": "AU"}, 
    {"name": "Austria", "code": "AT"}, 
    {"name": "Azerbaijan", "code": "AZ"}, 
    {"name": "Bahamas", "code": "BS"}, 
    {"name": "Bahrain", "code": "BH"}, 
    {"name": "Bangladesh", "code": "BD"}, 
    {"name": "Barbados", "code": "BB"}, 
    {"name": "Belarus", "code": "BY"}, 
    {"name": "Belgium", "code": "BE"}, 
    {"name": "Belize", "code": "BZ"}, 
    {"name": "Benin", "code": "BJ"}, 
    {"name": "Bermuda", "code": "BM"}, 
    {"name": "Bhutan", "code": "BT"}, 
    {"name": "Bolivia", "code": "BO"}, 
    {"name": "Bosnia and Herzegovina", "code": "BA"}, 
    {"name": "Botswana", "code": "BW"}, 
    {"name": "Bouvet Island", "code": "BV"}, 
    {"name": "Brazil", "code": "BR"}, 
    {"name": "British Indian Ocean Territory", "code": "IO"}, 
    {"name": "Brunei Darussalam", "code": "BN"}, 
    {"name": "Bulgaria", "code": "BG"}, 
    {"name": "Burkina Faso", "code": "BF"}, 
    {"name": "Burundi", "code": "BI"}, 
    {"name": "Cambodia", "code": "KH"}, 
    {"name": "Cameroon", "code": "CM"}, 
    {"name": "Canada", "code": "CA"}, 
    {"name": "Cape Verde", "code": "CV"}, 
    {"name": "Cayman Islands", "code": "KY"}, 
    {"name": "Central African Republic", "code": "CF"}, 
    {"name": "Chad", "code": "TD"}, 
    {"name": "Chile", "code": "CL"}, 
    {"name": "China", "code": "CN"}, 
    {"name": "Christmas Island", "code": "CX"}, 
    {"name": "Cocos (Keeling) Islands", "code": "CC"}, 
    {"name": "Colombia", "code": "CO"}, 
    {"name": "Comoros", "code": "KM"}, 
    {"name": "Congo", "code": "CG"}, 
    {"name": "Congo, The Democratic Republic of the", "code": "CD"}, 
    {"name": "Cook Islands", "code": "CK"}, 
    {"name": "Costa Rica", "code": "CR"}, 
    {"name": "Croatia", "code": "HR"}, 
    {"name": "Cuba", "code": "CU"}, 
    {"name": "Cyprus", "code": "CY"}, 
    {"name": "Czech Republic", "code": "CZ"}, 
    {"name": "Denmark", "code": "DK"}, 
    {"name": "Djibouti", "code": "DJ"}, 
    {"name": "Dominica", "code": "DM"}, 
    {"name": "Dominican Republic", "code": "DO"}, 
    {"name": "Ecuador", "code": "EC"}, 
    {"name": "Egypt", "code": "EG"}, 
    {"name": "El Salvador", "code": "SV"}, 
    {"name": "Equatorial Guinea", "code": "GQ"}, 
    {"name": "Eritrea", "code": "ER"}, 
    {"name": "Estonia", "code": "EE"}, 
    {"name": "Ethiopia", "code": "ET"}, 
    {"name": "Falkland Islands (Malvinas)", "code": "FK"}, 
    {"name": "Faroe Islands", "code": "FO"}, 
    {"name": "Fiji", "code": "FJ"}, 
    {"name": "Finland", "code": "FI"}, 
    {"name": "France", "code": "FR"}, 
    {"name": "French Guiana", "code": "GF"}, 
    {"name": "French Polynesia", "code": "PF"}, 
    {"name": "French Southern Territories", "code": "TF"}, 
    {"name": "Gabon", "code": "GA"}, 
    {"name": "Gambia", "code": "GM"}, 
    {"name": "Georgia", "code": "GE"}, 
    {"name": "Germany", "code": "DE"}, 
    {"name": "Ghana", "code": "GH"}, 
    {"name": "Gibraltar", "code": "GI"}, 
    {"name": "Greece", "code": "GR"}, 
    {"name": "Greenland", "code": "GL"}, 
    {"name": "Grenada", "code": "GD"}, 
    {"name": "Guadeloupe", "code": "GP"}, 
    {"name": "Guam", "code": "GU"}, 
    {"name": "Guatemala", "code": "GT"}, 
    {"name": "Guernsey", "code": "GG"}, 
    {"name": "Guinea", "code": "GN"}, 
    {"name": "Guinea-Bissau", "code": "GW"}, 
    {"name": "Guyana", "code": "GY"}, 
    {"name": "Haiti", "code": "HT"}, 
    {"name": "Heard Island and Mcdonald Islands", "code": "HM"}, 
    {"name": "Holy See (Vatican City State)", "code": "VA"}, 
    {"name": "Honduras", "code": "HN"}, 
    {"name": "Hong Kong", "code": "HK"}, 
    {"name": "Hungary", "code": "HU"}, 
    {"name": "Iceland", "code": "IS"}, 
    {"name": "India", "code": "IN"}, 
    {"name": "Indonesia", "code": "ID"}, 
    {"name": "Iran, Islamic Republic Of", "code": "IR"}, 
    {"name": "Iraq", "code": "IQ"}, 
    {"name": "Ireland", "code": "IE"}, 
    {"name": "Isle of Man", "code": "IM"}, 
    {"name": "Israel", "code": "IL"}, 
    {"name": "Italy", "code": "IT"}, 
    {"name": "Jamaica", "code": "JM"}, 
    {"name": "Japan", "code": "JP"}, 
    {"name": "Jersey", "code": "JE"}, 
    {"name": "Jordan", "code": "JO"}, 
    {"name": "Kazakhstan", "code": "KZ"}, 
    {"name": "Kenya", "code": "KE"}, 
    {"name": "Kiribati", "code": "KI"}, 
    {"name": "Korea, Democratic People Republic of", "code": "KP"}, 
    {"name": "Korea, Republic of", "code": "KR"}, 
    {"name": "Kuwait", "code": "KW"}, 
    {"name": "Kyrgyzstan", "code": "KG"}, 
    {"name": "Lao People Democratic Republic", "code": "LA"}, 
    {"name": "Latvia", "code": "LV"}, 
    {"name": "Lebanon", "code": "LB"}, 
    {"name": "Lesotho", "code": "LS"}, 
    {"name": "Liberia", "code": "LR"}, 
    {"name": "Libyan Arab Jamahiriya", "code": "LY"}, 
    {"name": "Liechtenstein", "code": "LI"}, 
    {"name": "Lithuania", "code": "LT"}, 
    {"name": "Luxembourg", "code": "LU"}, 
    {"name": "Macao", "code": "MO"}, 
    {"name": "Macedonia, The Former Yugoslav Republic of", "code": "MK"}, 
    {"name": "Madagascar", "code": "MG"}, 
    {"name": "Malawi", "code": "MW"}, 
    {"name": "Malaysia", "code": "MY"}, 
    {"name": "Maldives", "code": "MV"}, 
    {"name": "Mali", "code": "ML"}, 
    {"name": "Malta", "code": "MT"}, 
    {"name": "Marshall Islands", "code": "MH"}, 
    {"name": "Martinique", "code": "MQ"}, 
    {"name": "Mauritania", "code": "MR"}, 
    {"name": "Mauritius", "code": "MU"}, 
    {"name": "Mayotte", "code": "YT"}, 
    {"name": "Mexico", "code": "MX"}, 
    {"name": "Micronesia, Federated States of", "code": "FM"}, 
    {"name": "Moldova, Republic of", "code": "MD"}, 
    {"name": "Monaco", "code": "MC"}, 
    {"name": "Mongolia", "code": "MN"}, 
    {"name": "Montenegro", "code": "ME"},
    {"name": "Montserrat", "code": "MS"},
    {"name": "Morocco", "code": "MA"}, 
    {"name": "Mozambique", "code": "MZ"}, 
    {"name": "Myanmar", "code": "MM"}, 
    {"name": "Namibia", "code": "NA"}, 
    {"name": "Nauru", "code": "NR"}, 
    {"name": "Nepal", "code": "NP"}, 
    {"name": "Netherlands", "code": "NL"}, 
    {"name": "Netherlands Antilles", "code": "AN"}, 
    {"name": "New Caledonia", "code": "NC"}, 
    {"name": "New Zealand", "code": "NZ"}, 
    {"name": "Nicaragua", "code": "NI"}, 
    {"name": "Niger", "code": "NE"}, 
    {"name": "Nigeria", "code": "NG"}, 
    {"name": "Niue", "code": "NU"}, 
    {"name": "Norfolk Island", "code": "NF"}, 
    {"name": "Northern Mariana Islands", "code": "MP"}, 
    {"name": "Norway", "code": "NO"}, 
    {"name": "Oman", "code": "OM"}, 
    {"name": "Pakistan", "code": "PK"}, 
    {"name": "Palau", "code": "PW"}, 
    {"name": "Palestinian Territory, Occupied", "code": "PS"}, 
    {"name": "Panama", "code": "PA"}, 
    {"name": "Papua New Guinea", "code": "PG"}, 
    {"name": "Paraguay", "code": "PY"}, 
    {"name": "Peru", "code": "PE"}, 
    {"name": "Philippines", "code": "PH"}, 
    {"name": "Pitcairn", "code": "PN"}, 
    {"name": "Poland", "code": "PL"}, 
    {"name": "Portugal", "code": "PT"}, 
    {"name": "Puerto Rico", "code": "PR"}, 
    {"name": "Qatar", "code": "QA"}, 
    {"name": "Reunion", "code": "RE"}, 
    {"name": "Romania", "code": "RO"}, 
    {"name": "Russian Federation", "code": "RU"}, 
    {"name": "RWANDA", "code": "RW"}, 
    {"name": "Saint Helena", "code": "SH"}, 
    {"name": "Saint Kitts and Nevis", "code": "KN"}, 
    {"name": "Saint Lucia", "code": "LC"}, 
    {"name": "Saint Pierre and Miquelon", "code": "PM"}, 
    {"name": "Saint Vincent and the Grenadines", "code": "VC"}, 
    {"name": "Samoa", "code": "WS"}, 
    {"name": "San Marino", "code": "SM"}, 
    {"name": "Sao Tome and Principe", "code": "ST"}, 
    {"name": "Saudi Arabia", "code": "SA"}, 
    {"name": "Senegal", "code": "SN"}, 
    {"name": "Serbia", "code": "RS"}, 
    {"name": "Seychelles", "code": "SC"}, 
    {"name": "Sierra Leone", "code": "SL"}, 
    {"name": "Singapore", "code": "SG"}, 
    {"name": "Slovakia", "code": "SK"}, 
    {"name": "Slovenia", "code": "SI"}, 
    {"name": "Solomon Islands", "code": "SB"}, 
    {"name": "Somalia", "code": "SO"}, 
    {"name": "South Africa", "code": "ZA"}, 
    {"name": "South Georgia and the South Sandwich Islands", "code": "GS"}, 
    {"name": "Spain", "code": "ES"}, 
    {"name": "Sri Lanka", "code": "LK"}, 
    {"name": "Sudan", "code": "SD"}, 
    {"name": "Suriname", "code": "SR"}, 
    {"name": "Svalbard and Jan Mayen", "code": "SJ"}, 
    {"name": "Swaziland", "code": "SZ"}, 
    {"name": "Sweden", "code": "SE"}, 
    {"name": "Switzerland", "code": "CH"}, 
    {"name": "Syrian Arab Republic", "code": "SY"}, 
    {"name": "Taiwan, Province of China", "code": "TW"}, 
    {"name": "Tajikistan", "code": "TJ"}, 
    {"name": "Tanzania, United Republic of", "code": "TZ"}, 
    {"name": "Thailand", "code": "TH"}, 
    {"name": "Timor-Leste", "code": "TL"}, 
    {"name": "Togo", "code": "TG"}, 
    {"name": "Tokelau", "code": "TK"}, 
    {"name": "Tonga", "code": "TO"}, 
    {"name": "Trinidad and Tobago", "code": "TT"}, 
    {"name": "Tunisia", "code": "TN"}, 
    {"name": "Turkey", "code": "TR"}, 
    {"name": "Turkmenistan", "code": "TM"}, 
    {"name": "Turks and Caicos Islands", "code": "TC"}, 
    {"name": "Tuvalu", "code": "TV"}, 
    {"name": "Uganda", "code": "UG"}, 
    {"name": "Ukraine", "code": "UA"}, 
    {"name": "United Arab Emirates", "code": "AE"}, 
    {"name": "United Kingdom", "code": "GB"}, 
    {"name": "United States", "code": "US"}, 
    {"name": "United States Minor Outlying Islands", "code": "UM"}, 
    {"name": "Uruguay", "code": "UY"}, 
    {"name": "Uzbekistan", "code": "UZ"}, 
    {"name": "Vanuatu", "code": "VU"}, 
    {"name": "Venezuela", "code": "VE"}, 
    {"name": "Viet Nam", "code": "VN"}, 
    {"name": "Virgin Islands, British", "code": "VG"}, 
    {"name": "Virgin Islands, U.S.", "code": "VI"}, 
    {"name": "Wallis and Futuna", "code": "WF"}, 
    {"name": "Western Sahara", "code": "EH"}, 
    {"name": "Yemen", "code": "YE"}, 
    {"name": "Zambia", "code": "ZM"}, 
    {"name": "Zimbabwe", "code": "ZW"} 
    ];


  constructor(private cd: ChangeDetectorRef, handler: HttpBackend, public toastr: ToastrService, public auth:AuthenticationService, 
    private pageTitleService: PageTitleService, public route: Router, public httpInt: HttpClient) { 
    this.http = new HttpClient(handler);
  }

  ngOnInit() {
    let user = this.auth.getLoginData();
    this.email = user.email;
    this.ownerInfo.owner.email = user.email;
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
        res.forEach(element => {
          if(element.league != ""){
            let l = {
                "name" : element.league.name,
                "id"   : element.id
              };
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
    if(this.ownerInfo.owner.name != '' && this.ownerInfo.owner.address.line1 != '' && this.ownerInfo.owner.address.city != '' && this.ownerInfo.owner.address.postal_code != '' && this.ownerInfo.owner.address.country != ''){
      if(this.amount == 500){
        this.plan = 'plan_DfLhLvTIvkbpva';
      }else if(this.amount == 3000){
        this.plan = 'plan_DfLioVj9iqE7lq';
      }
      this.showLoading = true;
      const { source, error } = await stripe.createSource(this.card, this.ownerInfo);
  
      if (error) {
        this.showLoading = false;
        this.toastr.error(error, 'Something is wrong', { positionClass: "toast-top-right" });
  
      } else {
        this.createCustomer(source.id);
      }
    }else{
      this.toastr.error('You must complete all input fields', 'All fields are required', { positionClass: "toast-top-right" });
    }
   
  }

  createCustomer(source){
    const httpOptions:any = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer sk_test_p2AJi6UrvZG4QGBXp2Zle391'
      })
    };
  
    let body = `email=${this.email}&source=${source}`;
    this.http.post('https://api.stripe.com/v1/customers', body, httpOptions).subscribe(result => {
      this.customerID = result['id'];
      this.subscribeToPlan(result['id']);
    
    });
  }

  subscribeToPlan(customer){
    const httpOptions:any = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer sk_test_p2AJi6UrvZG4QGBXp2Zle391'
      })
    };
  
    let body = `customer=${customer}&items[0][plan]=${this.plan}`;
    this.http.post('https://api.stripe.com/v1/subscriptions', body, httpOptions).subscribe(result => {
      this.planID = result['id'];
      if(result['status'] === 'active'){
        this.saveIDs();
        this.toastr.success('Well Done', 'Thank you for your payment!', { positionClass: "toast-top-right" });
        this.teams= [];
        this.showLoading = false;
        this.route.navigate(['/dashboard-v1']);

      }
    
    });
  }


  saveIDs(){
    this.httpInt.put("/roles/" + this.selectedRole, {customerID: this.customerID, planID: this.planID}).subscribe(result => {
      console.log("IDS", result);
    })
  }

  createCharge(token){
    const httpOptions:any = {
      headers: new HttpHeaders({
        'Content-Type':  'application/x-www-form-urlencoded',
        'Authorization': 'Bearer sk_test_p2AJi6UrvZG4QGBXp2Zle391'
      })
    };
  
    let body = `amount=${this.amount}&currency=usd&source=${token}&description=Locker Room Payment from ${this.email}`;

    this.http.post('https://api.stripe.com/v1/charges', body, httpOptions).subscribe(result => {
      if(result['status'] === 'succeeded'){
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
    this.message = "";
    this.selectedRole = newValue;
    this.getSubscription();
}
setAmount(amount){
  this.amount = amount;
}

getSubscription(){
  this.httpInt.get("/subscriptions/" + this.user_id + `?where={"id":"${this.selectedRole}"}`).subscribe(result => {
    if(result != "" ){
      this.subID = result[0]['planID'];
      this.checkPlanStatus();
    }else{
      this.showPayCard = false;

    }
  });
}

checkPlanStatus(){
  const httpOptions:any = {
    headers: new HttpHeaders({
      'Content-Type':  'application/x-www-form-urlencoded',
      'Authorization': 'Bearer sk_test_p2AJi6UrvZG4QGBXp2Zle391'
    })
  };

  this.http.get('https://api.stripe.com/v1/subscriptions/' +  this.subID, httpOptions).subscribe(result => {
    if(result['status'] === 'active'){
      this.message = "Hey, You have an active subscription. You will receive an invoice from us for this team payment the Billing date.";
    }else{
    this.showPayCard = false;

    }
  })

}
}
