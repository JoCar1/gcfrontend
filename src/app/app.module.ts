import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { RestangularModule, Restangular } from 'ngx-restangular';
import { NgxRestangularService } from './service/ngx-restangular.service';
import { AuthService } from './service/auth.service';
import { TokenStorageService } from './service/token-storage.service';

import { NgxSpinnerModule } from "ngx-spinner";


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { LayoutModule } from '@angular/cdk/layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { EventoComponent } from './components/evento/evento.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormusuarioComponent } from './components/forms/formusuario/formusuario.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    ContratoComponent,
    EventoComponent,
    UsuariosComponent,
    FormusuarioComponent
  ],
  entryComponents: [
    FormusuarioComponent
  ],
  imports: [
    RestangularModule.forRoot([AuthService], NgxRestangularService),
    NgxSpinnerModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
  ],
  providers: [
    AuthService,
    TokenStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
