import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState ,MediaMatcher} from '@angular/cdk/layout';
import { MatSnackBar, MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ContratoComponent } from './components/forms/contrato/contrato.component';
import { FormeventoComponent } from './components/forms/formevento/formevento.component';
import { Icontrato } from './models/interfaces';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  notificacions:any = [];
  title = 'GestionContratos';  
  contrato: any;
  // Icontrato = {
  //   id: 0,
  //   socio_id: 0,
  //   // user_id: number;
  //   categoria_id: 0,
  //   contrato_id: 0,
  //   nombre: '',
  //   estado: '',
  //   telefono: '',
  //   descripcion: '',
  //   fecha_inicio: '',
  //   fecha_plazo_cancelacion: '',
  //   fecha_fin: '',
  //   fecha_prolongacion: '',
  //   responsable_contrato_user_id: 0,
  //   organizativa_unidad_id: 0,
  //   contacto_adicional: ''
  // };
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.HandsetPortrait])
  .pipe(
    map(result => result.matches)
  );
  constructor(public dialog: MatDialog,public auth:AuthService,public snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver) {  
    
    
  }

  logout() {
    this.auth.logout().subscribe(
      (dat) => {
        this.snackBar.open('Se ha deslogueado correctamente', 'Exito', {
          duration: 3000,
        });
      },
      (error: HttpErrorResponse) => {
      }
    );
  }	
  
  addContrato(accion){
    const dialogRef = this.dialog.open(ContratoComponent, {
      width: '550px',
      data: {action: accion, data: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }
  addEvento(accion){
    const dialogRef = this.dialog.open(FormeventoComponent, {
      width: '550px',
      data: {accion: accion, data: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
    });
  }

  notificacionfun(){
    let contador = 0;
    // this.notificacions.forEach(element => {
    //   if()
    // });
    
    if(localStorage.getItem('notificacions')){
      this.notificacions = JSON.parse(localStorage.getItem('notificacions'));
      contador = this.notificacions.length;
    }
    return contador;
  }
}
