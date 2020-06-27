import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { ImageService } from './../image.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';

declare var window: any;

@Component({
  selector: 'app-project-show-company-owner',
  templateUrl: './project-show-company-owner.component.html',
  styleUrls: ['./project-show-company-owner.component.css']
})
export class ProjectShowCompanyOwnerComponent implements OnInit {


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

     private isvalidCaptcha = false ;

     public isErreurCaptcha = false;

     constructor(private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService,
                 private imageService: ImageService, private ngxService: NgxUiLoaderService) {

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

ngOnInit(): void { }



}
