import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints, BreakpointState ,MediaMatcher} from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from './service/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'GestionContratos';  
  isHandset$: Observable<boolean> = this.breakpointObserver.observe([Breakpoints.HandsetPortrait])
  .pipe(
    map(result => result.matches)
  );
  constructor(public auth:AuthService,public snackBar: MatSnackBar, private breakpointObserver: BreakpointObserver) {  

  }

  logout() {
    this.auth.logout().subscribe(
      (dat) => {
        this.snackBar.open('Se ha deslogueado correctamente', ':-)', {
          duration: 3000,
        });
      },
      (error: HttpErrorResponse) => {
      }
    );
  }	
}
