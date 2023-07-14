import { animate, state, style, transition, trigger } from '@angular/animations';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatAutocomplete, MatAutocompleteSelectedEvent, MatChipInputEvent, MatDialog, MatPaginator, MatSnackBar, MatSort, MatTableDataSource } from '@angular/material';
import { ActivatedRoute } from '@angular/router';
import { Restangular } from 'ngx-restangular';
import { NgxSpinnerService } from 'ngx-spinner';
import { merge, fromEvent, BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { catchError, map, startWith, switchMap } from 'rxjs/operators';
import { Icontrato, Icuota, Irecordatorio, Iorden, Iresponsable, Iuser } from 'src/app/models/interfaces';
import { AuthService } from 'src/app/service/auth.service';
import { routerTransition } from 'src/app/service/router.animations';
import { format } from 'url';
import { HttpClient } from '@angular/common/http';
import { ConfirmacionComponent } from '../../modals/confirmacion/confirmacion.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATAE: Irecordatorio[] = [
  { asunto: 'Evento 1', fecha: '2023-06-01', recordatorio: 1 },
  { asunto: 'Evento 2', fecha: '2023-06-15', recordatorio: 2 },
  { asunto: 'Evento 3', fecha: '2023-07-01', recordatorio: 3 },
];
const ELEMENT_DATA: Iorden[] = [];
@Component({
  selector: 'app-ordenver',
  templateUrl: './ordenver.component.html',
  styleUrls: ['./ordenver.component.scss'],
  providers: [MatAutocomplete],
    animations: [
    routerTransition(),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class OrdenverComponent implements OnInit {

  dataSource = new MatTableDataSource<Irecordatorio>([]);
  displayedColumns: string[] = ['asunto', 'fecha', 'recordatorio', 'editar', 'eliminar'];


  selectedE: Irecordatorio = {
    asunto: '',
    fecha: '',
    recordatorio: 0,
  };
  isEditing = false;
  form: FormGroup;




  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  separatorKeysCodes: number[] = [13, 188];
  userCtrl = new FormControl();
  filteredUsers: Observable<Iuser[]>;
  allUsers: Iuser[];
  users: Iuser[];
  @ViewChild('userInput', { static: false }) userInput: ElementRef<HTMLInputElement>;
  @ViewChild('auto', { static: false }) matAutocomplete: MatAutocomplete;



  visible2 = true;
  selectable2 = true;
  removable2 = true;
  addOnBlur2 = true;
  separatorKeysCodes2: number[] = [13, 188];
  userCtrl2 = new FormControl();
  filteredUsers2: Observable<Iuser[]>;
  allUsers2: Iuser[];
  users2: Iuser[];
  @ViewChild('userInput2', { static: false }) userInput2: ElementRef<HTMLInputElement>;
  @ViewChild('auto2', { static: false }) matAutocomplete2: MatAutocomplete;
  responsable2: Iresponsable;


  archivos:any[] = [];
  archivosDB:any[] = [];


  departamentos: any = [];
  cuentas: any = [];
  subcuentas: any = [];
  categorias: any = [];
  marcas: any = [];
  responsables: Iresponsable[] = [];

  responsable: Iresponsable;
  departamento_s: any;
  cuenta_s: any;
  accsubtype: string = '';
  departamentoid: string = '';
  subcuenta_s: any;
  categoria_s: any;
  marca_s: any;
  contratoid: number;
  sistema:string='OC';
  dateinicio: any = '';
  datefin: any = '';
  pageEvent: any;
  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  // displayedColumns = ['numero', 'codigo', 'descr_tipo', 'nombre_proveedor','tipo','fecha'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  data: Iorden[] = [];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild('filter', { static: true }) filter: ElementRef;

  expandedElement: PeriodicElement | null;
  ngx: Restangular;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  orden: Iorden;
  contrato: Icontrato;


  dataFormOrden: FormGroup;
  dataFormContrato: FormGroup;
  idProveedor: string;
  codigo_oc: string;
  constructor(
    private fb: FormBuilder,
    private cdRef: ChangeDetectorRef,
    private http: HttpClient,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute,
    public auth: AuthService,
    private spinner: NgxSpinnerService,
    public snackBar: MatSnackBar,
    public restangularContrato: Restangular,
    public restangular: Restangular,
    public dialog: MatDialog) { 
      this.allUsers = [];
    this.users = [];
    this.allUsers2 = [];
    this.users2 = [];
    this.contratoid = 0;

    this.usersall2().then(() => {
      this.filteredUsers2 = this.userCtrl2.valueChanges.pipe(
        startWith(null),
        map((value: string | null) => value ? this._filter2(value) : this.allUsers2.slice())
      );
    });


    this.usersall().then(() => {
      this.filteredUsers = this.userCtrl.valueChanges.pipe(
        startWith(null),
        map((value: string | null) => value ? this._filter(value) : this.allUsers.slice())
      );
    });
    

    this.dataSourceC = [];
    this.cuotasForm = this.fb.group({
      cantidadCuotas: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.cuotaEditadaForm = this.fb.group({
      numero_cuota: ['', Validators.required],
      fecha_pago: ['', Validators.required],
      monto: ['', Validators.required]
    });

    this.dataFormOrden = new FormGroup({
      descr_tipo: new FormControl(),
      codigo: new FormControl(),
      fecha: new FormControl(),
      nit: new FormControl(),
      nombre_proveedor: new FormControl(),
      razon_orden: new FormControl(),
      total: new FormControl()
    });

    this.dataFormContrato = new FormGroup({
      id: new FormControl(),
      nit: new FormControl(),
      razon_social: new FormControl(),
      numero: new FormControl(),
      categoria_id: new FormControl(),
      descripcion: new FormControl(),
      departamento_id: new FormControl(),
      cuenta_id: new FormControl(),
      subcuenta_id: new FormControl(),
      tipo_gasto: new FormControl(),
      cadena: new FormControl(),
      campana: new FormControl(),
      pk_marca: new FormControl(),
      fecha_inicio: new FormControl(),
      fecha_fin: new FormControl(),
      factura_retencion: new FormControl()
    });
    }
  /* #region DATOS CUOTAS */
  cuotasForm: FormGroup;
  cuotaEditadaForm: FormGroup;
  dataSourceC: Icuota[];
  displayedColumnsC: string[] = ['numero_cuota', 'fecha_pago', 'monto', 'acciones'];
  cuotaSeleccionada: Icuota | null = null;
  cantidadCuotas: number;
  monto: number;

  generarCuotas() {
    const cantidadCuotas = this.cuotasForm.get('cantidadCuotas').value;
    const monto = this.cuotasForm.get('monto').value;
    const fechaInicial = this.cuotasForm.get('fechaInicial').value; // Obtener la fecha inicial del formulario
    this.dataSourceC = [];
  
    let fecha_pago = new Date(fechaInicial); // Utilizar la fecha inicial seleccionada
    const cuotaMonto = Math.floor(monto / cantidadCuotas);
    const montoRestante = monto - (cuotaMonto * cantidadCuotas);
  
    for (let i = 1; i <= cantidadCuotas; i++) {
      const cuota: Icuota = {
        numero_cuota: i.toString(),
        fecha_pago: fecha_pago.toISOString().substring(0, 10),
        monto: cuotaMonto,
        codigo_oc: this.orden.codigo
      };
  
      if (i === cantidadCuotas) {
        cuota.monto += montoRestante;
      }
      this.dataSourceC.push(cuota);
      fecha_pago.setMonth(fecha_pago.getMonth() + 1);
    }
  }
  editarCuota(cuota: Icuota) {
    this.cuotaSeleccionada = cuota;
    this.cuotaEditadaForm.patchValue({
      numero_cuota: cuota.numero_cuota,
      fecha_pago: cuota.fecha_pago.substring(0, 10),
      monto: cuota.monto
    });
  }
  eliminarCuota(cuota: Icuota) {
    const index = this.dataSourceC.indexOf(cuota);
    if (index >= 0) {
      this.dataSourceC.splice(index, 1);
      this.dataSourceC = [...this.dataSourceC]; 
    }
  }
  guardarEdicionCuota() {
    if (this.cuotaSeleccionada) {
      const numero_cuota = this.cuotaEditadaForm.get('numero_cuota').value;
      const fecha_pago = this.cuotaEditadaForm.get('fecha_pago').value;
      const monto = this.cuotaEditadaForm.get('monto').value;

      this.cuotaSeleccionada.numero_cuota = numero_cuota;
      this.cuotaSeleccionada.fecha_pago = fecha_pago.substring(0, 10);
      this.cuotaSeleccionada.monto = monto;
this.cuotaSeleccionada.codigo_oc=this.orden.codigo;
      this.cuotaSeleccionada = null;
      this.cuotaEditadaForm.reset();
    }
  }
  cancelarEdicionCuota() {
    this.cuotaSeleccionada = null;
    this.cuotaEditadaForm.reset();
  }
  /* #endregion */


  ngOnInit() {

    this.cuotasForm = new FormGroup({
      cantidadCuotas: new FormControl('', [Validators.required]),
      monto: new FormControl('', [Validators.required]),
      fechaInicial:new FormControl('', [Validators.required])
    });

    this.form = this.fb.group({
      asunto: ['', Validators.required],
      fecha: [null, Validators.required],
      recordatorio: [0, Validators.required]
    });




    this.accsubtype = '';

    /* #region COMBOS */
    this.departamentosall().then(() => {
    })

    this.cuentasall().then(() => {
    })

    this.marcasall().then(() => {
    })

    this.subcuentasall().then(() => {
    })

    this.categoriasall().then(() => {
    })

    /* #endregion */


    this.route.paramMap.subscribe(params => {
      this.codigo_oc = params.get('codigo_oc');
      // this.idProveedor = params.get('idProveedor');
    });


    /* #region CARGAR VALORES BD */
    //rescatar archivos
    this.restangular.one('archivos').get({ codigo: this.codigo_oc}).subscribe(response => {
      this.archivosDB = response;
      console.log('archivos' + this.archivosDB);
    });
    //rescatar responsables
    this.restangular.one('responsables').get({ codigo: this.codigo_oc, responsabilidad: 'D' }).subscribe(response => {
      this.users = response;
      console.log('responsables' + this.users);
    });
//rescatar cuotas
this.restangular.one('cuotas').get({ codigo_oc: this.codigo_oc}).subscribe(response => {
      this.dataSourceC = response;
      console.log(this.dataSourceC);
    });
    //rescatar recordatorios
    this.restangular.one('recordatorios').get({ codigo_oc: this.codigo_oc}).subscribe(response => {
      this.dataSource.data = response;
      console.log(this.dataSource.data);
    });
    //rescatar responsables2
    this.restangular.one('responsables').get({ codigo: this.codigo_oc, responsabilidad: 'S' }).subscribe(response => {
      this.users2 = response;
      console.log('users2' + this.users2);
    });

    //rescatar orden
    this.restangular.one('ordenver').get({ codigo: this.codigo_oc }).subscribe(response => {
      this.orden = response;
      this.orden.fecha = new Date(Date.parse(this.orden.fecha)).toLocaleDateString('es-ES');
      console.log(this.orden);
      this.dataFormOrden = this.createOrden();
    });
    //rescatar contrato
    this.restangularContrato.one('contratover').get({ codigo: this.codigo_oc,  sistema:this.sistema }).subscribe(response => {
      this.contrato = response;
      this.contrato.fecha_inicio == null ? this.contrato.fecha_inicio = "" : this.contrato.fecha_inicio = new Date(Date.parse(this.contrato.fecha_inicio)).toISOString().substring(0, 10);
      this.contrato.fecha_fin == null ? this.contrato.fecha_fin = "" : this.contrato.fecha_fin = new Date(Date.parse(this.contrato.fecha_fin)).toISOString().substring(0, 10);
      console.log(this.contrato);
      this.contratoid = this.contrato.id;
      console.log(this.contratoid);
      if (this.contratoid === 0 || this.contratoid == undefined) {
        this.contratoid = 0;
        this.contrato.razon_social = this.orden.nombre_proveedor;
        this.contrato.nit = this.orden.nit;
        this.contrato.monto = this.orden.total;
      }
      else {
        this.departamentoid = this.contrato.departamento_id;
        this.selectcuentas(this.contrato.cuenta_id);
      }
      this.dataFormContrato = this.createContrato();
      this.dataFormContrato.patchValue(this.contrato);
      this.cdRef.detectChanges();//refrescar pantalla
    });
    // this.cargar();
    /* #endregion */

  }
    /* #region EVENTOS */
    addE() {
      if (!this.selectedE.asunto || !this.selectedE.fecha) {
        this.snackBar.open('Por favor, complete todos los campos', 'Cerrar', { duration: 3000 });
        return;
      }
      this.dataSource.data.push(this.selectedE);
      this.dataSource._updateChangeSubscription();
      this.selectedE = {
        asunto: '',
        fecha: null,
        recordatorio: 0
      };
      this.snackBar.open('Evento agregado', 'Cerrar', { duration: 3000 });
    }
  
    editE(row) {
      this.selectedE = row;
      this.isEditing = true;
    }
  
    deleteE(row): void {
      // Find index of the row to be deleted
      const index = this.dataSource.data.indexOf(row);
  
      // Remove the row from the data source
      if (index > -1) {
        this.dataSource.data.splice(index, 1);
        this.dataSource.data = [...this.dataSource.data]; // Trigger data source update
      }
    }
  
    saveE() {
      if (!this.selectedE.asunto || !this.selectedE.fecha) {
        this.snackBar.open('Por favor, complete todos los campos', 'Cerrar', { duration: 3000 });
        return;
      }
  
  
      const index = this.dataSource.data.findIndex((evento) => evento.asunto === this.selectedE.asunto);
      this.dataSource.data[index] = this.selectedE;
      this.dataSource._updateChangeSubscription();
      this.selectedE = {
        asunto: '',
        fecha: null,
        recordatorio: 0
      };
      this.isEditing = false;
      this.snackBar.open('Evento guardado', 'Cerrar', { duration: 3000 });
    }
    /* #endregion */
  
    /* #region CREAR FORMS, Orden, Contrato */
    createOrden(): FormGroup {
      return this._formBuilder.group({
        descr_tipo: [this.orden.descr_tipo],
        codigo: [this.orden.codigo],
        fecha: [this.orden.fecha],
        nit: [this.orden.nit],
        nombre_proveedor: [this.orden.nombre_proveedor],
        razon_orden: [this.orden.razon_orden],
        total: [this.orden.total]
      });
    }
  
    createContrato(): FormGroup {
      return this._formBuilder.group({
        nit: [this.contrato.nit],
        razon_social: [this.contrato.razon_social],
        numero: [this.contrato.numero],
        categoria_id: [this.contrato.categoria_id],
        descripcion: [this.contrato.descripcion],
        departamento_id: [this.contrato.departamento_id],
        cuenta_id: [this.contrato.cuenta_id],
        subcuenta_id: [this.contrato.subcuenta_id],
        tipo_gasto: [this.contrato.tipo_gasto],
        cadena: [this.contrato.cadena],
        campana: [this.contrato.campana],
        pk_marca: [this.contrato.pk_marca],
        fecha_inicio: [this.contrato.fecha_inicio],
        fecha_fin: [this.contrato.fecha_fin],
        factura_retencion: [this.contrato.factura_retencion]
      });
    }
    /* #endregion */
  
    /* #region BASE DE DATOS, CONSULTAS */
    //cargar combos
    departamentosall() {
      return new Promise(resolve => {
        this.restangular.one('departamentosall').get('').subscribe(
          (data) => {
            // this.cancelar();
            this.departamentos = data;
            resolve(true);
          },
          () => {
            resolve(true);
            console.log("error");
          });
      });
    }
    
    marcasall() {
      return new Promise(resolve => {
        this.restangular.one('marcasall').get('').subscribe(
          (data) => {
            this.marcas = data;
            resolve(true);
          },
          () => {
            resolve(true);
            console.log("error");
          });
      });
    }
    categoriasall() {
      return new Promise(resolve => {
        this.restangular.one('categoriasall').get('').subscribe(
          (data) => {
            this.categorias = data;
            resolve(true);
          },
          () => {
            resolve(true);
            console.log("error");
          });
      });
    }
    cuentasall() {
      return new Promise(resolve => {
        this.restangular.one('cuentasall').get('').subscribe(
          (data) => {
            this.cuentas = data;
            resolve(true);
          },
          () => {
            resolve(true);
            console.log("error");
          });
      });
    }
    subcuentasall() {
      return new Promise(resolve => {
        this.restangular.one('subcuentasall').get('').subscribe(
          (data) => {
            this.subcuentas = data;
            resolve(true);
          },
          () => {
            resolve(true);
            console.log("error");
          });
      });
    }
    usersall() {
      return new Promise(resolve => {
        this.restangular.one('usersall').get('').subscribe(
          (data) => {
            this.allUsers = data;
            resolve(true);
          },
          () => {
            resolve(true);
            console.log("error");
          });
      });
    }
    usersall2() {
      return new Promise(resolve => {
        this.restangular.one('usersall').get('').subscribe(
          (data) => {
            this.allUsers2 = data;
            resolve(true);
          },
          () => {
            resolve(true);
            console.log("error");
          });
      });
    }
    /* #endregion */
    //seleccionar combos
  
    /* #region SELECTS COMBOS */
    selectdepartamentos(id) {
      console.log(id);
      this.departamentos.forEach(element => {
        if (element.id == id) {
          this.departamento_s = element;
          this.departamentoid = id;
          this.contrato.departamento_id = this.departamento_s.id;
          this.cdRef.detectChanges();
        }
      });
    }
  
    selectcuentas(cuenta) {
      console.log(cuenta);
      this.cuentas.forEach(element => {
        if (element.account_key == cuenta) {
          this.cuenta_s = element;
          this.accsubtype = this.cuenta_s.accsubtype;
          this.contrato.cuenta_id = this.cuenta_s.account_key;
          this.cdRef.detectChanges();
        }
      });
    }
  
    selectsubcuentas(id) {
      console.log(id);
      this.subcuentas.forEach(element => {
        if (element.account_key == id) {
          this.subcuenta_s = element;
          this.contrato.subcuenta_id = this.subcuenta_s.account_key;
        }
      });
    }
  
    selectcategorias(id) {
      console.log(id);
      this.categorias.forEach(element => {
        if (element.id == id) {
          this.categoria_s = element;
          this.contrato.categoria_id = this.categoria_s.id;
        }
      });
    }
  
    selectmarcas(id) {
      console.log(id);
      this.marcas.forEach(element => {
        if (element.pk_marca == id) {
          this.marca_s = element;
          this.contrato.pk_marca = this.marca_s.pk_marca;
        }
      });
    }
    /* #endregion */
  
    /* #region GUARDAR, ACTUALIZAR, ELIMINAR BD */
    //GUARDAR DATOS
    guardarContrato() {
  
      let data = this.dataFormContrato.value;
      data.codigo_oc = this.orden.codigo;
      data.campana == null ? data.campana = '' : data.campana;
      data.descripcion == null ? data.descripcion = '' : data.descripcion;
      // let data = this.dataFormContrato.getRawValue();
      this.spinner.show();
      console.log(data);
      this.restangular.all('contratos').post(data).subscribe(
        (response) => {
          this.ngOnInit();
          console.log('Guardado, agregado');
          console.log(response);
  
          this.snackBar.open(response.mensaje, 'Exito', {
            duration: 3000,
          });
  
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
    }
  
    actualizarContrato() {
      // this.dataFormContrato.patchValue(this.contrato);
      let data = this.dataFormContrato.value;
      data.campana == null ? data.campana = '' : data.campana;
      data.descripcion == null ? data.descripcion = '' : data.descripcion;
      console.log(data);
      this.spinner.show();
      this.restangular.one('contratos', this.contratoid).put(data).subscribe(
        (response) => {
          console.log('Guardado, agregado');
          console.log(response);
          this.spinner.hide();
          this.snackBar.open(response.mensaje, 'Exito', {
            duration: 3000,
          });
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
    }
  
    eliminarResponsable(responsableId: number) {
      this.spinner.show();
      this.restangular.one('responsables', responsableId).remove().subscribe(
        (response) => {
          console.log('Responsable directo eliminado exitosamente');
          console.log(response);
  
          this.snackBar.open(response.mensaje, 'Exito', {
            duration: 3000,
          });
  
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
    }
  
    guardarResponsable() {
  
      // let data = this.dataFormContrato.getRawValue();
      this.spinner.show();
      console.log(this.responsable);
      this.restangular.all('responsables').post(this.responsable).subscribe(
        (response) => {
          console.log('Responsable directo agregado, agregado');
          console.log(response);
  
          this.snackBar.open(response.mensaje, 'Exito', {
            duration: 3000,
          });
  
          this.spinner.hide();
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
    }
    guardarCuotas() {
  
      // let data = this.dataFormContrato.getRawValue();
      console.log('aqui men'+this.dataSourceC);
      this.spinner.show();
      console.log(this.dataSourceC);
      this.restangular.all('cuotas').post(this.dataSourceC).subscribe(
        (response) => {
          console.log('Guardado, agregado');
          console.log(response);
  
          this.snackBar.open(response.mensaje, 'Exito', {
            duration: 3000,
          });
  
          this.spinner.hide();
          this.restangular.one('recordatorios').get({ codigo_oc: this.codigo_oc}).subscribe(response => {
            this.dataSource.data = response;
            console.log(this.dataSource.data);
          });
        },
        (error) => {
          console.log(error);
          this.spinner.hide();
        }
      );
    }
    /* #endregion */
  
    /* #region CHIPS */
    //CHIP 1
    add(event: MatChipInputEvent): void {
      // Add user only when MatAutocomplete is not open
      // To make sure this does not conflict with OptionSelected Event
      if (!this.matAutocomplete.isOpen) {
        const input = event.input;
        const value = event.value;
  
        // Find the user by name
        const userToAdd = this.allUsers.find(user => user.nombre.toLowerCase() === (value || '').trim().toLowerCase());
  
        // Add the user if it exists in allUsers
        if (userToAdd) {
          this.users.push(userToAdd);
  
        }
  
        // Reset the input value
        if (input) {
          input.value = '';
        }
  
        this.userCtrl.setValue(null);
      }
      console.log(this.users);
    }
  
    remove(user: Iuser): void {
      const index = this.users.indexOf(user);
      console.log(user);
      this.eliminarResponsable(user.id);
      if (index >= 0) {
        this.users.splice(index, 1);
      }
    }
  
    selected(event: MatAutocompleteSelectedEvent): void {
      this.users.push({ id: event.option.value.id, nombre: event.option.viewValue });
      let resp: Iresponsable = { codigo_oc: this.codigo_oc, responsabilidad: 'D', user_id: event.option.value.id };
      this.responsable = resp;
      console.log(this.responsable);
      this.guardarResponsable();
      this.userInput.nativeElement.value = '';
      this.userCtrl.setValue(null);
    }
  
    // private _filter(value: Iuser): Iuser[] {
    //   const filterValue = value.nombre.toLowerCase();
    //   return this.allUsers.filter(user => user.nombre.toLowerCase().indexOf(filterValue) === 0);
    // }
  
    private _filter2(value: any): Iuser[] {
      const filterValue = (typeof value === 'string' ? value : value.nombre).toLowerCase();
      return this.allUsers2.filter(user2 => user2.nombre.toLowerCase().indexOf(filterValue) === 0);
    }
  
    //CHIPS 2
  
    add2(event: MatChipInputEvent): void {
      // Add user only when MatAutocomplete is not open
      // To make sure this does not conflict with OptionSelected Event
      if (!this.matAutocomplete2.isOpen) {
        const input = event.input;
        const value = event.value;
  
        // Find the user by name
        const userToAdd = this.allUsers2.find(user2 => user2.nombre.toLowerCase() === (value || '').trim().toLowerCase());
  
        // Add the user if it exists in allUsers
        if (userToAdd) {
          this.users2.push(userToAdd);
  
        }
  
        // Reset the input value
        if (input) {
          input.value = '';
        }
  
        this.userCtrl2.setValue(null);
      }
      console.log(this.users2);
    }
  
    remove2(user: Iuser): void {
      const index = this.users2.indexOf(user);
      console.log(user);
      this.eliminarResponsable(user.id);
      if (index >= 0) {
        this.users2.splice(index, 1);
      }
  
    }
  
    selected2(event: MatAutocompleteSelectedEvent): void {
      this.users2.push({ id: event.option.value.id, nombre: event.option.viewValue });
      let resp: Iresponsable = { codigo_oc: this.codigo_oc, responsabilidad: 'S', user_id: event.option.value.id };
      this.responsable = resp;
      console.log(this.responsable);
      this.guardarResponsable();
      this.userInput2.nativeElement.value = '';
      this.userCtrl2.setValue(null);
    }
  
    // private _filter(value: Iuser): Iuser[] {
    //   const filterValue = value.nombre.toLowerCase();
    //   return this.allUsers.filter(user => user.nombre.toLowerCase().indexOf(filterValue) === 0);
    // }
  
    private _filter(value: any): Iuser[] {
      const filterValue = (typeof value === 'string' ? value : value.nombre).toLowerCase();
      return this.allUsers.filter(user => user.nombre.toLowerCase().indexOf(filterValue) === 0);
    }
    /* #endregion */
  
    /* #region ARCHIVOS */
    removearchivos(file: any): void {
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
        console.log(this.archivos) ;
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
            this.snackBar.open(response.mensaje, ':-)', {
              duration: 3000,
            });
            this.recargarimagenes();
          },
          ()=>{
            this.spinner.hide();
          });
        }
      });
        
    }
    guardarImgs(id){
      this.archivos.forEach(element => {
        let datos = new FormData();  
        datos.append('contrato_id',this.codigo_oc);
        datos.append('sistema',this.sistema);
        datos.append('sistema_p',this.orden.sistema_p);
        datos.append('proveedor_id',this.orden.provedor);
        datos.append('file',element);
        // this.spinner.show();
        this.restangular.all('archivo').post(datos,undefined, undefined,{'Conten-type':undefined}).subscribe(
          (response) => {
          console.log(response);
          // this.spinner.hide();
          // this.snackBar.open(response.mensaje, ':-)', {
          //   duration: 3000,
          // });
          this.recargarimagenes();
        },
        ()=>{
          // this.spinner.hide();
          this.recargarimagenes();
        });  
      });
      
    }
  
    recargarimagenes()
    {
      console.log('rescatando imagenes');
      this.restangular.one('archivos').get({ codigo: this.codigo_oc}).subscribe(response => {
        this.archivosDB = response;
        console.log('archivos' + this.archivosDB);
        this.archivos=[];
      });
    }
    
    /* #endregion */
    
}
