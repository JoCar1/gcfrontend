import { Component, OnInit, Inject, ViewEncapsulation, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { Icontrato, Isocio } from '../../../models/interfaces';
import { Restangular } from "ngx-restangular";
import { NgxSpinnerService } from "ngx-spinner";
import { MatSnackBar } from '@angular/material';
import { FormsocioComponent } from '../formsocio/formsocio.component';
import { FormcategoriaComponent } from '../formcategoria/formcategoria.component';
import { FormorganizativaComponent } from '../formorganizativa/formorganizativa.component';
import { ConfirmacionComponent } from '../../../modals/confirmacion/confirmacion.component';
import {COMMA, ENTER} from '@angular/cdk/keycodes';

import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { promise } from 'protractor';

@Component({
  selector: 'app-contrato',
  templateUrl: './contrato.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratoComponent implements OnInit {

  // filteredOptions: Observable<string[]>;

  date = new Date();

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];



  @ViewChild('fileInput',{static:true}) myInputVariable: any;

  archivos:any = [];
  archivosDB:any = [];

  action: string;
  contrato: any;
  dataForm: FormGroup;
  dialogTitle: string;
  socios:any = [];
  socio:Isocio;
  categorias:any = [];
  categoria:any;
  contratos:any = [];
  uorganizativas:any = [];
  uorganizativa:any;
  usuarios:any = [];
  ngx:Restangular;
  constructor(
    public matDialogRef: MatDialogRef<ContratoComponent>,
    public dialog: MatDialog,
    @Inject(MAT_DIALOG_DATA) private _data: any,
    private _formBuilder: FormBuilder,
    public restangular: Restangular,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar
  ){
    console.log(_data);
     this.ngx = this.restangular.all('contrato');
    // Set the default   
  }
  
  ngOnInit() {
    console.log('Cargando combos');
    this.sociosall().then(()=>{
      // this.selectsocio(this.contrato.socio_id)
    })
    this.categoriasall().then(()=>{
      
    });
    this.contratosall().then(()=>{

    });
    this.uorganizativasall().then(()=>{

    });

    this.usuariosall().then(()=>{

    });
    this.action = this._data.action;
    console.log('Cargando datos');
    console.log( this._data.data);
    this.contrato = this._data.data;
    if ( this.action === 'edit' )
    {
      this.archivosDB = this._data.data.archivos;
      this.socio = this._data.data.socio;
      console.log(this.archivosDB);
      this.dialogTitle = 'Editar Contrato';
      this.dataForm = this.createContratoFormEdit();
    }
    else
    {
        this.dialogTitle = 'Nuevo Contrato';
        // this.contact = new Contact({});
        this.dataForm = this.createContratoForm();
    }    
  }
  // private _filter(value: string): string[] {
  //   const filterValue = value.toLowerCase();

  //   return this.socio.filter(option => option.nombre.toLowerCase().includes(filterValue));
  // }

  remove(file: any): void {
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px',
      data: {confirmacion: true,name: "Confirmar"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const index = this.archivos.indexOf(file);

        if (index >= 0) {
          this.archivos.splice(index, 1);
        } 
      }
    });
    
  }



  fileChangeListener($event) {
    if ($event.target.files.length){
      for (let index = 0; index < $event.target.files.length; index++) {
        var file:File = $event.target.files[index];
        this.archivos.push(file);
      }
      console.log(this.archivos);
    }

  }
  createContratoForm(): FormGroup
  {
      return this._formBuilder.group({
          id      : [this.contrato.id],
          socio_id    : [ this.contrato.socio_id ? this.contrato.socio_id:'' ],
          categoria_id: [this.contrato.categoria_id ? this.contrato.categoria_id:''],
          contrato_id  : [this.contrato.categoria_id ? this.contrato.categoria_id:''],
          nombre: [this.contrato.nombre],
          estado : [this.contrato.estado],
          telefono: [this.contrato.telefono],
          descripcion   : [this.contrato.descripcion],
          fecha_inicio   : [this.contrato.fecha_inicio?this.contrato.fecha_inicio:''],
          fecha_plazo_cancelacion : [this.contrato.fecha_plazo_cancelacion?this.contrato.fecha_plazo_cancelacion:''],
          fecha_fin: [this.contrato.fecha_fin?this.contrato.fecha_fin:''],
          fecha_prolongacion   : [this.contrato.fecha_prolongacion?this.contrato.fecha_prolongacion:''],
          responsable_contrato_user_id   : [this.contrato.responsable_contrato_user_id ? this.contrato.responsable_contrato_user_id:''],
          organizativa_unidad_id   : [this.contrato.organizativa_unidad_id ? this.contrato.organizativa_unidad_id:''],
          contacto_adicional   : [this.contrato.contacto_adicional],
      });
  }


  createContratoFormEdit(): FormGroup
  {
    console.log(this.contrato);
      return this._formBuilder.group({
          id      : [this.contrato.id],
          socio_id    : [ this.contrato.socio.id],
          categoria_id: [this.contrato.categoria.id],
          contrato_id  : [ parseInt(this.contrato.contrato_id)],
          nombre: [this.contrato.nombre],
          estado : [this.contrato.estado],
          telefono: [this.contrato.telefono],
          descripcion   : [this.contrato.descripcion],
          fecha_inicio   : [this.contrato.fecha_inicio?this.contrato.fecha_inicio:''],
          fecha_plazo_cancelacion : [this.contrato.fecha_plazo_cancelacion?this.contrato.fecha_plazo_cancelacion:''],
          fecha_fin: [this.contrato.fecha_fin?this.contrato.fecha_fin:''],
          fecha_prolongacion   : [this.contrato.fecha_prolongacion?this.contrato.fecha_prolongacion:''],
          responsable_contrato_user_id   : [this.contrato.responsable.id],
          organizativa_unidad_id   : [this.contrato.organizativaunidad.id],
          contacto_adicional   : [this.contrato.contacto_adicional],
      });
  }

  selectsocio(id){
    console.log(id);
    this.socios.forEach(element => {
      if(element.id == id){
        this.socio = element;
      }
    });
  }
  openSocio(accion): void {
    let data;
    if(accion == 'edit'){
      data = this.socio;
    }else{
      data = '';
    }
    
    const dialogRef = this.dialog.open(FormsocioComponent, {
      width: '550px',
      data: {accion: accion, data: data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.sociosall();
    });
  }
  selectcategoria(id){
    console.log(id);
    this.categorias.forEach(element => {
      if(element.id == id){
        this.categoria = element;
      }
    });
  }
  openCategoria(accion): void {
    let data = '';
    if(accion == 'edit'){
      data = this.categoria;
    }
    
    const dialogRef = this.dialog.open(FormcategoriaComponent, {
      width: '550px',
      data: {accion: accion, data: data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.categoriasall();
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
  openUorganizativa(accion): void {
    let data = '';
    if(accion == 'edit'){
      data = this.uorganizativa;
    }
    
    const dialogRef = this.dialog.open(FormorganizativaComponent, {
      width: '550px',
      data: {accion: accion, data: data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.uorganizativasall();
    });
  }

  guardar(){
    // this.dataForm.patchValue({
    //   socio_id:this.socio.nombre
    // })
    let data = this.dataForm.value;
    console.log('Guardando');
    // data.socio_id = this.socio.id;
    console.log(data);
    this.spinner.show();
    switch (this.action) {
      case "add":
          this.ngx.post(data).subscribe(
            (response) => {
            console.log('Guardado, agregado');
            console.log(response);
            this.guardarImgs(response.id.id);
            this.spinner.hide();
            // this.cancelar();
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
            console.log('Guardado, edición');
            console.log(response);
            this.guardarImgs(response.id);
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
  archivosrm(item){
    const dialogRef = this.dialog.open(ConfirmacionComponent, {
      width: '250px',
      data: {confirmacion: true,name: "Confirmar"}
    });
    dialogRef.afterClosed().subscribe(result => {
      if(result){
        const index = this.archivosDB.indexOf(item);
        this.spinner.show();
        this.restangular.all('archivo').customDELETE(item.id).subscribe(
          (response) => {
          console.log(response);
          this.spinner.hide();
          if (index >= 0) {
            this.archivosDB.splice(index, 1);
          } 
          this.snackBar.open(response.mensaje, 'Exito', {
            duration: 3000,
          });
        },
        ()=>{
          this.spinner.hide();
        });
      }
    });
      
  }
  guardarImgs(id){
    console.log('archivos',this.archivos);
    this.archivos.forEach(element => {
      let datos = new FormData();  
      datos.append('contrato_id',id);
      datos.append('file',element);
      // this.spinner.show();
      this.restangular.all('archivo').post(datos,undefined, undefined,{'Conten-type':undefined}).subscribe(
        (response) => {
        console.log(response);
        // this.spinner.hide();
        // this.snackBar.open(response.mensaje, 'Exito', {
        //   duration: 3000,
        // });
      },
      ()=>{
        // this.spinner.hide();
      });  
    });
    
  }

  sociosall(){
    return new Promise(resolve => {
      this.restangular.one('sociosall').get('').subscribe(
      (data) => {
        // this.cancelar();
        console.log(data);
        this.socios = data.data;
        resolve(true);
      },
      ()=>{
        resolve(true);
        console.log("error");
      });
    });
  }
  categoriasall(){
    return new Promise(resolve => {
      this.restangular.one('categoriasall').get('').subscribe(
      (data) => {
        // this.cancelar();
        console.log(data);
        this.categorias = data.data;
        resolve(true);
      },
      ()=>{
        resolve(true);
        console.log("error");
      });
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

  uorganizativasall(){
    return new Promise(resolve => {
      this.restangular.one('uorganizativasall').get('').subscribe(
      (data) => {
        // this.cancelar();
        console.log(data);
        this.uorganizativas = data.data;
        resolve(true);
      },
      ()=>{
        resolve(true);
        console.log("error");
      });
    });
  }

  usuariosall(){
    return new Promise(resolve => {
      this.restangular.one('usuariosall').get('').subscribe(
      (data) => {
        // this.cancelar();
        console.log(data);
        this.usuarios = data.data;
        resolve(true);
      },
      ()=>{
        resolve(true);
        console.log("error");
      });
    });
  }
}
