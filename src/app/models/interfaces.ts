export interface Iusuario {
    id?: number;
    nombre: string;
    email: string;
    password?: string;
    telefono?: string;
    celular?: string;
    username: string;
    rol: string;
    created_at?: string;
    updated_at?: string;
  }
  
  export interface AccessData {
    access_token: string;
    refresh_token: string;
  }
  
  export interface ILogin {
    usuario: string;
    password: string;
  }
  
  export interface Icategoria {
    id?: number;
    categoria: string;
    descripcion?: string;
    created_at?: string;
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
  
  
  
  
  