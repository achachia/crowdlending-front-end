import { Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-projects-list-admin',
  templateUrl: './projects-list-admin.component.html',
  styleUrls: ['./projects-list-admin.component.css']
})
export class ProjectsListAdminComponent implements OnInit {

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
           ,private ngxService: NgxUiLoaderService, private datePipe: DatePipe) {

    this.infosUser = JSON.parse(this.cookie.get('infosUser'));

    if (this.infosUser.photoUser === ''){

         if (this.infosUser.sex === 'F') {

                 this.infosUser.photoUser = './assets/img/users/user_f.png';


           }

         if (this.infosUser.sex === 'H') {

               this.infosUser.photoUser = './assets/img/users/user_m.png';


            }

      }else{

     }

    this.getListProjects();

    console.log('ProfilUserComponent', this.infosUser);


  }

  ngOnInit(): void { }

  getListProjects(){

    this.ngxService.start();

    this.apiService.listAllProjects().subscribe((data: any) => {

          // console.log(data);

          this.listProjects = data;

          this.calculNombredeJours();

          this.formaterListProject();

          this.ngxService.stop();


      }, (error: any) => {

     });

   }

   calculNombredeJours(){

     const date1 = new Date();

     // tslint:disable-next-line:prefer-for-of
     for (let index = 0; index < this.listProjects.length; index++) {

     const date2 = new Date(this.listProjects[index].date_limite_collecte);

     const diff = this.dateDiff(date1, date2);

     if (this.listProjects[index].statut_project === 1){

        if (diff.day <= 0 ){

          this.listProjects[index].statut_project = 2;

          this.updateStatutProject(this.listProjects[index]);



        }else{

         this.listProjects[index].nbrJoursRestant = 'J-' + diff.day + ' jours';

        }

      }


     }



      // tslint:disable-next-line:max-line-length
      //  console.log('Entre le ' + date1.toString() + ' et ' + date2.toString() + ' il y a ' + diff.day + ' jours, ' + diff.hour + ' heures, ' + diff.min + ' minutes et ' + diff.sec + ' secondes');

   }

   formaterListProject() {

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

      if (this.listProjects[index].statut_project === 3){


       this.listProjects[index].statut_project = 'Annulé';

      }


      // tslint:disable-next-line:max-line-length
      this.listProjects[index].date_limite_collecte = this.datePipe.transform(this.listProjects[index].date_limite_collecte, 'dd-MM-yyyy');


    /********************************************************** */

      this.getObjectCategorieProject(index);

     /*********************************************************** */


    }


 }

 updateStatutProject(objectProject){


  this.apiService.updateStatutProject(objectProject).subscribe((data: any) => {

    // console.log(data);

    }, (error: any) => {

   });

 }

  dateDiff(date1, date2){

     const diff = {day : 0, hour: 0, min : 0, sec : 0 };                           // Initialisation du retour
     let tmp = date2 - date1;

     tmp = Math.floor(tmp / 1000);             // Nombre de secondes entre les 2 dates
     diff.sec = tmp % 60;                    // Extraction du nombre de secondes

     tmp = Math.floor((tmp - diff.sec) / 60);    // Nombre de minutes (partie entière)
     diff.min = tmp % 60;                    // Extraction du nombre de minutes

     tmp = Math.floor((tmp - diff.min) / 60);    // Nombre d'heures (entières)
     diff.hour = tmp % 24;                   // Extraction du nombre d'heures

     tmp = Math.floor((tmp - diff.hour) / 24);   // Nombre de jours restants
     diff.day = tmp;

     return diff;
 }



  getObjectCategorieProject(indexProject){


     this.apiService.getCategorieProject(this.listProjects[indexProject].categorie_projectId).subscribe((data: any) => {

         // console.log(data);

          this.listProjects[indexProject].categorie_project = data.nom;

      }, (error: any) => {

     });

  }



  removeProject(indexProject){

   if (confirm('Vous ete sure de supprimer le projet ')) {
        /*********************** Supression les images associe au project ******************************** */

   this.getAllImagesByIdProject(this.listProjects[indexProject].id);

   /**********************  Supression fiche project ****************************** */

   this.apiService.deleteProject(this.listProjects[indexProject].id).subscribe((data: any) => {

     // console.log(data);

     this.listProjects.splice(indexProject, 1);

     }, (error: any) => {

    });
   }

  }

  getAllImagesByIdProject(idProject){


   this.apiService.getAllImagesByIdProject(idProject).subscribe((data: any) => {

     // console.log(data);

      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < data.length; index++) {




      }

    }, (error: any) => {

   });



  }

}
