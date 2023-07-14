import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Iuorganizativa } from '../../../models/interfaces';
import { Restangular } from "ngx-restangular";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';
@Component({
  selector: 'app-formorganizativa',
  templateUrl: './formorganizativa.component.html',
  styleUrls: ['./formorganizativa.component.scss']
})
export class FormorganizativaComponent implements OnInit {
  action: string;
  uorganizativa: Iuorganizativa;
  dataForm: FormGroup;
  dialogTitle: string;
  hide = true;
  ngx:Restangular;
  constructor(
    public matDialogRef: MatDialogRef<FormorganizativaComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    public restangular: Restangular,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar
  )
  {
    this.ngx = this.restangular.all('uorganizativa');
    console.log(_data);
    // Set the defaults
    this.action = _data.accion;
    this.uorganizativa  = _data.data;
    console.log(this.uorganizativa);
    
    if ( this.action === 'edit' )
    {
        this.dialogTitle = 'Editar Unidad Organizativa';
        // this.socio = _data.data;
    }
    else
    {
        this.dialogTitle = 'Agregar Unidad Organizativa';
        // this. = new Contact({});
    }

    this.dataForm = this.createForm();
  }

  ngOnInit() {
    
  }
  createForm(): FormGroup
  {
      return this._formBuilder.group({
          id      : [this.uorganizativa.id],
          nombre    : [this.uorganizativa.nombre]
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
