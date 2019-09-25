import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Iusuario } from '../../../models/interfaces';
import { Restangular } from "ngx-restangular";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';

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
  ngx:Restangular;
  constructor(
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

  }
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
            this.snackBar.open(response.mensaje, ':-)', {
              duration: 3000,
            });
          },
          ()=>{
            this.spinner.hide();
          });
        break;
      case "edit":
          // this.Idata.plan = data1.plan;
          // this.Idata.detalle = data1.detalle;
          // this.Idata.precio = data1.precio;
          // this.Idata.descuento = data1.descuento;
          // this.Idata.total = data1.total;
          // this.Idata.dias = data1.dias;
          // this.Idata.pais_id = data1.pais_id;
          // this.Idata.estado = data1.estado;
          // this.Idata.put().subscribe(
          // (response) => {
          //   this.cancelar();
          //   this.snackBar.open(response.mensaje, ':-)', {
          //     duration: 3000,
          //   });
          // },
          // ()=>{
          //   this.spinner.hide();
          // });
        break;
    }
  }
  cancelar(){
    this.dataForm.reset();
    this.dataForm.patchValue({
    	// descripcion: ''
    });
  }
}
