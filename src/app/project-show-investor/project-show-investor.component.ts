import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ActivatedRoute, Router } from '@angular/router';
import { apiHttpJsonService } from './../api.json.http.service';
import { NgxUiLoaderService } from 'ngx-ui-loader';
import { DatePipe } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { IPayPalConfig, ICreateOrderRequest } from 'ngx-paypal';
import { data } from 'jquery';

@Component({
  selector: 'app-project-show-investor',
  templateUrl: './project-show-investor.component.html',
  styleUrls: ['./project-show-investor.component.css']
})
export class ProjectShowInvestorComponent implements OnInit {

  public payPalConfig?: IPayPalConfig;

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
    expdId: '', // investor,
    expNom: '', // investor,
    expAvatar : '', // investor,
    typeComtpteExp: 'investor',
    typeCompteDest: 'company_owner',
    date_created: '',
    timestamp: 0,
    idProject: ''

  };

  public listQuestionsAidesForCompanyOwner = [];

  public polling: any;

  public page = 1;

  public pageSize = 4;

  public collectionSize = 0;

  public checkInvest = false;

  public validInvest = false;

  public listInvestor = [];

  public showFormFond = false;

  public fondInvestor = {

                         timestamp: 0,
                         idProject: '',
                         date_created: '',
                         nomInvestor : '',
                         idInvestor : '',
                         amount : '',
                         modeTransc : 'Paypal'


                       };

  constructor(private route: ActivatedRoute, private router: Router, private cookie: CookieService, private apiService: apiHttpJsonService
    ,         private ngxService: NgxUiLoaderService, private datePipe: DatePipe, public sanitizer: DomSanitizer) {

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

    this.ObjetAideForCompanyOwner.expAvatar = this.infosUser.photoUser;  

    this.ObjetAideForCompanyOwner.expNom = this.infosUser.nom + '.' + this.infosUser.prenom;



    this.route.params.subscribe(params => {

      this.ObjetProject.id = params.id;

      this.ObjetProjectTemplate.id = params.id;

      this.ObjetAideForCompanyOwner.idProject = params.id;

      console.log('idProject', this.ObjetProject.id);

    });

    this.getinfosProject();

    console.log('ProfilUserComponent', this.infosUser);
  }

  ngOnInit(): void {  }

  addFondInvestForPorject(){

    this.showFormFond = true;

    const date = new Date();

    this.fondInvestor.date_created = date.toLocaleString('fr-FR', {
                                              weekday: 'long',
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: 'numeric',
                                              minute: 'numeric',
                                              second: 'numeric',

     });

    this.fondInvestor.timestamp = Date.now();

   }

  onFormSubmitAddFondByInvestor(){

        this.initConfig();

  }

  private initConfig(): void {
    this.payPalConfig = {
    currency: 'EUR',
    clientId: 'AST3IB2GzDWxt19bQ32sdSA8Qvki6oqZ3EEDEoz_aWbwA3AVtwzUsRu6jjoVw9ajRYthH7YbCd9hkaNC',
    // tslint:disable-next-line:whitespace
    // tslint:disable-next-line:no-angle-bracket-type-assertion
    createOrderOnClient: (data) => <ICreateOrderRequest>{
      intent: 'CAPTURE',
      purchase_units: [
        {
          amount: {
            currency_code: 'EUR',
            value: this.fondInvestor.amount,
            breakdown: {
              item_total: {
                currency_code: 'EUR',
                value: this.fondInvestor.amount
              }
            }
          },
          items: [
            {
              name: 'Enterprise Subscription',
              quantity: '1',
              category: 'DIGITAL_GOODS',
              unit_amount: {
                currency_code: 'EUR',
                value: this.fondInvestor.amount,
              },
            }
          ]
        }
      ]
    },
    advanced: {
      commit: 'true'
    },
    style: {
      label: 'paypal',
      layout: 'vertical'
    },
    onApprove: (data, actions) => {
      console.log('onApprove - transaction was approved, but not authorized', data, actions);
      actions.order.get().then(details => {
        console.log('onApprove - you can get full order details inside onApprove: ', details);
      });
    },
    onClientAuthorization: (data) => {
      console.log('onClientAuthorization - you should probably inform your server about completed transaction at this point', data);
      // this.showSuccess = true;
    },
    onCancel: (data, actions) => {
      console.log('OnCancel', data, actions);
    },
    onError: err => {
      console.log('OnError', err);
    },
    onClick: (data, actions) => {
      console.log('onClick', data, actions);
    },
  };
  }

 

  get getListInvestor() {

    this.collectionSize = this.listInvestor.length;

    // tslint:disable-next-line:max-line-length
    return this.listInvestor.map((investor, i) => ({id: i + 1, ...investor})).slice((this.page - 1) * this.pageSize, (this.page - 1) * this.pageSize + this.pageSize);
  }




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

      this.checkInvestByProject();

      this.validInvestByProject();


      this.getListInvestorByProject();

      this.ngxService.stop();


    }, (error: any) => {

    });

  }

  checkInvestByProject(){

    this.apiService.checkInvestByProject(this.infosUser.id, this.ObjetProject.id).subscribe((dataCheck: any) => {

     console.log('dataCheck', dataCheck.length);
      // tslint:disable-next-line:align
      if (dataCheck.length > 0){

           this.checkInvest = true;
      }

    }, (error: any) => {

    });


  }

  validInvestByProject(){

    this.apiService.validInvestByProject(this.infosUser.id, this.ObjetProject.id).subscribe((dataCheck: any) => {

     console.log('dataCheck', dataCheck.length);
      // tslint:disable-next-line:align
      if (dataCheck.length > 0){

           this.validInvest = true;
      }

    }, (error: any) => {

    });


  }

  sendDemandeInvestForCompanyOwner(){

    // tslint:disable-next-line:max-line-length
    // tslint:disable-next-line:no-shadowed-variable
    // tslint:disable-next-line:max-line-length

    const date = new Date();

    const dateCreated = date.toLocaleString('fr-FR', {
                                              weekday: 'long',
                                              year: 'numeric',
                                              month: 'long',
                                              day: 'numeric',
                                              hour: 'numeric',
                                              minute: 'numeric',
                                              second: 'numeric',

     });

    const objectDemande = {

                           investorId : this.infosUser.id,

                           investorPhotoUser :  this.infosUser.photoUser,

                           investorNom : this.infosUser.nom + '.' + this.infosUser.prenom,

                           companyOwnerId : this.ObjetProject.company_ownerId,

                           projectId : this.ObjetProject.id,

                           stautDemande : 0,

                           date_created : dateCreated,

                           timestamp : Date.now(),

                           date_valid : '',



    };


    this.apiService.sendDemandeInvestForCompanyOwner(objectDemande).subscribe((dataDemande: any) => {

      console.log('data-send', dataDemande);


     }, (error: any) => {

     });



  }

  getListInvestorByProject(){

    this.apiService.getListInvestorByProject(this.ObjetProject.id).subscribe((dataInvestor: any) => {

      console.log('dataInvestor', dataInvestor);

      this.listInvestor = dataInvestor;


     }, (error: any) => { });


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

      }, 10 * 1000);


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


    this.apiService.saveQuestionReponsesByInvestorForCompanyOwner(this.ObjetAideForCompanyOwner).subscribe((dataPorte: any) => {

      // console.log(data);

      this.getListQuestionsAides();


    }, (error: any) => {

    });

  }



  getListQuestionsAides() {

    this.listQuestionsAidesForCompanyOwner = [];

    /*************************************************************************************** */

    // recuperer la liste des questions envoye par l'investor (id-admin ='1' ) pour le compagny owner

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
