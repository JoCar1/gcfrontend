import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routerTransition } from '../../service/router.animations';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../service/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";
import { Restangular } from "ngx-restangular";
// import { FuseConfigService } from '@fuse/services/config.service';
// import { fuseAnimations } from '@fuse/animations';

@Component({
    selector     : 'login',
    templateUrl  : './login.component.html',
    styleUrls    : ['./login.component.scss'],
    animations: [routerTransition()],
    encapsulation: ViewEncapsulation.None,
    // animations   : fuseAnimations
})
export class LoginComponent implements OnInit
{
    loginForm: FormGroup;

    /**
     * Constructor
     *
     * @param {FuseConfigService} _fuseConfigService
     * @param {FormBuilder} _formBuilder
     */
    constructor(
        // private _fuseConfigService: FuseConfigService,
        private spinner: NgxSpinnerService,
        private _formBuilder: FormBuilder,
        private auth: AuthService,
        public snackBar: MatSnackBar,
        public restangular: Restangular,
    )
    {
        // Configure the layout
        // this._fuseConfigService.config = {
        //     layout: {
        //         navbar   : {
        //             hidden: true
        //         },
        //         toolbar  : {
        //             hidden: true
        //         },
        //         footer   : {
        //             hidden: true
        //         },
        //         sidepanel: {
        //             hidden: true
        //         }
        //     }
        // };
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        this.loginForm = this._formBuilder.group({
            username: ['', Validators.compose([Validators.required])],
            password: ['', Validators.compose([Validators.required])]
        });
    }


    login() {
        const data = this.loginForm.value;
        console.log(data);
        
        // this.user.password = data.password;
        this.spinner.show();
        this.auth.login(data).subscribe(
          (dat) => {
            this.countnot();
            this.spinner.hide();
            this.snackBar.open('Se ha conectado exitosamente', 'Exito', {
              duration: 3000,
            });
          },
          (error: HttpErrorResponse) => {
            this.spinner.hide();
            this.snackBar.open('credenciales no válidas', ':-(', {
              duration: 3000,
            });
          },
          () => {
            this.spinner.hide();
          }
        );
    }


    countnot(){
      return new Promise(resolve => {
        this.restangular.one('countnot').get('').subscribe(
        (data) => {
          // this.cancelar();
          console.log(data);
          localStorage.setItem('notificacions',JSON.stringify(data.data))
          resolve(true);
        },
        ()=>{
          resolve(true);
          console.log("error");
        });
      });
      // countnot restangular route
    }
}
