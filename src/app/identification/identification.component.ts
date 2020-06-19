import { Component, OnInit } from '@angular/core';
import {Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';


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
                       nomInscription : '',
                       prenomInscription : '',
                       emailInscription : '',
                       passwordInscription : '',
                       typeCompteInscription : ''
    };

  public isErreurLogin = false;

  public isErreurInscription = false;

  public isvalidLogin = false;

  public isvalidInscription = false;

  constructor(private router: Router, private apiService: apiHttpJsonService) {}

  ngOnInit(): void { }

  public onFormSubmitLogin() {


    this.apiService.identificationUser(this.ObjetLogin).subscribe((data: any) => {

        console.log(data);

        if (data.length === 0){

               this.isErreurLogin = true;

        }else{

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

    alert(this.ObjetInscription.nomInscription);


  }

}
