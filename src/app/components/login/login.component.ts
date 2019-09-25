import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { routerTransition } from '../../service/router.animations';
import { MatSnackBar } from '@angular/material';
import { AuthService } from '../../service/auth.service';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { NgxSpinnerService } from "ngx-spinner";

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
        public snackBar: MatSnackBar
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
            username: ['', Validators.compose([Validators.required,Validators.minLength(5),Validators.maxLength(10)])],
            password: ['', Validators.compose([Validators.required])]
        });
    }


    login() {
        const data = this.loginForm.value;
        let user = data;
        console.log(user);
        
        // this.user.password = data.password;
        this.spinner.show();
        this.auth.login(user).subscribe(
          (dat) => {
            this.spinner.hide();
            this.snackBar.open('Se ha conectado exitosamente', ':-)', {
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
}
