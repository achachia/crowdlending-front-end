import { Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';



@Component({
  selector: 'app-projects-list-company-owner',
  templateUrl: './projects-list-company-owner.component.html',
  styleUrls: ['./projects-list-company-owner.component.css']
})
export class ProjectsListCompanyOwnerComponent implements OnInit {


  public infosUser = {
                     id : '',
                     nom: '',
                     prenom : '',
                     login : '',
                     password : '',
                     sex : '',
                     dateNaissance : '',
                     photoUser : '',
                     typeCompte : '',
                     date_created: '',
                     date_update: ''
     };

     constructor(private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService
                 , private ngxService: NgxUiLoaderService) {

              this.infosUser = JSON.parse(this.cookie.get('infosUser'));

              if (this.infosUser.photoUser === ''){

             if (this.infosUser.sex === 'F') {

                      this.infosUser.photoUser = './assets/img/users/user_f.png';


                }

             if (this.infosUser.sex === 'M') {

                  this.infosUser.photoUser = './assets/img/users/user_m.png';

 
              }

           }else{

        }

              console.log('ProfilUserComponent', this.infosUser);


       }

ngOnInit(): void {}

}
