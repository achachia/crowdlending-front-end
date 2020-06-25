import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class apiHttpJsonService {

  private apiUrlLocal = 'http://localhost:3000';

  private apiUrlCloud = 'https://json-server-growdlending.herokuapp.com';  // https://json-server-growdlending.herokuapp.com

  constructor(private http: HttpClient) { }


  public countItems(objectInscription){

    let url = '';

    if (objectInscription.typeCompteInscription === '1'){

      url = this.apiUrlCloud + '/administrator';

     }

    if (objectInscription.typeCompteInscription === '2'){

      url = this.apiUrlCloud + '/company_owner';

     }

    if (objectInscription.typeCompteInscription === '3'){

         url = this.apiUrlCloud + '/investor';

     }

    return this.http.get(url);

  }


   public identificationUser(objectConnection){

    let url = '';

    if (objectConnection.typeCompteLogin === '1'){

        url = this.apiUrlCloud + '/administrator?login=' + objectConnection.emailLogin + '&password=' + objectConnection.passwordLogin;

    }

    if (objectConnection.typeCompteLogin === '2'){

        url = this.apiUrlCloud + '/company_owner?login=' + objectConnection.emailLogin + '&password=' + objectConnection.passwordLogin;

    }

    if (objectConnection.typeCompteLogin === '3'){

        url = this.apiUrlCloud + '/investor?login=' + objectConnection.emailLogin + '&password=' + objectConnection.passwordLogin;

    }

    return this.http.get(url);


  }

  public inscriptionUser(objectInscription){

    let url = '';

    let params = {};

    if (objectInscription.typeCompteInscription === '1'){

        url = this.apiUrlCloud + '/administrator';

        params = {
                 id : objectInscription.id,
                 nom : objectInscription.nomInscription,
                 prenom : objectInscription.prenomInscription,
                 login : objectInscription.emailInscription,
                 password : objectInscription.passwordInscription,
                 sex : objectInscription.sex,
                 photoUser : objectInscription.photoUser,
                 dateNaissance : objectInscription.dateNaissance,
                 date_created: objectInscription.date_created,
                 date_update: objectInscription.date_update
            };

     }

    if (objectInscription.typeCompteInscription === '2'){

        url = this.apiUrlCloud + '/company_owner';

        params = {
                id : objectInscription.id,
                nom : objectInscription.nomInscription,
                prenom : objectInscription.prenomInscription,
                login : objectInscription.emailInscription,
                password : objectInscription.passwordInscription,
                sex : objectInscription.sex,
                photoUser : objectInscription.photoUser,
                dateNaissance : objectInscription.dateNaissance,
                date_created: objectInscription.date_created,
                date_update: objectInscription.date_update
         };

      }

    if (objectInscription.typeCompteInscription === '3'){

        url = this.apiUrlCloud + '/investor';

        params = {
                  id : objectInscription.id,
                  nom : objectInscription.nomInscription,
                  prenom : objectInscription.prenomInscription,
                  login : objectInscription.emailInscription,
                  password : objectInscription.passwordInscription,
                  sex : objectInscription.sex,
                  photoUser : objectInscription.photoUser,
                  dateNaissance : objectInscription.dateNaissance,
                  date_created: objectInscription.date_created,
                  date_update: objectInscription.date_update
         };

       }

    return this.http.post(url, params);


  }

  public updateProfilUser(objectUpdate){

    let url = '';

    let params = {};

    if (objectUpdate.typeCompte === '1'){

        url = this.apiUrlCloud + '/administrator/' + objectUpdate.id;

        params = {
                 id : objectUpdate.id,
                 nom : objectUpdate.nom,
                 prenom : objectUpdate.prenom,
                 login : objectUpdate.login,
                 password : objectUpdate.password,
                 sex : objectUpdate.sex,
                 photoUser : objectUpdate.photoUser,
                 dateNaissance : objectUpdate.dateNaissance,
                 date_created: objectUpdate.date_created,
                 date_update: objectUpdate.date_update

     };

    }
    if (objectUpdate.typeCompte === '2'){

        url = this.apiUrlCloud + '/company_owner/' + objectUpdate.id;

        params = {
                id : objectUpdate.id,
                nom : objectUpdate.nom,
                prenom : objectUpdate.prenom,
                login : objectUpdate.login,
                password : objectUpdate.password,
                sex : objectUpdate.sex,
                photoUser : objectUpdate.photoUser,
                dateNaissance : objectUpdate.dateNaissance,
                date_created: objectUpdate.date_created,
                date_update: objectUpdate.date_update
         };

      }

    if (objectUpdate.typeCompte === '3'){

        url = this.apiUrlCloud + '/investor/' + objectUpdate.id;

        params = {
                  id : objectUpdate.id,
                  nom : objectUpdate.nom,
                  prenom : objectUpdate.prenom,
                  login : objectUpdate.login,
                  password : objectUpdate.password,
                  sex : objectUpdate.sex,
                  photoUser : objectUpdate.photoUser,
                  dateNaissance : objectUpdate.dateNaissance,
                  date_created: objectUpdate.date_created,
                  date_update: objectUpdate.date_update
         };

       }

    return this.http.put(url, params);


  }


}
