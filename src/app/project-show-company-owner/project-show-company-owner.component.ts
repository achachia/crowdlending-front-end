import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { apiHttpJsonService } from './../api.json.http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { ImageService } from './../image.service';

declare var window: any;

@Component({
   selector: 'app-project-show-company-owner',
   templateUrl: './project-show-company-owner.component.html',
   styleUrls: ['./project-show-company-owner.component.css']
})
export class ProjectShowCompanyOwnerComponent implements OnInit {

   public infosUser = {
      id: '',
      nom: '',
      prenom: '',
      login: '',
      password: '',
      sex: '',
      dateNaissance: '',
      photoUser: '',
      typeCompte: '',
      date_created: '',
      date_update: ''
   };

   public companyOwner = {
      id: '',
      nom: '',
      prenom: '',
      login: '',
      password: '',
      sex: '',
      dateNaissance: '',
      photoUser: '',
      typeCompte: '',
      date_created: '',
      date_update: ''
   };

   public ObjetProject = {

      id: '',
      nom: '',
      description: '',
      portes_projectId: '',
      montant_minimun: 0,
      date_limite_collecte: '',
      company_ownerId: '',
      contrePartieProject: '',
      afficheProject: 'http://placehold.it/500x325',
      statut_project: 0,
      valid_project: 0,
      categorie_projectId: 0,
      adressReseauxSociauxProject: [],
      idManager: ''

   };

   public ObjetProjectTemplate = {

      id: '',
      nom: '',
      description: '',
      portes_project: '',
      montant_minimun: 0,
      date_limite_collecte: '',
      company_owner: '',
      contrePartieProject: '',
      afficheProject: 'http://placehold.it/500x325',
      statut_project: '',
      valid_project: '',
      categorie_project: '',
      adressReseauxSociauxProject: [],
      idManager: ''

   };


   public imagesProjects = [];

   public listeStatusProject = [
      { key: 1, value: 'Valider le porjet' },
      { key: 2, value: 'Terminer le porjet' },
      { key: 3, value: 'Annuler le porjet' }
   ];

   public statutProject;

   public arrayAdressReseauxSociauxProject = [];

   public ObjetAideByConseiller = {
      body_aide: '',
      destId: '',  // admin
      expdId: '', // company_owner,
      typeComtpteExp: 'company_owner',
      typeCompteDest: 'admin',
      date_created: '',
      timestamp: 0,
      idProject: ''

   };

   public listQuestionsAidesForConsiller = [];

   public photoUserAdmin = './assets/img/users/user_f.png';

   public polling: any;


   constructor(private route: ActivatedRoute, private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService
      , private ngxService: NgxUiLoaderService, private datePipe: DatePipe, public sanitizer: DomSanitizer) {

      this.infosUser = JSON.parse(this.cookie.get('infosUser'));

      this.ObjetAideByConseiller.expdId = this.infosUser.id;


      if (this.infosUser.photoUser === '') {

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

         this.ObjetAideByConseiller.idProject = params.id;


         this.polling = setInterval(() => {

            this.getListQuestionsAides();

         }, 30 * 1000);

         console.log('idProject', this.ObjetProject.id);

      });

      this.getinfosProject();



