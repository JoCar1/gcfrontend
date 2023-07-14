import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Iusuario } from '../../../models/interfaces';
import { Restangular } from "ngx-restangular";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';
import { FormorganizativaComponent } from '../formorganizativa/formorganizativa.component';

@Component({
  selector: 'app-formusuario',
  templateUrl: './formusuario.component.html',
  styleUrls: ['./formusuario.component.scss']
})
export class FormusuarioComponent implements OnInit {
  action: string;
  usuario: Iusuario;
  dataForm: FormGroup;
  dialogTitle: string;
  hide = true;
  uorganizativa:any;
  ngx:Restangular;
  uorganizativas:any =[];
  constructor(
    public dialog: MatDialog,
    public matDialogRef: MatDialogRef<FormusuarioComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    public restangular: Restangular,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar
  )
  {
    this.ngx = this.restangular.all('usuarios');
    console.log(_data);
    
    // Set the defaults
    this.action = _data.accion;
    this.usuario = _data.data;
    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Editar Usuario';
        // this.usuario = _data.data;
    }
    else
    {
        this.dialogTitle = 'Nuevo Usuario';
        // this. = new Contact({});
    }

    this.dataForm = this.createContactForm();
  }

  ngOnInit() {
    // this.uorganizativasall();
  }

  // uorganizativasall(){
  //   return new Promise(resolve => {
  //     this.restangular.one('uorganizativasall').get('').subscribe(
  //     (data) => {
  //       // this.cancelar();
  //       console.log(data);
  //       this.uorganizativas = data.data;
  //       resolve(true);
  //     },
  //     ()=>{
  //       resolve(true);
  //       console.log("error");
  //     });
  //   });
  // }
  createContactForm(): FormGroup
  {
      return this._formBuilder.group({
          id      : [this.usuario.id],
          nombre    : [this.usuario.nombre],
          email: [this.usuario.email],
          password  : [this.usuario.password],
          telefono: [this.usuario.telefono],
          celular : [this.usuario.celular],
          username: [this.usuario.username],
          rol   : [this.usuario.rol]
          // organizativa_unidad_id: [this.usuario.organizativa_unidad_id]
      });
  }

  guardar(){
    // this.matDialogRef.close();
    this.spinner.show();
    const data1 = this.dataForm.value;
    // console.log(data1);
    switch (this.action) {
      case "add":
          this.ngx.post(data1).subscribe(
          (response) => {
            console.log(response);
            this.spinner.hide();
            this.cancelar();
            this.snackBar.open(response.mensaje, 'Exito', {
              duration: 3000,
            });
          },
          ()=>{
            this.spinner.hide();
          });
        break;
      case "edit":
        this.ngx.customPUT(data1,data1.id).subscribe(
          (response) => {
            console.log(response);
            this.spinner.hide();
            this.snackBar.open(response.mensaje, 'Exito', {
              duration: 3000,
            });
          },
          ()=>{
            this.spinner.hide();
          });
        break;
    }
  }
  cancelar(){
    this.dataForm.reset();
    this.dataForm.patchValue({
    	// descripcion: ''
    });
  }

  selectUorganizativa(id){
    console.log(id);
    this.uorganizativas.forEach(element => {
      if(element.id == id){
        this.uorganizativa = element;
      }
    });
  }
  // openUorganizativa(accion): void {
  //   let data = '';
  //   if(accion == 'edit'){
  //     data = this.uorganizativa;
  //   }
    
  //   const dialogRef = this.dialog.open(FormorganizativaComponent, {
  //     width: '550px',
  //     data: {accion: accion, data: data}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     this.uorganizativasall();
  //   });
  // }
}
