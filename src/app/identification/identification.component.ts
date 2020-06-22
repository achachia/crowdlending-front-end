import { Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { CookieService } from 'ngx-cookie-service';



@Component({
  selector: 'app-identification',
  templateUrl: './identification.component.html',
  styleUrls: ['./identification.component.css']
})
export class IdentificationComponent implements OnInit {

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
                       typeCompteInscription : ''
    };

    public infosUser = {
                        id : '',
                        nom: '',
                        prenom : '',
                        login : '',
                        password : '',
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

  ngOnInit(): void {  }

  public onFormSubmitLogin() {


    this.apiService.identificationUser(this.ObjetLogin).subscribe((data: any) => {

        console.log('IdentificationComponent/identification', data);

        if (data.length === 0){

               this.isErreurLogin = true;

        }else{

          if (data[0].length > 0){

            console.log('toto1');


            this.infosUser.id =  data.id;

            this.infosUser.nom =  data.nom;

            this.infosUser.prenom =  data.prenom;

            this.infosUser.login =  data.login;

            this.infosUser.password =  data.password;

          }else{
            console.log('toto2');


            this.infosUser.id =  data[0].id;

            this.infosUser.nom =  data[0].nom;

            this.infosUser.prenom =  data[0].prenom;

            this.infosUser.login =  data[0].login;

            this.infosUser.password =  data[0].password;


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

        if (data[0].length > 0){


          this.infosUser.id =  data.id;

          this.infosUser.nom =  data.nom;

          this.infosUser.prenom =  data.prenom;

          this.infosUser.login =  data.login;

          this.infosUser.password =  data.password;


        }else{

          this.infosUser.id =  data[0].id;

          this.infosUser.nom =  data[0].nom;

          this.infosUser.prenom =  data[0].prenom;

          this.infosUser.login =  data[0].login;

          this.infosUser.password =  data[0].password;


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
