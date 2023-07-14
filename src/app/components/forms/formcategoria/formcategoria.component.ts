import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Icategoria } from '../../../models/interfaces';
import { Restangular } from "ngx-restangular";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';

@Component({
  selector: 'app-formcategoria',
  templateUrl: './formcategoria.component.html',
  styleUrls: ['./formcategoria.component.scss']
})
export class FormcategoriaComponent implements OnInit {
  action: string;
  categoria: Icategoria;
  dataForm: FormGroup;
  dialogTitle: string;
  hide = true;
  ngx:Restangular;
  constructor(
    public matDialogRef: MatDialogRef<FormcategoriaComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    public restangular: Restangular,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar
  )
  {
    this.ngx = this.restangular.all('categoria');
    console.log(_data);
    // Set the defaults
    this.action = _data.accion;
    this.categoria = _data.data;
    console.log(this.categoria);
    
    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Editar Categoria';
        // this.socio = _data.data;
    }
    else
    {
        this.dialogTitle = 'Agregar Categoria';
        // this. = new Contact({});
    }

    this.dataForm = this.createForm();
  }

  ngOnInit() {
    
  }
  createForm(): FormGroup
  {
      return this._formBuilder.group({
          id      : [this.categoria.id],
          nombre    : [this.categoria.nombre]
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
