import { Component, OnInit, Inject, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Restangular } from "ngx-restangular";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar, MatChipInputEvent } from '@angular/material';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

@Component({
  selector: 'app-formevento',
  templateUrl: './formevento.component.html',
  styleUrls: ['./formevento.component.scss']
})
export class FormeventoComponent implements OnInit {
  action: string;
  // evento: Ievento;
  dataForm: FormGroup;
  dialogTitle: string;
  hide = true;
  correos:any = [];
  contratos:any = [];
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  ngx:Restangular;
  constructor(
    public matDialogRef: MatDialogRef<FormeventoComponent>,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    public restangular: Restangular,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar
  )
  {
    this.ngx = this.restangular.all('evento');
    console.log(_data);
    // Set the defaults
    this.action = _data.accion;
    // this.evento = _data.data;
    
    

    // console.log(this.evento);
    
    if ( this.action === 'edit' )
    {
        _data.data.emails.forEach(element => {
          this.correos.push(element.email);
        });
        this.dialogTitle = 'Editar Evento';
        // this.socio = _data.data;
    }
    else
    {
      // this.evento.envio_email = 'true';
      this.dialogTitle = 'Agregar Evento';
        // this. = new Contact({});
    }

    this.dataForm = this.createContactForm();
  }

  ngOnInit() {
    this.contratosall();
  }
  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    let regexp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
    // Add our fruit
    if ((value || '').trim()) {
      console.log(value.trim());
      
      if(regexp.test(value.trim())){
          this.correos.push(value.trim());
      }
      
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: any): void {
    const index = this.correos.indexOf(fruit);

    if (index >= 0) {
      this.correos.splice(index, 1);
    }
  }
  createContactForm(): FormGroup
  {
      return this._formBuilder.group({
          // id      : [this.evento.id],
          // nombre    : [this.evento.nombre],
          // descripcion: [this.evento.descripcion],
          // fecha_evento  : [this.evento.fecha_evento],
          // fecha_recordatorio  : [this.evento.fecha_recordatorio],
          // notificacion: [this.evento.notificacion ? this.evento.notificacion: true],
          // frecuencia_notificacion : [this.evento.frecuencia_notificacion],
          // frecuencia_notificacion_cantidad: [this.evento.frecuencia_notificacion_cantidad],
          // envio_email   : [this.evento.envio_email ? this.evento.envio_email: true ],
          // frecuencia_email   : [this.evento.frecuencia_email],
          // frecuencia_email_cantidad   : [this.evento.frecuencia_email_cantidad],
          // contrato_id   : [this.evento.contrato_id]
      });
  }

  guardar(){
    // this.matDialogRef.close();
    this.spinner.show();
    let emails='';
    this.correos.forEach((item, index) => {
      if(index+1 != this.correos.length){
        emails += item+" ";
      }else{
        emails += item;
      }
    });
    let data = this.dataForm.value;
    if(data.envio_email == true){
      data.envio_email = 'si';
    }else{
      data.envio_email = 'no';
    }
    if(data.notificacion == true){
      data.notificacion = 'si';
    }else{
      data.notificacion = 'no';
    }
    data.correos = emails;
    console.log(data);
    switch (this.action) {
      case "add":
          this.ngx.post(data).subscribe(
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
        this.ngx.customPUT(data,data.id).subscribe(
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
  contratosall(){
    return new Promise(resolve => {
      this.restangular.one('contratosall').get('').subscribe(
      (data) => {
        // this.cancelar();
        console.log(data);
        this.contratos = data.data;
        resolve(true);
      },
      ()=>{
        resolve(true);
        console.log("error");
      });
    });
  }
}
