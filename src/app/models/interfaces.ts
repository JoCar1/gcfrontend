export interface Isupplier {
  id?:number;
  group_code?: string;
  vendnum?: string;
  name?: string;
  short?: string;
  long_name?: string;
  vendgrp?: string;
  address1?: string;
  address2?: string;
  address3?: string;
  address4?: string;
  country?: string;
  postcode?: string;
  pobox_num?: string;
  pobox_postcode?: string;
  cmpny_postcode?: string;
  phone?: string;
  cell_phone?: string;
  telefax?: string;
  e_mail?: string;
  web_address?: string;
  telex?: string;
  class?: string;
  bankcode?: string;
  bankid?: string;
  bankname?: string;
  bankbranch?: string;
  bankadd1?: string;
  bankadd2?: string;
  bankadd3?: string;
  bankadd4?: string;
  cab_spain?: string;
  abi_spain?: string;
  pay_bank_charge?: string;
  swift?: string; //BIC
  iban?: string;
  bankclear?: string;
  bankacc?: string;
  vatnum?: string;
  vatctry?: string;
  taxpayer_num?: string;
  custnum?: string;
  old_accnum?: string;
  old_accsub?: string;
  nm_user_create?: string;
  dt_create?: string;
  nm_user_modify?: string;
  dt_modify?: string;
  suppltype?: string;
  codtransf?: string;
  bankacctype?: string;
  electronic_inv?: string;
  fixed_asset?: string;
  ssi_register?: string;
  pan?: string;
  circlenum?: string;
  svctax_regnum?: string;
  mvdebit?: string;
  mvcredit?: string;
  discount_pct?: string;
  gst_statecode?: string;
  po_tolerance?: string;
  agente_retenedor?: string;
  buen_contribuyente?: string;
  province_code?: string;
  rpe_id?: string;
  rpe_supplier?: string;
  bank_code_pref?: string;
  head_office_id?: string;
  branch_num?: string;
  cnic_num?: string;
  wth_tax?: string;
  vendnum_id?: string;
  vendnum_id_type?: string;
  inter_company?: string;
  non_compliant?: string;
  ccno?: string;
  ic_lcrcy_flag?: string;
  coy_num?: string;
  remdate?: string;
  reminder?: string;
  remlevel?: string;
  auto?: string;
  halt?: string;
  contact?: string;
  language?: string;
  invlimit?: string;
  maxpmt?: string;
  pmttype?: string;
  terms_code?: string;
  term_pay_cd?:string;
  disccode?: string;
  coynum_discds?: string;
  purchases?: string;
  returns?: string;
  comments?: string;
  profession?: string;
  recon_accnum?: string;
  recon_accsub?: string;
  recon_account_key?: string;
  alt_vendnum?: string;
  bata_account?: string;
  clear_with_cust?: string;
  cashchq_days?: string;
  cashchq_times?: string;
  onechqperinv?: string;
  dupinv_flag?: string;
  offset_accnum?: string;
  offset_accsub?: string;
  offset_account_key?: string;
  block?: string;
  codigo_concepto?: string;
  invoice_control?: string;
  tipo_docid?: string;
  extension_docid?: string;
  payment_type?: string;
  beneficiary_type?: string;
  beneficiary_status?: string;
  cod_prov?: string;
}

export interface Isupplier_coy {
  coy_num?: string;
  vendnum?: string;
  group_code?: string;
  remdate?: string;
  reminder?: string;
  remlevel?: string;
  auto?: string;
  halt?: string;
  contact?: string;
  language?: string;
  pmttype?: string;
  invlimit?: string;
  maxpmt?: string;
  terms_code?: string;
  disccode?: string;
  coynum_discds?: string;
  purchases?: string;
  returns?: string;
  comments?: string;
  profession?: string;
  recon_accnum?: string;
  recon_accsub?: string;
  recon_account_key?: string;
  alt_vendnum?: string;
  bata_account?: string;
  clear_with_cust?: string;
  cashchq_days?: string;
  cashchq_times?: string;
  onechqperinv?: string;
  dupinv_flag?: string;
  offset_accnum?: string;
  offset_accsub?: string;
  offset_account_key?: string;
  block?: string;
  nm_user_create?: string;
  dt_create?: string;
  nm_user_modify?: string;
  dt_modify?: string;
  codigo_concepto?: string;
  invoice_control?: string;
  tipo_docid?: string;
  extension_docid?: string;
  payment_type?: string;
  beneficiary_type?: string;
  beneficiary_status?: string;
}


