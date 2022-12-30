import { Component, OnInit } from '@angular/core';
import { Equipo, TipoEquipo } from 'src/app/core/GenericaInterfaz';
import { ServiceGenericService } from '../../../../core/ServiceGeneric.service';
import { RespuestaGeneral } from '../../auth/login/model/Login';

@Component({
  selector: 'app-nuevo',
  templateUrl: './nuevo.component.html',
  styleUrls: ['./nuevo.component.scss'],
})
export class NuevoComponent implements OnInit {
  equipo: Equipo = {
    nombre: '',
    categoria: '',
    codigo: '',
    descripcion: '',
    fechaAdquisicionEmpresa: new Date(),
    fechaRegistro: new Date(),
    id: '',
    imagenArrayUrl: [''],
    marca: '',
    modelo: '',
    noSerie: '',
    tipoEquipo: '',
  };
  listaTipoEquipo: TipoEquipo[];

  constructor(private genericoServicio: ServiceGenericService) {
    this.genericoServicio
      .listandoTiposEquipos()
      .subscribe((res: RespuestaGeneral<TipoEquipo[]>) => {
        this.listaTipoEquipo = res.body;
      });
  }

  ngOnInit(): void {}

  prueba(e: any) {
    console.log('cambio en tipo', this.equipo);
  }
}
