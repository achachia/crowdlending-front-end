import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { ImageService } from './../image.service';


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
                     sex : '',
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

  ngOnInit(): void { }

  onFormSubmitUpdateProfil(){


    this.apiService.updateProfilUser(this.ObjetUpdateProfil).subscribe((data: any) => {

      console.log(data);

      if (data.length === 0){

             this.isErreurUpdatePofil = true;

      }else{

           this.isvalidUpdateProfil = true;

      }




     }, (error: any) => {

    });

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
