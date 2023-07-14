import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardAd, AuthGuardEt, AuthGuardVi, AuthApiWeb } from './core/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { SociosComponent } from './components/socios/socios.component';
import { EventoComponent } from './components/evento/evento.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { ProveedorContratosComponent } from './components/proveedor-contratos/proveedor-contratos.component';
import { ContratoverComponent } from './components/contratover/contratover.component';
import { OrdenverComponent } from './components/ordenver/ordenver.component';
import { SupplierComponent } from './components/supplier/supplier.component';
export const CLIENT_ROUTER_PROVIDERS = [
  AuthGuard,
  AuthGuardAd,
  AuthGuardEt,
  AuthGuardVi,
  AuthApiWeb
];


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full',
    canActivate: [AuthApiWeb]
  },
  {
    path: 'inicio',
    component: InicioComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contrato',
    component: ContratoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'usuarios',
    component: UsuariosComponent,
    canActivate: [AuthGuardAd]
  },
  {
    path: 'socios',
    component: SociosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'eventos',
    component: EventoComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'proveedorcontratos/:sistema/:idProveedor',
    component: ProveedorContratosComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contratover/:codigo_oc',
    component: ContratoverComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'contratover',
    component: ContratoverComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'ordenver/:codigo_oc',
    component: OrdenverComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'supplier',
    component: SupplierComponent,
    canActivate: [AuthGuard]
  },
  {
    path: '404',
    component: PageNotFoundComponent
  },
  { path: '**',
    redirectTo: '/404'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule],
  providers: [
    CLIENT_ROUTER_PROVIDERS
  ]
})
export class AppRoutingModule { }
