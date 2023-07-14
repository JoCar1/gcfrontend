import { Component, ElementRef, OnInit, ViewChild, Output } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { FormeventoComponent } from '../forms/formevento/formevento.component';
import { ConfirmacionComponent } from '../../modals/confirmacion/confirmacion.component';
// import { Ievento } from '../../models/interfaces';
import { routerTransition } from '../../service/router.animations';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { NgxSpinnerService } from "ngx-spinner";

import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Restangular } from "ngx-restangular";
import { MatSnackBar } from '@angular/material';
import { catchError, map, startWith, switchMap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge, fromEvent, BehaviorSubject, Observable, of as observableOf, from } from 'rxjs';

import { AuthService } from '../../service/auth.service';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}
// const ELEMENT_DATA: Ievento[] = [];
@Component({
  selector: 'app-evento',
  templateUrl: './evento.component.html',
  styleUrls: ['./evento.component.scss'],
  animations: [
    routerTransition(),
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})
export class EventoComponent implements OnInit {
  dateinicio:any='';
  datefin:any='';
  pageEvent:any;
  pageSize = 25;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  displayedColumns = ['nombre', 'contrato', 'fecha_evento', 'fecha_recordatorio','created_at'];
  // dataSource = new MatTableDataSource(ELEMENT_DATA);
  // exampleDatabase: ExampleHttpDatabase | null;
  // data: Ievento[]=[];
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('filter', {static: true}) filter: ElementRef;
  expandedElement: PeriodicElement | null;
  ngx:Restangular;
  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;
  evento:any;

  constructor(public auth:AuthService,private spinner: NgxSpinnerService,public snackBar: MatSnackBar,public restangular:Restangular,public dialog: MatDialog) { 
    this.ngx = this.restangular.all('evento');
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
      console.log("carggg");
      this.sort.sortChange.emit();
    });
    // this.cargar();
  }
  openexcel(){
    let url = `http://10.0.8.5:8000/api/exceleventos/${this.auth.returnidusu()}/${this.dateinicio}/${this.datefin}`;
    console.log(url);
    window.open(url, "_blank");

    // window.
  }
  // applyFilter(filterValue: string) {
  //   this.dataSource.filter = filterValue.trim().toLowerCase();
  // }

  openDialog(accion): void {
    let data;
    if(accion == 'edit'){
      data = this.evento;
    }else{
      data = '';
    }
    const dialogRef = this.dialog.open(FormeventoComponent, {
      width: '550px',
      data: {accion: accion, data: data}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      console.log(result);
      this.sort.sortChange.emit();
    });
  }
  buscarfecha(){
    this.sort.sortChange.emit();
  }
  // cargar(){
  //   this.exampleDatabase = new ExampleHttpDatabase(this.ngx);
  //   // If the user changes the sort order, reset back to the first page.
  //   this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);
  //   merge(this.sort.sortChange, this.paginator.page)
  //   .pipe(
  //     startWith({}),
  //     switchMap(() => {
  //       console.log("switmap");
        
  //       this.isLoadingResults = true;
  //       console.log(this.sort.direction);
        
  //       return this.exampleDatabase!.getRepoIssues(
  //         this.sort.active, this.sort.direction, this.paginator.pageSize, this.paginator.pageIndex, this.filter.nativeElement.value,this.dateinicio,this.datefin);
  //     }),
  //     map(data => {
  //       // Flip flag to show that loading has finished.
  //       this.isLoadingResults = false;
  //       this.isRateLimitReached = false;
  //       this.resultsLength = data[0].total;
  //       const dd = new EDatabase1(data);
  //       const da = dd.data;
  //       return da;
  //     }),
  //     catchError(() => {
  //       this.isLoadingResults = false;
  //       // Catch if the GitHub API has reached its rate limit. Return empty data.
  //       this.isRateLimitReached = true;
  //       return observableOf([]);
  //     })
  //   ).subscribe(data => {
  //     this.data = data;
  //   });
  // }
  // removeevento(item){
  //   const dialogRef = this.dialog.open(ConfirmacionComponent, {
  //     width: '250px',
  //     data: {confirmacion: true,name: "Confirmar"}
  //   });
  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result){
  //       this.spinner.show();
  //       this.restangular.all('evento').customDELETE(item.id).subscribe(
  //         (response) => {
  //           this.sort.sortChange.emit();
  //           console.log(response);
  //           this.spinner.hide();
  //           this.snackBar.open(response.mensaje, 'Exito', {
  //             duration: 3000,
  //           });
  //         },
  //         ()=>{
  //           this.spinner.hide();
  //         });
  //     }
  //   });
  // }
}

// export class ExampleHttpDatabase {
//   constructor(private http: Restangular) {}

//   getRepoIssues(sort: string, order: string, size: number, page: number, filter:string,dateinicio:string,datefin:string): Observable<Ievento> {
//     if(!size){
//       size = 25;
//     }
//     if(!sort){
//       sort = "created_at";
//     }
//     const query = {
//       dateinicio:dateinicio,
//       datefin:datefin,
//       limit: size,
//       columna: sort,
//       filter: filter,
//       order: order,
//       // consulta:this.consulta,
//       page:page + 1
//     };
//     return this.http.getList(query);
//   }
// }

export class EDatabase1 {
  /** Stream that emits whenever the data has been modified. */
  // dataChange: BehaviorSubject<Ievento[]> = new BehaviorSubject<Ievento[]>([]);
  // get data(): Ievento[] { return this.dataChange.value; }

  // constructor(private datat) {
  //   for (let i = 1; i < this.datat.length; i++) { this.addUser(this.datat[i]); }
  // }
  // addUser(va) {
  //   const copiedData = this.data.slice();
  //   copiedData.push(va);
  //   this.dataChange.next(copiedData);
  // }
}