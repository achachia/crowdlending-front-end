import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { ImageService } from './../image.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import {MatDatepickerModule} from '@angular/material/datepicker';

declare var window: any;

@Component({
  selector: 'app-project-add-company-owner',
  templateUrl: './project-add-company-owner.component.html',
  styleUrls: ['./project-add-company-owner.component.css']
})
export class ProjectAddCompanyOwnerComponent implements OnInit {

@ViewChild('recaptcha', {static: true }) recaptchaElement: ElementRef;

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

  public ObjetProject = {

                           id : '',
                           nom: '',
                           description : '',
                           portes_projectId : '',
                           montant_minimun : 0,
                           date_limite_collecte : '',
                           company_ownerId : '',
                           contrePartieProject : ''

  };

     private isvalidCaptcha = false ;

     public isErreurCaptcha = false;

     favoriteSeason: string;

     seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

     constructor(private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService,
                 private imageService: ImageService, private ngxService: NgxUiLoaderService, private datePipe: DatePipe) {

              this.infosUser = JSON.parse(this.cookie.get('infosUser'));

              this.ObjetProject.company_ownerId = this.infosUser.id;

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
      sitekey : '6Lf4I6gZAAAAAMp1E9YI1FJghdQ20CNRtAV9d55y',
      callback: (response) => {
          console.log('response', response);

          this.isvalidCaptcha = true;

          this.isErreurCaptcha = false;
      }
    });
  }

  addEventDateLimiteCollecte(event){


    this.ObjetProject.date_limite_collecte = this.datePipe.transform(event.value, 'dd-MM-yyyy');

  }

  changeValue(event){

    console.log(event.value);
  }

  onFormSubmitAddProject(){




  }

}