export interface Iusuario {
    id?: number;
    nombre: string;
    email: string;
    password?: string;
    telefono?: string;
    celular?: string;
    username: string;
    rol: string;
    organizativa_unidad_id: string;
    created_at?: string;
    updated_at?: string;
  }

  export interface Iuser {
    id?: number;
    nombre?: string;
    email?: string;
    password?: string;
    telefono?: string;
    celular?: string;
    username?: string;
    rol?: string;
    created_at?: string;
    updated_at?: string;
    responsabilidad?: string;
  }

  export interface Iarchivo {
    id?: number;
    nombre?: string;
    url?: string;
    contrato_id?: string;
    crescripcion?: string;
    sistema?: string;
  }

  export interface Icontrato {
    id?: number;
    nit?:string;
    razon_social?:string;
    categoria_id?: string;//Tipo contrato
    numero?: string;
    descripcion?: string;
    departamento_id?: string;
    cuenta_id?:string,
    subcuenta_id?:string,
    tipo_gasto?:string,
    cadena?:string,
    campana?:string,
    pk_marca?:string,
    fecha_inicio?: string;
    fecha_fin?: string;
    monto?:number,
    moneda?:string,
    factura_retencion?:string,
    // user_id: number;
   
    // contrato_id?: string;
    // nombre?: string;
    // estado?: string;
    // telefono?: string;
    
    
    // fecha_plazo_cancelacion?: string;
    
    // fecha_prolongacion?: string;
    // responsable_contrato_user_id?: string;
    // organizativa_unidad_id?: string;
    // contacto_adicional?: string;
    codigo_oc?: string;
   
    
    
    
  }

  export interface Ipo_vendor {//eliminar
    vendor?: number;
    name: string;
    contact?: string;
    phone?: string;
    address_1?: string;
    address_3?: string;
    address_4?: string;
    celular?: string;
    email?: string;
    web?: number;
    numnit?: number;
   
  }

  export interface Iproveedor {
    id?: number;
    tipo?: string;
    descr_tipo: string;
    codigo?: string;
    nit?: string;
    nombre?: string;
    telefono?: string;
    fax?: string;
    celular?: string;
    direccion?: string;
    servicio?: string;
    sistema?: string;
  }

  
  export interface Iorden {
    nit?:string;
    tipo?: string;
    descr_tipo: string;
    codigo?: string;
    codigo_pdf?: string;
    fecha?: string;
    moneda?: string;
    tipo_cambio?: string;
    nombre_proveedor?: string;
    termino_pago?: string;
    descr_termino_pago?: string;
    razon_orden?: string;
    estado?: string;
    total?: number;
    terminos_pago?: Iterminos_pago;
     codigo_oc?: string;
     numero?: string;
     sistema?: string;
     sistema_p?: string;
     provedor?:string;
  }

  export interface Idepartamento {
    id?: number;
    nombre: string;
    created_at?: string;
  }

  export interface Iresponsable {
    codigo_oc?: string;
    user_id?: number;
    responsabilidad?: string;
    sistema?:string;
  }

  export interface Icuenta {
    accnum?: string;
    accsub?: string;
    accsubtype?: string;
    name?:string;
    account_key?:string;
  }
  
  export interface Isubcuenta {
    accnum?: string;
    accsub: string;
    accsubtype?: string;
    name?:string;
    account_key?:string;
  }



  export interface Iterminos_pago {
    tipo?: string;
    descr_tipo: string;
    codigo?: string;
    codigo_pdf?: string;
    fecha?: string;
    moneda?: string;
    tipo_cambio?: string;
    nombre_proveedor?: string;
    termino_pago?: string;
    descr_termino_pago?: string;
    razon_orden?: string;
    estado?: string;
    total?: string;
    servicio?: string;
    proveedor?: Iproveedor;
  }


  export interface Isocio {
    id?: number;
    nombre: string;
    pais?: string;
    ciudad?: string;
    direccion?: string;
    web?: string;
    contacto?: string;
    telefono?: string;
    celular?: string;
    email?: number;
    nit?: number;
    created_at?: string;
  }
  
  export interface AccessData {
    access_token: string;
    refresh_token: string;
  }
  
  export interface ILogin {
    username: string;
    password: string;
  }
  
  export interface Icategoria {
    id?: number;
    nombre: string;
    created_at?: string;
  }

  export interface Iuorganizativa {
    id?: number;
    nombre: string;
    created_at?: string;
  }

  export interface Irecordatorio {
    id?: number;
    codigo_oc?: string;
    asunto?: string;
    fecha?: string;
    recordatorio?: number;   
    sistema?:string; 
  }

  export interface Icuota {
    id?: number;
    numero_cuota?: string;
    monto?: number;
    fecha_pago?: any; 
    codigo_oc?:string;
    sistema?:string;
  }

