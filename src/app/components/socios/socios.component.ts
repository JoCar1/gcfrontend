import { Component, ElementRef, OnInit, ViewChild, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormusuarioComponent } from '../forms/formusuario/formusuario.component';
import { Iproveedor, Isocio } from '../../models/interfaces';
import { routerTransition } from '../../service/router.animations';
import {animate, state, style, transition, trigger} from '@angular/animations';

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Restangular } from "ngx-restangular";
import { MatSnackBar } from '@angular/material';
import { catchError, map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent, BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { FormsocioComponent } from '../forms/formsocio/formsocio.component';
import { AuthService } from '../../service/auth.service';

const ELEMENT_DATA: Isocio[] = [];
@Component({
  selector: 'app-socios',
  templateUrl: './socios.component.html',
  styleUrls: ['./socios.component.scss'],
  animations: [
    routerTransition(),
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class SociosComponent implements OnInit {
  pageSize = 25;
  pageEvent:any;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns = ['sistema','nombre', 'nit', 'codigo','servicio'];
  dataSource = new MatTableDataSource(ELEMENT_DATA);
  exampleDatabase: ExampleHttpDatabase | null;
  data: Iproveedor[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;

  ngx:Restangular;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  socio:Iproveedor;

  constructor(public auth:AuthService,public snackBar: MatSnackBar,public restangular:Restangular,public dialog: MatDialog) { 
    this.ngx = this.restangular.all('proveedores');
  }

  ngOnInit() {
    this.sort.active = 'nombre';
    this.sort.direction = 'asc';

    fromEvent(this.filter.nativeElement, 'keyup')
    .pipe(
      map((event: any) => {
        return event.target.value;
      })
      ,debounceTime(2000)        
      ,distinctUntilChanged()
    ).subscribe((text: string) => {
      this.sort.sortChange.emit();
    });
    this.cargar();
  }
  
  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  // openDialog(accion): void {
  //   let data;
  //   if(accion == 'edit'){
  //     data = this.socio;
  //   }else{
  //     data = '';
  //   }
  //   const dialogRef = this.dialog.open(FormsocioComponent, {
  //     width: '550px',
  //     data: {accion: accion, data: data}
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     console.log(result);
  //     this.sort.sortChange.emit();
  //   });
  // }
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
        
        return this.exampleDatabase!.getRepoIssues(
          this.sort.active, this.sort.direction, this.paginator.pageSize, this.paginator.pageIndex, this.filter.nativeElement.value);
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
  
}

export class ExampleHttpDatabase {
  constructor(private http: Restangular) {}

  getRepoIssues(sort: string, order: string, size: number, page: number, filter:string): Observable<Iproveedor> {
    if(!size){
      size = 25;
    }
    if(!sort){
      sort = "nombre";
    }
    const query = {
      limit: size,
      columna: sort,
      filter: filter,
      order: order,
      // consulta:this.consulta,
      page:page + 1
    };
    return this.http.getList(query);
  }
}

export class EDatabase1 {
  /** Stream that emits whenever the data has been modified. */
  dataChange: BehaviorSubject<Iproveedor[]> = new BehaviorSubject<Iproveedor[]>([]);
  get data(): Iproveedor[] { return this.dataChange.value; }

  constructor(private datat) {
    for (let i = 1; i < this.datat.length; i++) { this.addUser(this.datat[i]); }
  }
  addUser(va) {
    const copiedData = this.data.slice();
    copiedData.push(va);
    this.dataChange.next(copiedData);
  }
}