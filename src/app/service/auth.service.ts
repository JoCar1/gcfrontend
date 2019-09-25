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
  // private apiRoot: string = "http://192.168.1.35:8000/api";
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
            this.tokenStorage.setAccessToken('eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiIsImp0aSI6IjI4MWE2MGUwYjU4ZDE1NjI0ODNmNmYyZmEyNzRhY2FjYTNmNDNlYmUwNTdmMDQ4M2Y2NmM0MWZiNGFiMTY0OWZhYmNmOGVjMzg4YTQ4YTFkIn0.eyJhdWQiOiIxIiwianRpIjoiMjgxYTYwZTBiNThkMTU2MjQ4M2Y2ZjJmYTI3NGFjYWNhM2Y0M2ViZTA1N2YwNDgzZjY2YzQxZmI0YWIxNjQ5ZmFiY2Y4ZWMzODhhNDhhMWQiLCJpYXQiOjE1NjkzMzYwNDUsIm5iZiI6MTU2OTMzNjA0NSwiZXhwIjo0NzI1MDA5NjQ1LCJzdWIiOiIxIiwic2NvcGVzIjpbImFwaXdlYiJdfQ.h3a9802L_-6YPu_U7tebC4-_eN49iJlpMM8AdzHFsamkWaxPZBvkkrpZ7GWSNaRJXQLJlblBifHzLmsGxBuggQqEk_CP2USB8aRq6wzoyHJcGzgAqQIwp3EpLJuxxqy2D9hcnhp-xcX9C6Ih7SaRbtY_z2SKzQX10FM3YisufP1ZfQpJGiJtf3Kk63rvSI9q0rm0FdGyhqs3IkCOmvD8G6_X9-w3h8cR-yLHwfzdvBCtyDmrbzcY0VvdU3meBfRoBVQo3GL9RkvN-7cB9l3tSvxcobl5Nnm7FhFRvU2DqrcSxKM6R-kgDMridFi6IkewOUH0VoQ1uqTepweuyAKmqtjKbfQah5rOxYMNp7CqiIMM_btDLpw2V-E6G-mMPraBuODaQATvwMokA-N6fsexweyJr_fSc2km9aUHVeQa_w0pVSYfeWkosbws462SY2WhxJce9VGLuDPrGPhWh0bm1I-9e5lRONAmS95BJDmvNCCBzL49fS_qgeFXqly_ZkegipVbVFMymmK1s7r_vo2MzFYo8T0Lb9C_0QQkuCEfmjUkgBwbU1iy2icnZ8ysBk_Pw1EfLpYq6a7zI2rUJPg6LGR1ik0RbzBd2AyOA6orJOliX3Y-_nA5mKERAqFenyo8czRvusHsmYkPBfc827iWJFB2yuMOIwVq1OuOFMQfXFU');
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
    this.tokenStorage.clear();
    this.getAccessTokenn();
    this.router.navigate(['/login']);
    // location.reload(true);
  }

  login(data:ILogin): Observable<any>{
    const url = `${this.apiRoot}/login`;
    const da = { 
      usuario: data.usuario,
      password: data.password,
      provider: 'adm'
    };
    return this.http.post(url, da, this.headerDefault())
    .pipe(
      tap((tokens: any) => {
        this.saveAccessData(tokens);
        this.router.navigate(['/']);
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
