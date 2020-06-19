import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class apiHttpJsonService {

  private apiURL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }


   public identificationUser(objectConnection){

    let url = '';

    if(objectConnection.typeCompteLogin === '1'){

        url = this.apiURL + '/administrator?login=' + objectConnection.emailLogin + '&password=' + objectConnection.passwordLogin;

    }

    if(objectConnection.typeCompteLogin === '2'){

        url = this.apiURL + '/company_owner?login=' + objectConnection.emailLogin + '&password=' + objectConnection.passwordLogin;

    }

    if(objectConnection.typeCompteLogin === '3'){

        url = this.apiURL + '/investor?login=' + objectConnection.emailLogin + '&password=' + objectConnection.passwordLogin;

    }

    return this.http.get(url);


  }






}
