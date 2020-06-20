import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';

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

  constructor(private router: Router, private cookie: CookieService) {

      this.infosUser = JSON.parse(this.cookie.get('infosUser'));

      console.log(this.infosUser);

      this.ObjetUpdateProfil = this.infosUser ;

     
  }

  ngOnInit(): void { }

  onFormSubmitUpdateProfil(){




  }

}
