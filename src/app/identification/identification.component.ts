import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { CookieService } from 'ngx-cookie-service';

declare const window: any;

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
                       typeCompteInscription : ''
    };

    public infosUser = {
                        id : '',
                        nom: '',
                        prenom : '',
                        login : '',
                        password : '',
                        sex : '',
                        photoUser : '',
                        typeCompte : ''
   };

  public isErreurLogin = false;

  public isErreurInscription = false;

  public isvalidLogin = false;

  public isvalidInscription = false;



  constructor(private route: ActivatedRoute, private router: Router, private apiService: apiHttpJsonService, private cookie: CookieService) {


   /* this.route.params.subscribe(params => {

      alert(params['action']);

    }) */

  }

  ngOnInit(): void {

    this.addRecaptchaScript();
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
      sitekey : '6LcLIagZAAAAAA__BTnCWvIDOQg1oh_oDqtdt8vx',
      callback: (response) => {
          console.log(response);
      }
    });
  }

  public onFormSubmitLogin() {


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

          }else{

            console.log('toto2');

            this.infosUser.id =  data[0].id;

            this.infosUser.nom =  data[0].nom;

            this.infosUser.prenom =  data[0].prenom;

            this.infosUser.login =  data[0].login;

            this.infosUser.password =  data[0].password;

            this.infosUser.photoUser =  data[0].photoUser;

            this.infosUser.sex =  data[0].sex;


          }

          this.infosUser.typeCompte =  this.ObjetLogin.typeCompteLogin;

          this.cookie.set('infosUser', JSON.stringify(this.infosUser));

          if (this.ObjetLogin.typeCompteLogin === '1'){

            this.router.navigate(['/DashboardAdministrator']);

           }

          if (this.ObjetLogin.typeCompteLogin === '2'){

          this.router.navigate(['/DashboardCompanyOwner']);

           }

          if (this.ObjetLogin.typeCompteLogin === '3'){

          this.router.navigate(['/DashboardInvestor']);

          }


      }




    }, (error: any) => {

    });

  }



  public onFormSubmitInscription(){


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


        }else{

          console.log('toto2');

          this.infosUser.id =  data.id;

          this.infosUser.nom =  data.nom;

          this.infosUser.prenom =  data.prenom;

          this.infosUser.login =  data.login;

          this.infosUser.password =  data.password;

          this.infosUser.sex =  data.sex;
        }

        this.infosUser.typeCompte =  this.ObjetInscription.typeCompteInscription;

        this.cookie.set('infosUser', JSON.stringify(this.infosUser));

        if (this.ObjetInscription.typeCompteInscription === '1'){

          this.router.navigate(['/DashboardAdministrator']);

        }

        if (this.ObjetInscription.typeCompteInscription === '2'){

        this.router.navigate(['/DashboardCompanyOwner']);

         }

        if (this.ObjetInscription.typeCompteInscription === '3'){

           this.router.navigate(['/DashboardInvestor']);

         }


      }




  }, (error: any) => {

  });


  }



}
