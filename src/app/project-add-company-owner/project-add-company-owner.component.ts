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
                           contrePartieProject : '',
                           afficheProject : 'http://placehold.it/500x325',
                           statut_project : 0,
                           categorie_projectId : 0,
                           adressReseauxSociauxProject : []

  };

     private isvalidCaptcha = false ;

     public isErreurCaptcha = false;

     public photosProject = [];

     public imageFile: File;

     public isErreurValidProject = false;

     public comptImagesProject = 0;

     public listCategorieProject = [];

     public adressReseauxSociauxProject = [];

     public typeMediaWeb: any = '';

     public listCanalMedia = [

                             {key: 'site_internet/Site internet', value: 'Site internet'},
                             {key: 'link_google_plus/Google plus', value: 'Google plus'},
                             {key: 'link_facbook/Face-book', value: 'Face-book'},
                             {key: 'link_youtube/Youtube', value: 'Youtube'},
                             {key: 'link_twitter/Twitter', value: 'Twitter'},
                             {key: 'num_tel/Numero téléphone', value: 'Numero téléphone'},

     ];

     public linkProject = '';

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

    this.getListCategorieProject();

    this.photosProject.push({link : 'http://placehold.it/500x325', projectsCompanyOwnerId : ''});
  }

  addAdressWeb(){

    const arrayMedia = this.typeMediaWeb.split('/');

    const objectLinkMedia = {

                             keyMedia : arrayMedia[0],
                             valueMedia : arrayMedia[1],
                             linkProject : this.linkProject
    };

    this.adressReseauxSociauxProject.push(objectLinkMedia);

    this.ObjetProject.adressReseauxSociauxProject = this.adressReseauxSociauxProject;

    console.log(objectLinkMedia);

  }

  removeAdressWeb(index){

    this.adressReseauxSociauxProject.splice(index, 1);

    this.ObjetProject.adressReseauxSociauxProject = this.adressReseauxSociauxProject;

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

  handleChange(value){

    console.log(value);

    this.ObjetProject.contrePartieProject = value;

  }

  addImageProject(objectImage){

    this.apiService.addImageProject(objectImage).subscribe((data: any) => {

      console.log('data-image-project', data);


    }, (error: any) => {

    });


  }

  onFormSubmitAddProject(){

    if (this.isvalidCaptcha){

      this.apiService.addProjectByCompanyOwner(this.ObjetProject).subscribe((data: any) => {

        console.log(data.id);

        this.ObjetProject.id = data.id;

        if (this.photosProject.length > 0){

             // tslint:disable-next-line:prefer-for-of
             for (let index = 0; index < this.photosProject.length; index++) {

                 this.photosProject[index].projectsCompanyOwnerId = data.id;

                 this.addImageProject( this.photosProject[index]);
             }
        }

        this.router.navigate(['/compangy_owner/projetcs']);


       }, (error: any) => {

      });

    }

  }

  imageInputChange(imageInput: any) {

    this.imageFile = imageInput.files[0];

  }

  addImage() {

    this.ngxService.start();

    const infoObjectphotos = {
                      title: 'images_project',
                      description:  'images_project'
                    };



    this.imageService.uploadImage(this.imageFile, infoObjectphotos).then((imageData: any) => {

      console.log(imageData.data.link);

      const objectPhoto = {
                          link : imageData.data.link,
                          projectsCompanyOwnerId : ''
      };

      if (this.comptImagesProject === 0){

        this.photosProject = [];

      }

      this.photosProject.push(objectPhoto);

      this.comptImagesProject++;

      this.ngxService.stop();


     });

  }


  addImageAfficheProject(){

    this.ngxService.start();

    const infoObjectphotos = {
                      title: 'image_affiche_project',
                      description:  'image_affiche_project'
            };



    this.imageService.uploadImage(this.imageFile, infoObjectphotos).then((imageData: any) => {

      console.log(imageData.data.link);

      this.ObjetProject.afficheProject = imageData.data.link;

      this.ngxService.stop();


     });

  }

  getListCategorieProject(){

    this.apiService.getListCategorieProject().subscribe((data: any) => {

      console.log(data);

      this.listCategorieProject = data;


     }, (error: any) => {

    });

  }

}
