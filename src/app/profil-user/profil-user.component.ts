import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { MaterialModule } from './../material/material.module';

@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {

  public infosUser = {
                     id : '',
                     nom: '',
                     prenom : '',
                     login : '',
                     password : '',
                     typeCompte : ''
     };

     public ObjetUpdateProfil = {
                               id : '',
                               nom : '',
                               prenom : '',
                               login : '',
                               password : '',
                               typeCompte : ''
       };

    public isErreurUpdatePofil = false;

    public isvalidUpdateProfil = false;

  constructor(private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService) {

      this.infosUser = JSON.parse(this.cookie.get('infosUser'));

      console.log(this.infosUser);

      this.ObjetUpdateProfil = this.infosUser ;

     
  }

  ngOnInit(): void { }

  onFormSubmitUpdateProfil(){


    this.apiService.updateProfilUser(this.ObjetUpdateProfil).subscribe((data: any) => {

      console.log(data);

      if (data.length === 0){

             this.isErreurUpdatePofil = true;

      }else{
      


      }




     }, (error: any) => {

    });

  }

}
