import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { apiHttpJsonService } from './../api.json.http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-project-show-investor',
  templateUrl: './project-show-investor.component.html',
  styleUrls: ['./project-show-investor.component.css']
})
export class ProjectShowInvestorComponent implements OnInit {

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

  public arrayAdressReseauxSociauxProject = [];

  public ObjetAideForCompanyOwner = {
    body_aide: '',
    destId: '',  // company_owner
    expdId: '', // admin,
    typeComtpteExp: 'investor',
    typeCompteDest: 'company_owner',
    date_created: '',
    timestamp: 0,
    idProject: ''

  };

  public listQuestionsAidesForCompanyOwner = [];

  public polling: any;

  public  COUNTRIES  = [
    {
      id: 1,
      name: 'Russia',
      flag: 'f/f3/Flag_of_Russia.svg',
      area: 17075200,
      population: 146989754
    },
    {
      id: 2,
      name: 'France',
      flag: 'c/c3/Flag_of_France.svg',
      area: 640679,
      population: 64979548
    },
    {
      id: 3,
      name: 'Germany',
      flag: 'b/ba/Flag_of_Germany.svg',
      area: 357114,
      population: 82114224
    },
    {
      id: 4,
      name: 'Portugal',
      flag: '5/5c/Flag_of_Portugal.svg',
      area: 92090,
      population: 10329506
    },
    {
      id: 5,
      name: 'Canada',
      flag: 'c/cf/Flag_of_Canada.svg',
      area: 9976140,
      population: 36624199
    },
    {
      id: 6,
      name: 'Vietnam',
      flag: '2/21/Flag_of_Vietnam.svg',
      area: 331212,
      population: 95540800
    },
    {
      id: 7,
      name: 'Brazil',
      flag: '0/05/Flag_of_Brazil.svg',
      area: 8515767,
      population: 209288278
    },
    {
      id: 8,
      name: 'Mexico',
      flag: 'f/fc/Flag_of_Mexico.svg',
      area: 1964375,
      population: 129163276
    },
    {
      id: 9,
      name: 'United States',
      flag: 'a/a4/Flag_of_the_United_States.svg',
      area: 9629091,
      population: 324459463
    },
    {
      id: 10,
      name: 'India',
      flag: '4/41/Flag_of_India.svg',
      area: 3287263,
      population: 1324171354
    },
    {
      id: 11,
      name: 'Indonesia',
      flag: '9/9f/Flag_of_Indonesia.svg',
      area: 1910931,
      population: 263991379
    },
    {
      id: 12,
      name: 'Tuvalu',
      flag: '3/38/Flag_of_Tuvalu.svg',
      area: 26,
      population: 11097
    },
    {
      id: 13,
      name: 'China',
      flag: 'f/fa/Flag_of_the_People%27s_Republic_of_China.svg',
      area: 9596960,
      population: 1409517397
    }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService
    , private ngxService: NgxUiLoaderService, private datePipe: DatePipe, public sanitizer: DomSanitizer) {

    this.infosUser = JSON.parse(this.cookie.get('infosUser'));

    this.ObjetAideForCompanyOwner.expdId = this.infosUser.id;


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

      this.ObjetAideForCompanyOwner.idProject = params.id;

      console.log('idProject', this.ObjetProject.id);

    });

    this.getinfosProject();

    console.log('ProfilUserComponent', this.infosUser);
  }

  ngOnInit(): void { }



  demandeInvestProjectForCompanyOwner() {

    /*this.ngxService.start();

    // tslint:disable-next-line:radix
    this.ObjetProject.statut_project = parseInt(this.statutProject);

    // tslint:disable-next-line:radix
    this.ObjetProject.valid_project = parseInt(this.statutProject);

    console.log('this.ObjetProject', this.ObjetProject);

    this.apiService.updateDataProjet(this.ObjetProject).subscribe((data: any) => {

      // console.log(data);

      this.ngxService.stop();

      this.router.navigate(['/admin/projetcs']);

    }, (error: any) => {

    }); */

  }

  getinfosProject() {

    this.ngxService.start();

    this.apiService.getProjectById(this.ObjetProject.id).subscribe((data: any) => {

      // console.log(data);

      this.ObjetProject = data;

      this.ObjetProjectTemplate.nom = data.nom;

      this.ObjetProjectTemplate.description = data.description;

      this.ObjetProjectTemplate.afficheProject = data.afficheProject;

      this.ObjetProjectTemplate.montant_minimun = data.montant_minimun;

      this.ObjetProjectTemplate.contrePartieProject = data.contrePartieProject;

      this.ObjetProjectTemplate.idManager = data.idManager;

      this.ObjetProjectTemplate.valid_project = data.valid_project;

      if (this.ObjetProject.idManager === '') {

        console.log('pas de manager pour ce projet');

        this.ObjetProject.idManager = this.infosUser.id;

        this.ObjetProjectTemplate.idManager = this.infosUser.id;

      } else {

        console.log('ObjetProjectTemplate.idManager', this.ObjetProjectTemplate.idManager);

        console.log('infosUser.id', this.infosUser.id);

        if (this.ObjetProjectTemplate.idManager === this.infosUser.id.toString()) {

          console.log(' ce projet est geré par manager-en-session');

        } else {


          console.log(' ce projet est geré par un autre manager');
        }

      }


      this.formaterProject();

      this.getInfosCompanyOwner();

      this.getAllImageProject();

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

      this.getListQuestionsAides();

      this.polling = setInterval(() => {

        this.getListQuestionsAides();

      }, 30 * 1000);


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

  onFormSubmitQuestionForCompanyOwner() {

    const date = new Date();

    this.ObjetAideForCompanyOwner.date_created = date.toLocaleString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',

    });

    this.ObjetAideForCompanyOwner.timestamp = Date.now();

    this.ObjetAideForCompanyOwner.destId = this.companyOwner.id;

    this.ObjetAideForCompanyOwner.idProject = this.ObjetProject.id;


    this.apiService.saveQuestionReponsesByAdmin(this.ObjetAideForCompanyOwner).subscribe((dataPorte: any) => {

      // console.log(data);

      this.getListQuestionsAides();


    }, (error: any) => {

    });

  }

  getListQuestionsAides() {

    this.listQuestionsAidesForCompanyOwner = [];

    /*************************************************************************************** */

    // recuperer la liste des questions envoye par l'admin (id-admin ='1' ) pour le compagny owner

    // tslint:disable-next-line:max-line-length
    this.apiService.getListQuestionReponsesByInvestorForCompanyOwner(this.infosUser.id, this.companyOwner.id, this.ObjetProject.id).subscribe((dataQuestion: any) => {

      console.log('dataQuestion', dataQuestion);

      // tslint:disable-next-line:prefer-for-of
      for (let index = 0; index < dataQuestion.length; index++) {

        this.listQuestionsAidesForCompanyOwner.push(dataQuestion[index]);


      }

      console.log('listQuestionsAidesForCompany-owner', this.listQuestionsAidesForCompanyOwner);

      this.listQuestionsAidesForCompanyOwner = this.listQuestionsAidesForCompanyOwner.sort((c1, c2) => c2.timestamp - c1.timestamp);


    }, (error: any) => {

    });


    /************************************************************************************ */

    // recuperer la liste des questions envoyer  par le company-owner  en vers l'admin () id-admin ='1')

    // tslint:disable-next-line:max-line-length
    this.apiService.getListQuestionReponsesByCompanyOwnerForInvestor(this.companyOwner.id, this.infosUser.id, this.ObjetProject.id).subscribe((dataQuestionBis: any) => {

      console.log('dataQuestion', dataQuestionBis);

      // tslint:disable-next-line:prefer-for-of
      for (let indexBis = 0; indexBis < dataQuestionBis.length; indexBis++) {

        this.listQuestionsAidesForCompanyOwner.push(dataQuestionBis[indexBis]);


      }

      this.listQuestionsAidesForCompanyOwner = this.listQuestionsAidesForCompanyOwner.sort((c1, c2) => c2.timestamp - c1.timestamp);

      console.log('listQuestionsAidesForCompany-owner', this.listQuestionsAidesForCompanyOwner);


    }, (error: any) => {

    });


    this.listQuestionsAidesForCompanyOwner = this.listQuestionsAidesForCompanyOwner.sort((c1, c2) => c2.timestamp - c1.timestamp);



    /************************************************************************************ */




  }

}
