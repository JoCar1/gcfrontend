import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Iproveedor } from '../../../models/interfaces';
import { Restangular } from "ngx-restangular";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-formsocio',
  templateUrl: './formsocio.component.html',
  styleUrls: ['./formsocio.component.scss']
})
export class FormsocioComponent implements OnInit {
  action: string;
  socio: Iproveedor;
  dataForm: FormGroup;
  dialogTitle: string;
  hide = true;
  ngx:Restangular;
  constructor(
    public matDialogRef: MatDialogRef<FormsocioComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    public restangular: Restangular,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar
  )
  {
    this.ngx = this.restangular.all('proveedoresc');
    console.log(_data);
    // Set the defaults
    this.action = _data.accion;
    this.socio = _data.data;
    console.log(this.socio);
    
    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Editar proveedor';
        this.socio = _data.data;
    }
    else
    {
        this.dialogTitle = 'Agregar proveedor';
        // this. = new Contact({});
    }

    this.dataForm = this.createContactForm();
  }

  ngOnInit() {
    
  }
  convertirAMayusculas(controlName: string) {
    const control = this.dataForm.get(controlName);
    if (control.value) {
      const valorIngresado = control.value.toUpperCase();
      control.setValue(valorIngresado);
    }
  }
  createContactForm(): FormGroup
  {
      return this._formBuilder.group({
          codigo      : [this.socio.codigo],
          nit   : [this.socio.nit],
          nombre    : [this.socio.nombre],
          telefono: [this.socio.telefono],
          fax  : [this.socio.fax],
          celular   : [this.socio.celular],
          direccion  : [this.socio.direccion],
          servicio: [this.socio.servicio],
          sistema : [this.socio.sistema]          
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
  

}
