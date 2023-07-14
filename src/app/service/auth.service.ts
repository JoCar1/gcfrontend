import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Iusuario, AccessData, ILogin } from '../models/interfaces';
import { Observable } from 'rxjs';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpEventType } from '@angular/common/http';
import { TokenStorageService } from './token-storage.service';

import * as _ from "lodash";

import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRoot: string = "http://127.0.0.1:8000/api";
  // private apiRoot: string = "http://contratosmanaco/api";
  // private apiRoot: string = "http://10.0.8.5:8000/api";
  // private apiRoot: string = "/api";
  // private user: User;
  usuario$: Observable<Iusuario>;

  constructor(public snackBar: MatSnackBar, private http: HttpClient, private router:Router, private tokenStorage: TokenStorageService) {
    // afAuth.authState.subscribe(user => {
    //   this.user = user;
    // });
    this.getAccessTokenn();
  }
  headerDefault(): any {
    let bearerToken;
    this.getAccessTokenn().subscribe((data) =>{
      bearerToken =  data;
    });
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json',
        'Authorization': `Bearer ${bearerToken}`
      })
    };
    return httpOptions;
  }

  isRreshToken(): Observable<boolean> {
    return this.tokenStorage
      .getRefreshToken()
      .pipe(
        map(token => !!token)
      );
  }
  isAccessToken(): Observable<boolean> {
    return this.tokenStorage
      .getAccessToken()
      .pipe(
        map(token => !!token)
      );
  }
  getAccessTokenn(): Observable <string> {
    this.isAccessToken().subscribe((da) => {
       if(!da) {
            this.tokenStorage.setAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjFmMzY0YWRiNDIxYmIyMmI1MmVjYTdkYmIzOWEwZWYzMzZiMjFiOGFmNjFlZmE3YzRmZTcyMzc3NTE1Y2Q5MDYzM2E0YTc1NWIwOTA3YjJlIn0.eyJhdWQiOiIxIiwianRpIjoiMWYzNjRhZGI0MjFiYjIyYjUyZWNhN2RiYjM5YTBlZjMzNmIyMWI4YWY2MWVmYTdjNGZlNzIzNzc1MTVjZDkwNjMzYTRhNzU1YjA5MDdiMmUiLCJpYXQiOjE1Njk2OTc5NDIsIm5iZiI6MTU2OTY5Nzk0MiwiZXhwIjoxNTg1NDIyNzQyLCJzdWIiOiIxIiwic2NvcGVzIjpbImFwaXdlYiJdfQ.JYhrKCQ0hdrBBHEqBFj29LNsW3jlgxFRydnsevTa3RZKJKIVtCVRJq6Seab0DBITilSSdELJd4HaJmu3WNrRXD87HUp-yaSbto24Mmuy04nLtQAbp50RXTYurlliMN3NRnudUgAROGzRUzRs4dgsDyVq1zOOZb6Zokp2E89GcA0wtV6tsjwKgM_o2xhmb5JNarJUAsA0VxMP_0hw8dWv0LjEYL7bLI7wJlkPjU4cwc3u2AUKRjtC_6hS4WFCuYmTsInP8IVBr3LcsP8uis6-b0zIdSC5fDCVV6g7rt6JB6k11wGsO2cPjTmwbTVTHwVNwvYNKlECfGIL8Sx31Hjf4I_ro3QcHEouTnaYA1L1VJA1vcn9Sq2ju9bP-WMdJC1cWUkRcleCRMh-EMKyKdIL0o96HReTeN4VRU_mNg9YmIzymaUFiHq3AY3hxrKKKQcIQ_bbUOAGntjZ8oZSrpoPztwO9soMcIHNO_6woZZ6og3RyLyZGzsYqHhB_ZNKG8xVXcMp6nYXDZPBR-GmcTKFhGmJmId1TAA0IM7e-DrzdymVeGg7DZl-jpFLeewF3YeJUL12b2yyKkNM7JrZCVfX2C3ixvqMuAzPWz526ycqYZ-cP5IXF41XOOgX0q6vOEjqjqUZ7LaDli1yYylWSpPUoG_gvRlmyddRZaHmDaKL2kI');
        }
    });
    return this.tokenStorage.getAccessToken();
  }
  refreshToken(): Observable<AccessData>{
    const url = `${this.apiRoot}/refresh`;
     return this.tokenStorage
    .getRefreshToken()
    .pipe(
      switchMap((refreshToken: string) =>
        // this.http.post(`http://127.0.0.1:8000/api/refresh`, { refreshToken })
        this.http.post(url, {refresh_token: refreshToken,rol:this.tokenStorage.getPayload().scopes[0]}, this.headerDefault())
      ),
      tap((tokens: any) => this.saveAccessData(tokens)),
      catchError((err) => {
        this.logout();
        return Observable.throw(err);
      })
    );
  }

  salir(){
    // console.log("salir");
    localStorage.removeItem('notificacions');
    this.tokenStorage.clear();
    this.getAccessTokenn();
    this.router.navigate(['/']);
    // location.reload(true);
  }

  login(data:ILogin): Observable<any>{
    const url = `${this.apiRoot}/login`;
    const da = { 
      username: data.username,
      password: data.password
      // provider: 'adm'
    };
    return this.http.post(url, da, this.headerDefault())
    .pipe(
      tap((tokens: any) => {
        this.saveAccessData(tokens);
        this.router.navigate(['/eventos']);//inicio
      }),
      catchError((err) => {
        this.salir();
        return Observable.throw(err);
      })
    // .do(() => {
    //   this.router.navigate(['/']);
    // });
        // .map(res => res.json())
        // .do((tokens) => this.saveAccessData(tokens))
        // .do(this.saveAccessData.bind(this));
        // .map((res) => _.values(res));
    );
  }
  logout(): Observable<any>{
    const url = `${this.apiRoot}/logout`;
    return this.http.post(url, {}, this.headerDefault())
    // .map(response => response.json())
    .pipe(
      tap((tokens: any) => {
      this.salir();
      }),
      catchError((err) => {
        this.salir();
        return Observable.throw(err);
      })
    );
  }

  saveAccessData({ access_token, refresh_token }: AccessData) {
    this.tokenStorage
      .setAccessToken(access_token)
      .setRefreshToken(refresh_token);
  }

  isAuthenticated(user): boolean {
    let data = false;
      this.isAccessToken().subscribe((da)=>{
          if(da) {
            for (var i = 0; i < user.length; ++i) {
              if(this.tokenStorage.getPayload().scopes[0] == user[i]) {
                data = true;
              }
            }
          } else {
            this.salir();
          }
      });
    return data;
  }
  returnidusu(){    
    return this.tokenStorage.getPayload().sub;
  }

  errorstatus(content,error){
    let mensaje = '';
    for(let a in content) {
      mensaje += content[a][0];
    }
    // console.log(mensaje);
    this.snackBar.open(mensaje, ':-(', {
      duration: 3000,
    });
    return mensaje;
  }

  format(date: Date): string {
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return `${year}-${month}-${day}`;
  }


}
