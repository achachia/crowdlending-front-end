import { Component, OnInit, ElementRef, ViewChild, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { CookieService } from 'ngx-cookie-service';
import { DatePipe } from '@angular/common';
import { NgxUiLoaderService } from 'ngx-ui-loader';



declare var window: any;



@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {

  @ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;



  public ObjetLogin = {
                  emailLogin : '',
                  passwordLogin : '',
                  typeCompteLogin : ''
   };

   public ObjetInscription = {
                       id : '',
                       nomInscription : '',
                       prenomInscription : '',
                       emailInscription : '',
                       passwordInscription : '',
                       sex : '',
                       photoUser : '',
                       dateNaissance : '',
                       typeCompteInscription : '',
                       date_created: '',
                       date_update: ''
    };

    public infosUser = {
                        id : '',
                        nom: '',
                        prenom : '',
                        login : '',
                        password : '',
                        sex : '',
                        photoUser : '',
                        dateNaissance : '',
                        typeCompte : '',
                        date_created: '',
                        date_update: ''
   };

  public isErreurLogin = false;

  public isErreurInscription = false;

  public isvalidLogin = false;

  public isvalidInscription = false;

  private isvalidCaptcha = false ;

  public isErreurCaptcha = false;

  events: string[] = [];

  public cities = [];

  constructor(private route: ActivatedRoute, private router: Router, private apiService: apiHttpJsonService,
              private cookie: CookieService, private datePipe: DatePipe, private ngxService: NgxUiLoaderService) {


   /* this.route.params.subscribe(params => {

      alert(params['action']);

    }) */

  }

  ngOnInit(): void {

    

    this.apiService.getListQuestionReponses().subscribe((data: any) => {

         // console.log(data);

        

         this.cities = data;

        // this.cities.sort((c1, c2) => c1.date_created - c2.date_created).map(city => console.log(city.id + ':'  + ':' + city.date_created));

         console.log(this.cities.sort((c1, c2) => c1.date_created - c2.date_created));


         }, (error: any) => {

     });

    /********************************************************** */

    // Date.now()

    

    

    

    /********************************************************* */

    this.addRecaptchaScript();

    const date = new Date();

    this.ObjetInscription.date_created = date.toLocaleString('fr-FR', {
                                               weekday: 'long',
                                               year : 'numeric',
                                               month : 'long',
                                               day : 'numeric',
                                               hour : 'numeric',
                                               minute : 'numeric',
                                               second : 'numeric',

                     });



   }



   addEventDateNaissance(event) {

    this.ObjetInscription.dateNaissance = this.datePipe.transform(event.value, 'dd-MM-yyyy');

    console.log(this.datePipe.transform(event.value, 'dd-MM-yyyy'));


  }

  addRecaptchaScript() {

    window.grecaptchaCallback = () => {
      this.renderReCaptcha();
    };

    (function(d, s, id, obj){
      let js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) { obj.renderReCaptcha(); return; }
      js = d.createElement(s); js.id = id;
      js.src = 'https://www.google.com/recaptcha/api.js?onload=grecaptchaCallback&amp;render=explicit';
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'recaptcha-jssdk', this));

  }

  renderReCaptcha() {
    window.grecaptcha.render(this.recaptchaElement.nativeElement, {
      sitekey : '6Lf4I6gZAAAAAMp1E9YI1FJghdQ20CNRtAV9d55y',
      callback: (response) => {
          console.log('response', response);

          this.isvalidCaptcha = true;

          this.isErreurCaptcha = false;
      }
    });
  }

  public onFormSubmitLogin() {

    this.ngxService.start();


    this.apiService.identificationUser(this.ObjetLogin).subscribe((data: any) => {

        console.log('IdentificationComponent/identification', data);

        if (data.length === 0){

               this.isErreurLogin = true;

        }else{

          if (data[0]  && data[0].length > 0){

            console.log('toto1');

            this.infosUser.id =  data.id;

            this.infosUser.nom =  data.nom;

            this.infosUser.prenom =  data.prenom;

            this.infosUser.login =  data.login;

            this.infosUser.password =  data.password;

            this.infosUser.photoUser =  data.photoUser;

            this.infosUser.sex =  data.sex;

            this.infosUser.dateNaissance =  data.dateNaissance;

            this.infosUser.date_created =  data.date_created;

            this.infosUser.date_update =  data.date_update;

          }else{

            console.log('toto2');

            this.infosUser.id =  data[0].id;

            this.infosUser.nom =  data[0].nom;

            this.infosUser.prenom =  data[0].prenom;

            this.infosUser.login =  data[0].login;

            this.infosUser.password =  data[0].password;

            this.infosUser.photoUser =  data[0].photoUser;

            this.infosUser.sex =  data[0].sex;

            this.infosUser.dateNaissance =  data[0].dateNaissance;

            this.infosUser.date_created =  data[0].date_created;

            this.infosUser.date_update =  data[0].date_update;


          }

          this.infosUser.typeCompte =  this.ObjetLogin.typeCompteLogin;

          this.cookie.set('infosUser', JSON.stringify(this.infosUser));

          this.router.navigate(['/profilUser']);


      }

        this.ngxService.stop();


    }, (error: any) => {

    });

  }



  public onFormSubmitInscription(){


    if (this.isvalidCaptcha){

      this.ngxService.start();

      this.apiService.inscriptionUser(this.ObjetInscription).subscribe((data: any) => {

        console.log(data);

        if (data.length === 0){

               this.isErreurInscription = true;

        }else{

          if (data[0]  && data[0].length > 0){

            console.log('toto1');

            this.infosUser.id =  data[0].id;

            this.infosUser.nom =  data[0].nom;

            this.infosUser.prenom =  data[0].prenom;

            this.infosUser.login =  data[0].login;

            this.infosUser.password =  data[0].password;

            this.infosUser.sex =  data[0].sex;

            this.infosUser.dateNaissance =  data[0].dateNaissance;

            this.infosUser.date_created =  data[0].date_created;

            this.infosUser.date_update =  data[0].date_update;


          }else{

            console.log('toto2');

            this.infosUser.id =  data.id;

            this.infosUser.nom =  data.nom;

            this.infosUser.prenom =  data.prenom;

            this.infosUser.login =  data.login;

            this.infosUser.password =  data.password;

            this.infosUser.sex =  data.sex;

            this.infosUser.dateNaissance =  data.dateNaissance;

            this.infosUser.date_created =  data.date_created;

            this.infosUser.date_update =  data.date_update;
          }

          this.infosUser.typeCompte =  this.ObjetInscription.typeCompteInscription;

          this.cookie.set('infosUser', JSON.stringify(this.infosUser));

          this.router.navigate(['/profilUser']);


        }




    }, (error: any) => {

    });

      this.ngxService.stop();

  }else{

      this.isErreurCaptcha = true;
  }





  }



}
