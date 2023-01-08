import { Component, OnInit, TemplateRef } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { ServiceGenericService } from '../../../../core/ServiceGeneric.service';
import { Equipo, EquipoInner } from '../../../../core/GenericaInterfaz';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { EventosManualesService } from 'src/app/core/EventosManuales.service';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.scss'],
})
export class GestionarComponent implements OnInit {
  listaEquiposInner: EquipoInner[];

  mostrarLoader: boolean = false;
  cantidadPorPagina: number = 5;
  totalEquipos: number = 0;
  desde: number = 0;
  pagina: number = 0;
  nombreBusqueda: string = '';
  idusuarioEditar: string = '';

  constructor(
    private genericosService: ServiceGenericService,
    private router: Router,
    private modalService: NgbModal,
    private eventosManualesService: EventosManualesService
  ) {}

  ngOnInit(): void {
    //Observable para estar escuchando los cambios en la edición
    this.eventosManualesService.edicionEquipoSatrisfactoria$.subscribe(
      (res) => {
        console.log('CAmbios de valor en edicion = ', res);
        if (res) {
          this.mostrarLoader = true;

          this.cargarEquipos();

          this.modalService.dismissAll();
        }
      }
    );

    this.verificandoPermisos();
    this.mostrarLoader = true;
    this.cargarEquipos();
  }

  verificandoPermisos() {
    //verificando si tiene token
    var tokenLocal = localStorage.getItem(environment.token);
    console.log('tokenLocal', tokenLocal);
    if (!tokenLocal) {
      this.router.navigate(['auth/login']);
    }
  }

  cargarEquipos() {
    this.genericosService.contandoEquiposActivos().subscribe((res) => {
      this.totalEquipos = Number(Object.values(res.body)[0]);
    });
    this.genericosService
      .listandoEquiposInnerActivos(
        this.desde,
        this.nombreBusqueda,
        this.cantidadPorPagina
      )
      .subscribe((res) => {
        this.listaEquiposInner = res.body;
        this.mostrarLoader = false;
      });
  }

  buscarPaginado(pagina: number) {
    console.log('pagina click', pagina);

    this.pagina += pagina;
    console.log('pagina sima', this.pagina);

    if (pagina < 0) {
      pagina = 0;
    }

    if (this.pagina > this.totalEquipos) {
      this.pagina = this.totalEquipos - 1;
    }

    this.desde = this.pagina * 5;

    if (this.desde > this.totalEquipos) {
      this.pagina = this.pagina - 1;
      this.desde = this.pagina * 5;
    }
    this.mostrarLoader = true;
    console.log('pagina,', this.pagina);

    this.cantidadPorPagina = 5;
    this.cargarEquipos();
  }

  busquedaNombre(nombre: any) {
    this.nombreBusqueda = nombre;
    this.cantidadPorPagina = 5;

    this.mostrarLoader = true;
    this.cargarEquipos();
  }

  openXlModalEditar(content: TemplateRef<any>, idEquipo: string) {
    console.log('idEquipoEditar', idEquipo);

    this.idusuarioEditar = idEquipo;

    console.log('content', content);

    this.modalService
      .open(content, { size: 'xl' })
      .result.then((result) => {
        console.log('Modal closed' + result);
      })
      .catch((res) => {});
  }
}
