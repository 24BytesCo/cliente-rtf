import { Injectable } from '@angular/core';
import { catchError, map, retry, throwError } from 'rxjs';
import Swal from 'sweetalert2';
import * as router from '@angular/router';

import {
  RespuestaLogin,
  RespuestaGeneral,
} from '../views/pages/auth/login/model/Login';
import { environment } from 'src/environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UsuarioToken } from './GenericaInterfaz';
@Injectable({
  providedIn: 'root',
})
export class ServiceGenericService {
  constructor(private http: HttpClient, private router: router.Router) {}

  alertaSuperiorDerechaPequena(mensaje: string, tipo: string) {
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

    if (tipo != 'success') {
      Toast.fire({
        icon: 'error',
        title: mensaje,
      });
      return;
    }

    Toast.fire({
      icon: 'success',
      title: mensaje,
    });
  }

  redireccionarRutaToken(nombreRuta: string, token: string) {
    switch (nombreRuta) {
      case 'tablero-principal':
        this.redirrecionTableroPrincipal(token);
        break;

      case 'tablero-principal-ws':
        break;

      default:
        // this.redirrecionTableroPrincipal(token);

        break;
    }
  }

  redirrecionTableroPrincipal(token: string) {
    this.validandoTokenObteniendoValores(token).subscribe(
      (res: RespuestaGeneral<UsuarioToken>) => {
        const tUsuario = res.body.tUsuario;
        res.body.tUsuario = '';
        localStorage.setItem(
          environment.datosUsuario,
          JSON.stringify(res.body)
        );

        switch (tUsuario) {
          case 'ADMINRTF':
            console.log('ADMIN RTF');
            this.router.navigate(['/dashboard']);

            break;

          default:
            break;
        }
      }
    );
  }

  validandoTokenObteniendoValores(token: string) {
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + token,
      }),
    };
    return this.http
      .get<RespuestaGeneral<UsuarioToken>>(
        `${environment.urlApi}autenticacion/verificar`,
        httpOptions
      )
      .pipe(
        retry(0),
        catchError(this.handleError),
        map((response: any) => {
          return response;
        })
      );
  }

  armandoNombreCompleto() {
    var objJsonString = localStorage.getItem(environment.datosUsuario) || '';

    const objJson: UsuarioToken = JSON.parse(objJsonString);

    console.log('objJson', objJson);

    var nombreCompleto =
      objJson.primerNombre +
      ' ' +
      objJson.segundoNombre +
      ' ' +
      objJson.primerApellido +
      ' ' +
      objJson.segundoApellido;

    return nombreCompleto.replace('  ', ' ');
  }

  consultandoTodosDatosUsuarioLocales() {
    var objJsonString = localStorage.getItem(environment.datosUsuario) || '';

    return JSON.parse(objJsonString);
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
