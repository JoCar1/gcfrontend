import { HttpClient, HttpHeaders } from '@angular/common/http';
import { tap, map, switchMap, catchError } from 'rxjs/operators';
export function NgxRestangularService (RestangularProvider,AutentificacionService) {

  // console.log("funcion acceso token");
  let bearerToken;
  AutentificacionService.getAccessTokenn().subscribe((token) =>{
    bearerToken = token;
  });
  // console.log(bearerToken);
  let headerss = {
    // 'Content-Type': 'application/json',
      // 'Access-Control-Allow-Origin':'*',
      // 'Accept': 'application/json',
      // 'Accept': 'application/x.laravel.v1+json'
      // 'Content-Type':  'application/json',
      'Authorization': `Bearer ${bearerToken}`
      // 'X-Requested-With': 'XMLHttpRequest'
  };
  // console.log(headerss);

  // This function must return observable
  var refreshAccesstoken = function () {
    // Here you can make action before repeated request
    return AutentificacionService.refreshToken();
  };
  RestangularProvider
  //  .setBaseUrl('/api')
  // .setBaseUrl('http://10.0.8.5:8000/api')
   .setBaseUrl('http://127.0.0.1:8000/api')
  // .setBaseUrl('http://contratosmanaco/api')
  .setDefaultHeaders(headerss)// set static header
  .addResponseInterceptor((data, operation, what, url, response)=> {
    console.log(data);
    var extractedData;
    // .. to look for getList operations
    if (operation === "getList") {
      // .. and handle the data and meta data
      if(data.data.data) {
        var query = [
        {current_page:data.data.current_page,
        from:data.data.from,
        last_page:data.data.last_page,
        per_page:data.data.per_page,
        to:data.data.to,
        total:data.data.total}
        ];
        var daaa = data.data.data;
        extractedData = query.concat(daaa);
      }else{
        extractedData = data.data;
      }
    } else {
      extractedData = data;
    }
    return extractedData;
    // return data.data.data;
  })
  .addErrorInterceptor((response, subject, responseHandler) => {
    if (response.status === 422) {
      for (let error in response.data.errors) {
        return AutentificacionService.errorstatus(response.data.errors[error][0],response.data.message);
        // return ToastService.error(response.data.errors[error][0]);
      }
    }
    if (response.status === 500) {
      return AutentificacionService.errorstatus(response.statusText,"Error :-(");
      // return ToastService.error(response.statusText)
    }
    // if (response.status === 403 || response.status === 401) {
    if (response.status === 403 || response.status === 401) {
      // return AutentificacionService.returnLogin();
      refreshAccesstoken()
      .pipe(
        switchMap((refreshAccesstokenResponse:any) => {
          //If you want to change request or make with it some actions and give the request to the repeatRequest func.
          //Or you can live it empty and request will be the same.
          // update Authorization header
          // response.request.headers.set('Authorization', 'Bearer ' + refreshAccesstokenResponse.access_token)
          // return response.repeatRequest(response.request);
          const newHeaders = new HttpHeaders({
            'Content-Type':  'application/json',
            'Authorization': `Bearer ${refreshAccesstokenResponse.access_token}`
          });
          let newReq = response.request.clone({headers: newHeaders});
          return response.repeatRequest(newReq)
        })
        
      ).subscribe(
          res => responseHandler(res),
          err => {
            AutentificacionService.salir();
            subject.error(err);
          }
        );

        return false; // error handled
    }
    return true; // error not handled
  })// by each request to the server receive a token and update headers with it
  .addFullRequestInterceptor((element, operation, path, url, headers, params) => {
    let bearerToken;
    AutentificacionService.getAccessTokenn().subscribe((token) =>{
      bearerToken = token;
    });
    // let bearerToken = AutentificacionService.getAccessToken();
    return {
      headers: Object.assign({}, headers, {Authorization: `Bearer ${bearerToken}`})
    };
  });
}
