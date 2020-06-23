import { Component, OnInit, ElementRef, ViewChild} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { ImageService } from './../image.service';

declare var window: any;


@Component({
  selector: 'app-profil-user',
  templateUrl: './profil-user.component.html',
  styleUrls: ['./profil-user.component.css']
})
export class ProfilUserComponent implements OnInit {


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
                     typeCompte : ''
     };

     public ObjetUpdateProfil = {
                               id : '',
                               nom : '',
                               prenom : '',
                               login : '',
                               password : '',
                               photoUser : '',
                               sex : '',
                               dateNaissance : '',
                               typeCompte : ''
       };

    public isErreurUpdatePofil = false;

    public isvalidUpdateProfil = false;

    public imageTitle: string;

    public imageDescription: string;

    public imageFile: File;

    public urlImageProfil: string;

    public arrayListSex = [

                            {key: 'M', value: 'Homme'},
                            {key: 'F', value: 'Femme'}
    ];

    private isvalidCaptcha = false ;

    public isErreurCaptcha = false;

  constructor(private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService,
              private imageService: ImageService) {

      this.infosUser = JSON.parse(this.cookie.get('infosUser'));

      if (this.infosUser.photoUser === ''){



        if (this.infosUser.sex === 'F') {

           this.urlImageProfil = './assets/img/users/user_f.png';
        }

        if (this.infosUser.sex === 'M') {

          this.urlImageProfil = './assets/img/users/user_m.png';
          }

      }else{

        this.urlImageProfil = this.infosUser.photoUser;

      }

      console.log('ProfilUserComponent', this.infosUser);

      this.ObjetUpdateProfil = this.infosUser ;


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
      }
    });
  }

  onFormSubmitUpdateProfil(){


    if (this.isvalidCaptcha){


      this.apiService.updateProfilUser(this.ObjetUpdateProfil).subscribe((data: any) => {

        console.log(data);

        if (data.length === 0){

               this.isErreurUpdatePofil = true;

        }else{

             this.isvalidUpdateProfil = true;

        }


       }, (error: any) => {

      });

    }else{

      this.isErreurCaptcha = true;
    }




  }

  imageInputChange(imageInput: any) {

    this.imageFile = imageInput.files[0];

  }

  addImage() {

    const infoObject = {
                      title: this.infosUser.nom + '_avatar',
                      description: this.infosUser.nom + '_avatar'
                    };

    this.imageService.uploadImage(this.imageFile, infoObject).then((imageData: any) => {

      console.log(imageData.data.link);

      this.urlImageProfil = imageData.data.link;

      this.ObjetUpdateProfil.photoUser = imageData.data.link;




     });

  }

}