// export interface Ipais {
//     id?: number;
//     pais: string;
//     imagen: string;
//     descripcion?: string;
//     latitud: number;
//     longitud: number;
//     codigo: string;
//     created_at?: string;
//   }
  
//   export interface Iciudad {
//     id?: number;
//     pais_id: string;
//     pais?: Ipais;
//     ciudad_id?: number;
//     ciudad: string;
//     imagen: string;
//     descripcion?: string;
//     latitud: number;
//     longitud: number;
//     created_at?: string;
//   }
  
//   export interface Iubicacion {
//     id?: number;
//     ciudad_id: string;
//     cliente_servicio_id: Ipais;
//     ubicacion: string;
//     descripcion?: string;
//     latitud: number;
//     longitud: number;
//     created_at?: string;
//   }
  
//   export interface Itiposervicio {
//     id?: number;
//     tipo: string;
//     imagen: string;
//     descripcion?: string;
//     created_at?: string;
//   }
  
//   export interface Ihorario {
//     id?: number;
//     cliente_servicio_id: string;
//     horario: string;
//     dia: string;
//   }
  
//   export interface Iservicio {
//     id?: number;
//     servicio_tipo_id: string;
//     servicio: string;
//     imagen: string;
//     descripcion?: string;
//     created_at?: string;
//   }
  
  
//   export interface Icliente {
//     id?: number;
//     ciudad_id: string;
//     nombre: string;
//     imagen: string;
//     celular?: string;
//     telefono?: string;
//     fecha_nacimiento?: string;
//     user?: Iuser;
//     ciudad?: Iciudad;
//     rol: string;
//     created_at?: string;
//   }
  
//   export interface Ipago {
//     id?: any;
//     nombre?:string;
//     forma_pago_id: number;
//     cliente_servicio_id: number;
//     plan_id: number;
//     nit?:string;
//     pago: number;
//     transaccion?: string;
//     detalle?: string;
//     inicio?: string;
//     fin?: string;
//     estado?: string;
//     created_at?: string;
//   }
  
//   export interface Iformapago {
//     id?: any;
//     forma: string;
//     descripcion?: string;
//     created_at?: string;
//   }
  
//   export interface Iplan {
//     id?: any;
//     plan: string;
//     detalle?: string;
//     precio: number;
//     descuento: number;
//     total: number;
//     dias: number;
//     pais_id: number;
//     estado: string;
//     created_at?: string;
//   }
  
//   export interface Iuser {
//     id?: number;
//     usuario: string;
//     email?: string;
//   }
  
//   export interface IclienteServicio {
//     id?: number;
//     cliente_id: number;
//     ciudad_id: number;
//     servicio_id: number;
//     servicio?: Iservicio;
//     nombre?: string;
//     imagen: string;
//     descripcion?: string;
//     horario?: string;
//     direccion: string;
//     tabs?: string;
//     web?: string;
//     whatsapp?: string;
//     facebook?: string;
//     instagram?: string;
//     email?: string;
//     celular: string;
//     telefono?: string;
//     estado: string;
//     created_at?: string;
//   }
  
  
  
  
  
//   export interface Iseccion {
//     id?: number;
//     seccion: string;
//     privado: string;
//     descripcion?: string;
//     created_at?: string;
//   }
  
//   export interface Ivideo {
//     id?: number;
//     categoria_id: number;
//     categoria: Icategoria;
//     seccion_id: number;
//     seccion: Iseccion;
//     titulo: string;
//     duracion: string;
//     url: string;
//     anho: string;
//     estreno: string;
//     descripcion?: string;
//     created_at?: string;
//   }
  
//   export interface Iserie {
//     id?: number;
//     categoria_id: number;
//     categoria: Icategoria;
//     seccion_id: number;
//     seccion: Iseccion;
//     titulo: string;
//     anho: string;
//     descripcion: string;
//     created_at?: string;
//   }
  
//   export interface Iimagen {
//     id?: any;
//     imagen: string;
//     imagentable_id: any;
//     imagentable_type: string;
//   }
  
//   export interface Icapitulo {
//     id?: any;
//     serie_id: number;
//     serie: Iserie;
//     capitulo: string;
//     titulo: string;
//     url: string;
//     temporada: string;
//     descripcion: string;
//     created_at?: string;
//   }
  
//   export interface IcuentaVendedor {
//     id?: any;
//     user_id: number;
//     user: Iusuario;
//     plan_id: number;
//     plan: Iplan;
//     cantidad: number;
//     created_at?: string;
//   }
  
  
  
  
  