      console.log('ProfilUserComponent', this.infosUser);
   }

   ngOnInit(): void {






   }



   updateStatutProject() {

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

   getinfosProject() {

      this.ngxService.start();

      this.apiService.getProjectById(this.ObjetProject.id).subscribe((data: any) => {

         console.log('data-project', data);

         this.ObjetProject = data;

         this.ObjetProjectTemplate.nom = data.nom;

         this.ObjetProjectTemplate.description = data.description;

         this.ObjetProjectTemplate.afficheProject = data.afficheProject;

         this.ObjetProjectTemplate.montant_minimun = data.montant_minimun;

         this.ObjetProjectTemplate.contrePartieProject = data.contrePartieProject;

         this.ObjetProjectTemplate.idManager = data.idManager;

         this.ObjetProjectTemplate.valid_project = data.valid_project;

         this.formaterProject();

         this.getInfosCompanyOwner();

         this.getAllImageProject();

         this.getListQuestionsAides();

         this.ngxService.stop();


      }, (error: any) => {

      });

   }



   getInfosCompanyOwner() {


      this.apiService.getInfosCompanyOwner(this.ObjetProject.company_ownerId).subscribe((dataCompanyOwner: any) => {

         // console.log(data);

         this.companyOwner = dataCompanyOwner;

         if (this.companyOwner.photoUser === '') {

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

   getAllImageProject() {


      this.apiService.getAllImagesByIdProject(this.ObjetProject.company_ownerId).subscribe((dataImages: any) => {

         console.log(dataImages);

         this.imagesProjects = dataImages;

      }, (error: any) => {

      });



   }

   formaterProject() {

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

      if (this.ObjetProject.statut_project === 0) {


         this.ObjetProjectTemplate.statut_project = 'Attente';

      }

      if (this.ObjetProject.statut_project === 1) {


         this.ObjetProjectTemplate.statut_project = 'Validé';

      }

      if (this.ObjetProject.statut_project === 2) {


         this.ObjetProjectTemplate.statut_project = 'Terminé';

      }

      if (this.ObjetProject.statut_project === 3) {


         this.ObjetProjectTemplate.statut_project = 'Annulé';

      }

      /******************************************************* */

   }

   onFormSubmitQuestionForConseiller() {

      const date = new Date();

      this.ObjetAideByConseiller.date_created = date.toLocaleString('fr-FR', {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric',
         hour: 'numeric',
         minute: 'numeric',
         second: 'numeric',

      });

      this.ObjetAideByConseiller.timestamp = Date.now();

      console.log('this.ObjetAideByConseiller.destId = ', this.ObjetAideByConseiller.destId);

      this.ObjetAideByConseiller.destId = this.ObjetProject.idManager;

      this.apiService.saveQuestionReponsesByCompanyOwner(this.ObjetAideByConseiller).subscribe((dataPorte: any) => {

         // console.log(data);

         this.getListQuestionsAides();


      }, (error: any) => {

      });

   }

   getListQuestionsAides() {


      this.listQuestionsAidesForConsiller = [];

      /*************************************************************************************** */

      // recuperer la liste des questions envoye par l'admin (id-admin ='1' ) pour le compagny owner

      // tslint:disable-next-line:max-line-length
      this.apiService.getListQuestionReponsesByAdmin(this.ObjetProject.idManager, this.infosUser.id, this.ObjetProject.id).subscribe((dataQuestion: any) => {

         console.log('dataQuestion', dataQuestion);

         // tslint:disable-next-line:prefer-for-of
         for (let index = 0; index < dataQuestion.length; index++) {

            this.listQuestionsAidesForConsiller.push(dataQuestion[index]);


         }

         console.log('listQuestionsAidesForConsiller', this.listQuestionsAidesForConsiller);

         this.listQuestionsAidesForConsiller = this.listQuestionsAidesForConsiller.sort((c1, c2) => c2.timestamp - c1.timestamp);


      }, (error: any) => {

      });


      /************************************************************************************ */

      // recuperer la liste des questions envoyer  par le company-owner  en vers l'admin () id-admin ='1')

      // tslint:disable-next-line:max-line-length
      this.apiService.getListQuestionReponsesByCompanyOwner(this.infosUser.id, this.ObjetProject.idManager, this.ObjetProject.id).subscribe((dataQuestionBis: any) => {

         console.log('dataQuestion', dataQuestionBis);

         // tslint:disable-next-line:prefer-for-of
         for (let indexBis = 0; indexBis < dataQuestionBis.length; indexBis++) {

            this.listQuestionsAidesForConsiller.push(dataQuestionBis[indexBis]);


         }

         console.log('listQuestionsAidesForConsiller', this.listQuestionsAidesForConsiller);

         this.listQuestionsAidesForConsiller = this.listQuestionsAidesForConsiller.sort((c1, c2) => c2.timestamp - c1.timestamp);


      }, (error: any) => {

      });




      /************************************************************************************ */

      this.listQuestionsAidesForConsiller = this.listQuestionsAidesForConsiller.sort((c1, c2) => c2.timestamp - c1.timestamp);


   }

}
