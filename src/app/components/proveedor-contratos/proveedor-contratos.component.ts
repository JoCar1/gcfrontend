import { Component, ElementRef, OnInit, ViewChild, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormusuarioComponent } from '../forms/formusuario/formusuario.component';
import { Icontrato, Iorden, Iproveedor, Isocio } from '../../models/interfaces';
import { routerTransition } from '../../service/router.animations';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { ContratoComponent as FormcontratoComponent } from '../forms/contrato/contrato.component';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Restangular } from "ngx-restangular";
import { MatSnackBar } from '@angular/material';
import { catchError, map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent, BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { FormsocioComponent } from '../forms/formsocio/formsocio.component';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/service/auth.service';
import { ConfirmacionComponent } from '../../modals/confirmacion/confirmacion.component';
import { NgxSpinnerService } from 'ngx-spinner';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
const ELEMENT_DATA: Iorden[] = [];
@Component({
  selector: 'app-proveedor-contratos',
  templateUrl: './proveedor-contratos.component.html',
  styleUrls: ['./proveedor-contratos.component.scss'],
  animations: [
    routerTransition(),
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class ProveedorContratosComponent implements OnInit {
  dateinicio:any='';
  datefin:any='';
  pageEvent:any;
  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns = ['sistema','codigo', 'descr_tipo', 'nombre_proveedor','fecha'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  exampleDatabase: ExampleHttpDatabase | null;
  data: Iorden[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  expandedElement: PeriodicElement | null;
  ngx:Restangular;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  orden:any;
  contrato:Icontrato;
  selectedOption:string;
  sistema:string;
  idProveedor:string;
  dataProveedor: any='';
  archivos:any[] = [];//proveedor
  archivosDB:any[] = [];//proveedor
  archivosContratos:any[] = [];
  archivosOrdenes:any[] = [];

  constructor(private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    public auth:AuthService,
    public snackBar: MatSnackBar,
    public restangular:Restangular,
    public dialog: MatDialog) { 
    this.ngx = this.restangular.all('ordenesproveedor');

  }

  ngOnInit() {

    this.route.paramMap.subscribe(params => {
      this.sistema = params.get('sistema');
      this.idProveedor = params.get('idProveedor');
    });

    //rescartarProveedor
    this.restangular.one('proveedorestone').get({ idProveedor: this.idProveedor,sistema:this.sistema }).subscribe(response => {
      this.dataProveedor = response;
      console.log(this.dataProveedor);
    });

    //rescatar archivos
    this.restangular.one('archivosFile').get({ sistema: 'OC',proveedor_id:this.idProveedor}).subscribe(response => {
      this.archivosOrdenes = response;
      console.log('archivosOC' + this.archivosOrdenes);
    });
    this.restangular.one('archivosFile').get({ sistema: 'CO',proveedor_id:this.idProveedor}).subscribe(response => {
      this.archivosContratos = response;
      console.log('archivosCO' + this.archivosContratos);
    });
    this.restangular.one('archivosFile').get({ sistema: 'PR',proveedor_id:this.idProveedor}).subscribe(response => {
      this.archivosDB = response;
      console.log('archivosPR' + this.archivosDB);
    });


    this.selectedOption="ALL";
    this.sort.active = 'codigo';
    this.sort.direction = 'asc';

    this.cargar();
  }
  openexcel(){
    let url = `http://10.0.8.5:8000/api/excelcontratos/${this.auth.returnidusu()}/${this.dateinicio}/${this.datefin}`;
    console.log(url);
    window.open(url, "_blank");

    // window.
  }
  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }
  buscarfecha(){
    this.sort.sortChange.emit();
  }
  openDialog(accion): void {
    let data;
    if(accion=='edit'){
      data = this.orden;
    }else{
      data = '';
    }
    const dialogRef = this.dialog.open(FormcontratoComponent, {
      width: '550px',
      data: {action: accion, data: data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.sort.sortChange.emit();
    });
  }

  cargar(){
    
    this.exampleDatabase = new ExampleHttpDatabase(this.ngx);
    // If the user changes the sort order, reset back to the first page.
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
    merge(this.sort.sortChange, this.paginator.page)
    .pipe(
      startWith({}),
      switchMap(() => {
        console.log("switmap");
        
        this.isLoadingResults = true;
        console.log(this.sort.direction);
        return this.exampleDatabase!.getRepoIssues(this.sistema,this.idProveedor, this.selectedOption,
          this.sort.active, this.sort.direction, this.paginator.pageSize, this.paginator.pageIndex,this.dateinicio,this.datefin);
      }),
      map(data => {
        // Flip flag to show that loading has finished.
        this.isLoadingResults = false;
        this.isRateLimitReached = false;
        this.resultsLength = data[0].total;
        const dd = new EDatabase1(data);
        const da = dd.data;
        return da;
      }),
      catchError(() => {
        this.isLoadingResults = false;
        // Catch if the GitHub API has reached its rate limit. Return empty data.
        this.isRateLimitReached = true;
        return observableOf([]);
      })
    ).subscribe(data => {
      this.data = data;
    });
  }
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
          datos.append('contrato_id','');
          datos.append('sistema','PR');
          datos.append('sistema_p',this.dataProveedor.sistema_p);
          datos.append('proveedor_id',this.dataProveedor.codigo);
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
        this.restangular.one('archivosFile').get({sistema: 'PR',proveedor_id:this.idProveedor}).subscribe(response => {
          this.archivosDB = response;
          console.log('archivos' + this.archivosDB);
          this.archivos=[];
        });
      }
      
      /* #endregion */
}

export class ExampleHttpDatabase {
  constructor(private http: Restangular) {}

  getRepoIssues(sistema:string, idProveedor:string,filtro:string,sort: string, order: string, size: number, page: number, dateinicio:string,datefin:string): Observable<Iorden> {
    if(!size){
      size = 25;
    }
    if(!sort){
      sort = "codigo";
    }
    const query = {
      sistema:sistema,
      idProveedor:idProveedor,
      filtro:filtro,
      dateinicio:dateinicio,
      datefin:datefin,
      limit: size,
      columna: sort,
      filter: '',
      order: order,
      // consulta:this.consulta,
      page:page + 1
    };

    return this.http.getList(query);
  }

  
}

export class EDatabase1 {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Iorden[]> = new BehaviorSubject<Iorden[]>([]);
  get data(): Iorden[] { return this.dataChange.value; }

  constructor(private datat) {
    for (let i = 1; i < this.datat.length; i++) { this.addUser(this.datat[i]); }
  }
  addUser(va) {
    const copiedData = this.data.slice();
    copiedData.push(va);
    this.dataChange.next(copiedData);
  }

   
}