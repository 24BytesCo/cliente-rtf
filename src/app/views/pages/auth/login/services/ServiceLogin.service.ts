import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { RespuestaLogin } from '../model/Login';
import { catchError, map, retry, throwError } from 'rxjs';
import { ServiceGenericService } from '../../../../../core/ServiceGeneric.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class ServiceLoginService {
  constructor(private http: HttpClient) {}

  login(usuario: string, contrasenia: string) {
    console.log('environment.urlApi', environment.urlApi);

    return this.http
      .post<RespuestaLogin>(`${environment.urlApi}autenticacion/login`, {
        usuario,
        contrasenia,
      })
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  private handleError(error: any) {
    console.error('error ', error.error);

    console.log('error.error.body', error.error.body);

    const mensaje: string = error.error.body;
    const Toast = Swal.mixin({
      toast: true,
      position: 'top-end',
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer);
        toast.addEventListener('mouseleave', Swal.resumeTimer);
      },
    });

    Toast.fire({
      icon: 'error',
      title: mensaje,
    });

    return throwError(error.error);
  }
}
