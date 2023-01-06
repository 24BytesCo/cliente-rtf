import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { ServiceGenericService } from '../../../../core/ServiceGeneric.service';
import { Equipo, EquipoInner } from '../../../../core/GenericaInterfaz';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.scss'],
})
export class GestionarComponent implements OnInit {
  listaEquiposInner: EquipoInner[];

  mostrarLoader: boolean = false;
  cantidadPorPagina: number= 5;
  totalEquipos:number= 0;
  desde: number= 0;
  pagina: number= 0;
  nombreBusqueda: string= '';

  constructor(private genericosService: ServiceGenericService,
    private router: Router,
    ) {
 //verificando si tiene token
 var tokenLocal = localStorage.getItem(environment.token);
 console.log('tokenLocal', tokenLocal);
 if (!tokenLocal) {
   this.router.navigate(['auth/login']);
 }

    this.mostrarLoader = true;
    this.cargarEquipos();
  }

  ngOnInit(): void {

  }

  cargarEquipos(){
    this.genericosService.contandoEquiposActivos().subscribe(res=>
      {

        this.totalEquipos = Number(Object.values(res.body)[0]);
      });
    this.genericosService.listandoEquiposInnerActivos(this.desde, this.nombreBusqueda, this.cantidadPorPagina).subscribe((res) => {
      this.listaEquiposInner = res.body;
    this.mostrarLoader = false;


    });
  }

  buscarPaginado(pagina: number){

    console.log("pagina click", pagina);


    this.pagina += pagina;
    console.log("pagina sima", this.pagina);

    if (pagina < 0 ) {
      pagina = 0;
    }

    if (this.pagina > this.totalEquipos ) {
      this.pagina = this.totalEquipos - 1;
    }

    this.desde = this.pagina*5;

    if (this.desde > this.totalEquipos) {
      this.pagina = this.pagina -1 ;
      this.desde = this.pagina*5;
    }
    this.mostrarLoader = true;
    console.log("pagina," , this.pagina);

    this.cantidadPorPagina = 5;
    this.cargarEquipos();

  }

  busquedaNombre(nombre:any){

    this.nombreBusqueda= nombre;
    this.cantidadPorPagina = 5;

    this.mostrarLoader = true;
    this.cargarEquipos();
  }

  editar(data:any){

  }
}
