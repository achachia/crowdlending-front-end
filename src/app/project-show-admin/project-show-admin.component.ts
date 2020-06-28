import { Component, OnInit} from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {ActivatedRoute, Router} from '@angular/router';
import {apiHttpJsonService} from './../api.json.http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import {DomSanitizer} from '@angular/platform-browser';


@Component({
  selector: 'app-project-show-admin',
  templateUrl: './project-show-admin.component.html',
  styleUrls: ['./project-show-admin.component.css']
})
export class ProjectShowAdminComponent implements OnInit {

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

  public companyOwner = {
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

     public ObjetProjectTemplate = {

                           id : '',
                           nom: '',
                           description : '',
                           portes_project : '',
                           montant_minimun : 0,
                           date_limite_collecte : '',
                           company_owner : '',
                           contrePartieProject : '',
                           afficheProject : 'http://placehold.it/500x325',
                           statut_project : '',
                           categorie_project : '',
                           adressReseauxSociauxProject : []

        };


   public imagesProjects = [];

   public listeStatusProject = [
                               {key : 1 , value : 'Valider le porjet'},
                               {key : 2 , value : 'Terminer le porjet'},
                               {key : 3 , value : 'Annuler le porjet'}
                                 ];

   public statutProject ;

   public arrayAdressReseauxSociauxProject = [];




  constructor(private route: ActivatedRoute, private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService
             , private ngxService: NgxUiLoaderService, private datePipe: DatePipe, public sanitizer: DomSanitizer) {

              this.infosUser = JSON.parse(this.cookie.get('infosUser'));

              if (this.infosUser.photoUser === ''){

                   if (this.infosUser.sex === 'F') {

                           this.infosUser.photoUser = './assets/img/users/user_f.png';


                     }

                   if (this.infosUser.sex === 'M') {

                         this.infosUser.photoUser = './assets/img/users/user_m.png';


                      }

                }

              this.route.params.subscribe(params => {

                  this.ObjetProject.id = params.id;

                  this.ObjetProjectTemplate.id = params.id;

                  console.log('idProject', this.ObjetProject.id);

               });

              this.getinfosProject();

              console.log('ProfilUserComponent', this.infosUser);
             }

  ngOnInit(): void {


   



  }

  

 updateStatutProject(){

    this.ngxService.start();

    // tslint:disable-next-line:radix
    this.ObjetProject.statut_project = parseInt(this.statutProject);

    console.log('this.ObjetProject', this.ObjetProject);

    this.apiService.updateDataProjet(this.ObjetProject).subscribe((data: any) => {

         // console.log(data);

         this.ngxService.stop();

         this.router.navigate(['/admin/projetcs']);

     }, (error: any) => {

     });

  }

  getinfosProject(){

    this.ngxService.start();

    this.apiService.getProjectById(this.ObjetProject.id).subscribe((data: any) => {

          // console.log(data);

          this.ObjetProject = data;

          this.ObjetProjectTemplate.nom = data.nom;

          this.ObjetProjectTemplate.description = data.description;

          this.ObjetProjectTemplate.afficheProject = data.afficheProject;

          this.ObjetProjectTemplate.montant_minimun = data.montant_minimun;

          this.ObjetProjectTemplate.contrePartieProject = data.contrePartieProject;

          this.formaterProject();

          this.getInfosCompanyOwner();

          this.getAllImageProject();

          this.ngxService.stop();


      }, (error: any) => {

     });

  }

 

  getInfosCompanyOwner(){


    this.apiService.getInfosCompanyOwner(this.ObjetProject.company_ownerId).subscribe((dataCompanyOwner: any) => {

      // console.log(data);

      this.companyOwner = dataCompanyOwner;

      if (this.companyOwner.photoUser === ''){

        if (this.companyOwner.sex === 'F') {

           this.companyOwner.photoUser = './assets/img/users/user_f.png';


          }

        if (this.companyOwner.sex === 'M') {

            this.companyOwner.photoUser = './assets/img/users/user_m.png';


           }

     }

      }, (error: any) => {

     });

  }

  getAllImageProject(){


    this.apiService.getAllImagesByIdProject(this.ObjetProject.company_ownerId).subscribe((dataImages: any) => {

      console.log(dataImages);

      this.imagesProjects = dataImages;

      }, (error: any) => {

     });



  }

  formaterProject(){

      /******************************************************** */

      this.apiService.getPorteProjectById(this.ObjetProject.portes_projectId).subscribe((dataPorte: any) => {

        // console.log(data);

        this.ObjetProjectTemplate.portes_project = dataPorte.nom;

        }, (error: any) => {

       });

      /****************************************************** */

      this.ObjetProjectTemplate.date_limite_collecte = this.datePipe.transform(this.ObjetProject.date_limite_collecte, 'dd-MM-yyyy');


      /******************************************************* */

      this.apiService.getCategorieProject(this.ObjetProject.categorie_projectId).subscribe((dataCatgorie: any) => {

        // console.log(data);

        this.ObjetProjectTemplate.categorie_project = dataCatgorie.nom;

        }, (error: any) => {

       });


      /******************************************************* */

      if (this.ObjetProject.statut_project === 0 ){


        this.ObjetProjectTemplate.statut_project = 'Attente';

       }

      if (this.ObjetProject.statut_project === 1){


        this.ObjetProjectTemplate.statut_project = 'Validé';

       }

      if (this.ObjetProject.statut_project === 2){


        this.ObjetProjectTemplate.statut_project = 'Terminé';

       }

      if (this.ObjetProject.statut_project === 3){


        this.ObjetProjectTemplate.statut_project = 'Annulé';

       }




       /******************************************************* */



  }

}
