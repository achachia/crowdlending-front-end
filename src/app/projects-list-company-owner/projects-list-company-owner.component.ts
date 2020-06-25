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

     public listProjects = [];

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

ngOnInit(): void {

   this.getListProjects();
  }


getListProjects(){

   this.apiService.listProjectByCompanyOwner().subscribe((data: any) => {

         console.log(data);

         this.listProjects = data;

         this.formaterStatutListProject();

         this.formaterCategorieProject();


     }, (error: any) => {

    });

  }

  formaterStatutListProject(){

     // tslint:disable-next-line:prefer-for-of
     for (let index = 0; index < this.listProjects.length; index++) {


       if (this.listProjects[index].statut_project === 0){


        this.listProjects[index].statut_project = 'Attente';

       }

       if (this.listProjects[index].statut_project === 1){


        this.listProjects[index].statut_project = 'Validé';

       }

       if (this.listProjects[index].statut_project === 2){


        this.listProjects[index].statut_project = 'Terminé';

       }

     }


  }

  formaterCategorieProject(){

    // tslint:disable-next-line:prefer-for-of
    for (let index = 0; index < this.listProjects.length; index++) {


      if (this.listProjects[index].categorie_project === 1){


       this.listProjects[index].categorie_project = 'Art & Photo';

      }

      if (this.listProjects[index].categorie_project === 2){


       this.listProjects[index].categorie_project = 'BD';

      }

      if (this.listProjects[index].categorie_project === 3){


       this.listProjects[index].categorie_project = 'Enfance & Educ.';

      }

      if (this.listProjects[index].categorie_project === 4){


        this.listProjects[index].categorie_project = 'Artisanat & Cuisine';

       }

      if (this.listProjects[index].categorie_project === 5){


        this.listProjects[index].categorie_project = 'Film et vidéo';

       }

      if (this.listProjects[index].categorie_project === 6){


        this.listProjects[index].categorie_project = 'Sports';

       }

      if (this.listProjects[index].categorie_project === 7){


        this.listProjects[index].categorie_project = 'Santé & Bien-être';

       }

      if (this.listProjects[index].categorie_project === 8){


        this.listProjects[index].categorie_project = 'Technologie';

       }

      if (this.listProjects[index].categorie_project === 9){


        this.listProjects[index].categorie_project = 'Autres projets';

       }

    }


 }

}
