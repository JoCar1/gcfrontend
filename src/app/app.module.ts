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
import { FlexLayoutModule } from '@angular/flex-layout';

import { LayoutModule } from '@angular/cdk/layout';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { EventoComponent } from './components/evento/evento.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { FormusuarioComponent } from './components/forms/formusuario/formusuario.component';
import { ContratoComponent as FormcontratoComponent } from './components/forms/contrato/contrato.component';
import { FormsocioComponent } from './components/forms/formsocio/formsocio.component';
import { FormcategoriaComponent } from './components/forms/formcategoria/formcategoria.component';
import { FormorganizativaComponent } from './components/forms/formorganizativa/formorganizativa.component';
import { FormeventoComponent } from './components/forms/formevento/formevento.component';
import { SociosComponent } from './components/socios/socios.component';
import { ConfirmacionComponent } from './modals/confirmacion/confirmacion.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProveedorContratosComponent } from './components/proveedor-contratos/proveedor-contratos.component';
import { ContratoverComponent } from './components/contratover/contratover.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { OrdenverComponent } from './components/ordenver/ordenver.component';
import { SupplierComponent } from './components/supplier/supplier.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSlideToggleModule } from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    LoginComponent,
    ContratoComponent,
    EventoComponent,
    UsuariosComponent,
    FormusuarioComponent,
    FormcontratoComponent,
    FormsocioComponent,
    FormcategoriaComponent,
    FormorganizativaComponent,
    FormeventoComponent,
    SociosComponent,
    ConfirmacionComponent,
    PageNotFoundComponent,
    ProveedorContratosComponent,
    ContratoverComponent,
    OrdenverComponent,
    SupplierComponent
    
  ],
  entryComponents: [
    FormusuarioComponent,
    FormcontratoComponent,
    FormsocioComponent,
    FormcategoriaComponent,
    FormorganizativaComponent,
    FormeventoComponent,
    ConfirmacionComponent
  ],
  imports: [
    RestangularModule.forRoot([AuthService], NgxRestangularService),
    NgxSpinnerModule,
    MatSlideToggleModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    LayoutModule,
    MaterialModule,
    FlexLayoutModule,
    MatChipsModule,
    MatAutocompleteModule,
    MatInputModule,
    NoopAnimationsModule,
  ],
  providers: [
    AuthService,
    TokenStorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
