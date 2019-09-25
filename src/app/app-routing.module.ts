import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard, AuthGuardAd, AuthGuardEt, AuthGuardVi } from './core/auth.guard';
import { InicioComponent } from './components/inicio/inicio.component';
import { LoginComponent } from './components/login/login.component';
import { ContratoComponent } from './components/contrato/contrato.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';

export const CLIENT_ROUTER_PROVIDERS = [
  AuthGuard,
  AuthGuardAd,
  AuthGuardEt,
  AuthGuardVi
];


const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    pathMatch: 'full'
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
    canActivate: [AuthGuard]
  },
  // {
  //   path: '404',
  //   component: PageNotFoundComponent
  // },
  // { path: '**',
  //   redirectTo: '/404'
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    CLIENT_ROUTER_PROVIDERS
  ]
})
export class AppRoutingModule { }
