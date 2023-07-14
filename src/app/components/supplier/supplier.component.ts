import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { routerTransition } from 'src/app/service/router.animations';
import { ActivatedRoute } from '@angular/router';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { Restangular } from 'ngx-restangular';
import { Iproveedor } from 'src/app/models/interfaces';

interface Cuenta {
  accnum: string;
  accsub: string;
  account_key: string;
  name: string;
  porDefecto: boolean;
}

@Component({
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.scss'],
  animations: [
    routerTransition(),
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})


export class SupplierComponent implements OnInit {

  data: Iproveedor[] = [];
  proveedor: Iproveedor;

  formGroup1: FormGroup;
  formGroup2: FormGroup;
  formGroup3: FormGroup;
  formGroup4: FormGroup;
  formGroup5: FormGroup;
  formGroup6: FormGroup;
  formGroup7: FormGroup;
  formGroup8: FormGroup;
  ngx: Restangular;

  terminospagoscoins: any = [];
  terminospagocoins: any;
  terminospagos: any = [];
  terminospago: any;
  metodospagos: any = [];
  metodospago: any;
  bancos: any = [];
  banco: any;
  cuentas: any = [];
  accs: any = [];
  acc: any;
  paises: any = [];
  pais: any;
  nitRequired = true;

  cuentasSeleccionadas: Cuenta[] = [];
  cuentasFiltradas: Cuenta[] = [];
  selectedCuenta: any;


  constructor(private _formBuilder: FormBuilder,
    private cdRef: ChangeDetectorRef,
    public restangular: Restangular) {

    this.ngx = this.restangular.all('proveedores');
    
    this.formGroup1 = new FormGroup({
      nitRequiredf: new FormControl(),
      vendnum: new FormControl(),
      vendgrp: new FormControl('PNAL'),
    });
    this.formGroup2 = new FormGroup({
      name: new FormControl(),
      short: new FormControl(),
      long_name: new FormControl(),
      address1: new FormControl(),
      address2: new FormControl(),
      address3: new FormControl(),
      address4: new FormControl(),
      country: new FormControl(),
      postcode: new FormControl(),
      pobox_num: new FormControl(),
      pobox_postcode: new FormControl(),
      cmpny_postcode: new FormControl(),
      phone: new FormControl(),
      cell_phone: new FormControl(),
      telefax: new FormControl(),
      e_mail: new FormControl(),
      web_address: new FormControl(),
      telex: new FormControl(),
      class: new FormControl(),
    });
    this.formGroup3 = new FormGroup({
      codigo_concepto: new FormControl(),
      tipo_docid: new FormControl(),
      extension_docid: new FormControl(),
      invoice_control: new FormControl(),
    });
    this.formGroup4 = new FormGroup({
      bankcode: new FormControl(),
      bankid: new FormControl(),
      bankname: new FormControl(),
      bankbranch: new FormControl(),
      bankadd1: new FormControl(),
      bankadd2: new FormControl(),
      bankadd3: new FormControl(),
      bankadd4: new FormControl(),
      cab_spain: new FormControl(),
      abi_spain: new FormControl(),
      pay_bank_charge: new FormControl(),
      swift: new FormControl(),
      iban: new FormControl(),
      bankclear: new FormControl(),
    });
    this.formGroup6 = new FormGroup({
      // porDefecto:new FormControl()
    });
    this.formGroup7 = new FormGroup({
      rv_meaning: new FormControl(''),
      terms_code: new FormControl(''),
      term_pay_cd: new FormControl(''),
      cod_prov: new FormControl(''),
    });
    this.formGroup8 = new FormGroup({

    });
  }

  filterCuentas(event: any) {
    const query = event.target.value.toLowerCase();
    this.cuentasFiltradas = this.cuentas.filter(cuenta => {
      const cuentaText = `${cuenta.accnum} ${cuenta.accsub} ${cuenta.name}`.toLowerCase();
      return cuentaText.includes(query);
    });
  }
  onCuentaSelected(event: any) {
    const cuenta: Cuenta = event.option.value;
    const cuentaExistente = this.cuentasSeleccionadas.find(c => c.accnum === cuenta.accnum && c.accsub === cuenta.accsub);

    if (!cuentaExistente) {
      this.agregarCuenta({ ...cuenta, porDefecto: false }); // Agregar una copia de la cuenta a la tabla
    }

    this.selectedCuenta = null; // Restablecer el valor seleccionado
  }

  agregarCuenta(cuenta: Cuenta) {
    if (!this.cuentasSeleccionadas.some(c => c.accnum === cuenta.accnum && c.accsub === cuenta.accsub)) {
      this.cuentasSeleccionadas.push({ ...cuenta, porDefecto: false });

      if (this.cuentasSeleccionadas.length === 1) {
        this.cuentasSeleccionadas[0].porDefecto = true; // Marcar la cuenta como "por defecto"
      }

      this.selectedCuenta = null;
      this.cuentasFiltradas = [];
    }
  }

  eliminarCuenta(cuenta: Cuenta) {
    const index = this.cuentasSeleccionadas.findIndex(c => c.accnum === cuenta.accnum && c.accsub === cuenta.accsub);
    if (index > -1) {
      this.cuentasSeleccionadas.splice(index, 1);
    }
  }

  onPorDefectoChange(cuenta: Cuenta) {
    if (cuenta.porDefecto) {
      this.cuentasSeleccionadas.forEach(c => {
        if (c !== cuenta) {
          c.porDefecto = false;
        }
      });
    }
  }

  onToggleChange(event: any) {
    // La variable toggleValue contendrá el nuevo valor del interruptor deslizante
    console.log('Nuevo valor del toggle:', this.nitRequired);
    this.nitRequired = event.checked;
    // this.cdRef.detectChanges();//refrescar pantalla
  }
  terminospagoall() {
    return new Promise(resolve => {
      this.restangular.one('terminospagoall').get('').subscribe(
        (data) => {
          this.terminospagos = data;
          resolve(true);
        },
        () => {
          resolve(true);
          console.log("error");
        });
    });
  }
  terminospagocoinsall() {
    return new Promise(resolve => {
      this.restangular.one('terminospagocoinsall').get('').subscribe(
        (data) => {
          this.terminospagoscoins = data;
          resolve(true);
        },
        () => {
          resolve(true);
          console.log("error");
        });
    });
  }
  metodospagoall() {
    return new Promise(resolve => {
      this.restangular.one('metodospagoall').get('').subscribe(
        (data) => {
          this.metodospagos = data;
          resolve(true);
        },
        () => {
          resolve(true);
          console.log("error");
        });
    });
  }
  bancosall() {
    return new Promise(resolve => {
      this.restangular.one('bancosall').get('').subscribe(
        (data) => {
          this.bancos = data;
          resolve(true);
        },
        () => {
          resolve(true);
          console.log("error");
        });
    });
  }
  accall() {
    return new Promise(resolve => {
      this.restangular.one('accall').get('').subscribe(
        (data) => {
          this.accs = data;
          resolve(true);
        },
        () => {
          resolve(true);
          console.log("error");
        });
    });
  }
  paisesall() {
    return new Promise(resolve => {
      this.restangular.one('paisesall').get('').subscribe(
        (data) => {
          this.paises = data;
          resolve(true);
        },
        () => {
          resolve(true);
          console.log("error");
        });
    });
  }
  ngOnInit() {

    this.terminospagocoinsall().then(() => {
    })
    this.terminospagoall().then(() => {
    })
    this.metodospagoall().then(() => {
    })
    this.bancosall().then(() => {
    })
    this.paisesall().then(() => {
    })
    this.accall().then(() => {
      this.cuentas = this.accs;
    })
    // this.firstFormGroup = new FormGroup({
    //   vendnum: new FormControl('', [Validators.required]),
    //   vendgrp: new FormControl('', [Validators.required]),
    // });
    // this.secondFormGroup = new FormGroup({
    //   address1: new FormControl('', [Validators.required]),
    //   address2: new FormControl('', [Validators.required]),
    //   address3: new FormControl('', [Validators.required]),
    //   address4: new FormControl('', [Validators.required]),
    //   country: new FormControl('', [Validators.required]),
    //   postcode: new FormControl('', [Validators.required]),
    //   pobox_num: new FormControl('', [Validators.required]),
    //   pobox_postcode: new FormControl('', [Validators.required]),
    //   cmpny_postcode: new FormControl('', [Validators.required]),
    //   phone: new FormControl('', [Validators.required]),
    //   cell_phone: new FormControl('', [Validators.required]),
    //   telefax: new FormControl('', [Validators.required]),
    //   e_mail: new FormControl('', [Validators.required]),
    //   web_address: new FormControl('', [Validators.required]),
    //   telex: new FormControl('', [Validators.required]),
    //   class: new FormControl('', [Validators.required]),
    // });
  }
  selectbancos(id) {
    console.log(id);
    this.bancos.forEach(element => {
      if (element.id == id) {
        this.banco = element;
        this.cdRef.detectChanges();
      }
    });
  }
  selectpaises(id) {
    console.log(id);
    this.bancos.forEach(element => {
      if (element.id == id) {
        this.pais = element;
        this.cdRef.detectChanges();
      }
    });
  }

  selectterminospagos(id) {
    console.log(id);
    this.terminospagos.forEach(element => {
      if (element.id == id) {
        this.terminospago = element;
        this.cdRef.detectChanges();
      }
    });
  }
  selectterminospagoscoins(id) {
    console.log(id);
    this.terminospagoscoins.forEach(element => {
      if (element.id == id) {
        this.terminospagocoins = element;
        this.cdRef.detectChanges();
      }
    });
  }
  selectaccs(id) {
    console.log(id);
    this.accs.forEach(element => {
      if (element.id == id) {
        this.acc = element;
        this.cdRef.detectChanges();
      }
    });
  }
  selectmetodospagos(id) {
    console.log(id);
    this.metodospagos.forEach(element => {
      if (element.id == id) {
        this.metodospago = element;
        this.cdRef.detectChanges();
      }
    });
  }
}
