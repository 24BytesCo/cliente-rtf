import { Component, OnInit } from '@angular/core';
import { DataTable } from 'simple-datatables';
import { ServiceGenericService } from '../../../../core/ServiceGeneric.service';
import { Equipo, EquipoInner } from '../../../../core/GenericaInterfaz';

@Component({
  selector: 'app-gestionar',
  templateUrl: './gestionar.component.html',
  styleUrls: ['./gestionar.component.scss'],
})
export class GestionarComponent implements OnInit {
  listaEquiposInner: EquipoInner[];

  constructor(private genericosService: ServiceGenericService) {

    this.genericosService.alertaTimer("");
    this.genericosService.listandoEquiposInnerActivos().subscribe((res) => {
      this.listaEquiposInner = res.body;

      const dataTable = new DataTable('#dataTableExample');


      for (let index = 0; index < this.listaEquiposInner.length; index++) {

        let url = this.listaEquiposInner[index].imagenPrincipal;
        if (!url) {
          url = "../../../../../assets/images/others/noImagen.png";
        }
        console.log("url: " + url);

        let newRowsD = [
           '<img style="height: 50px; width: auto;" src="'+ url +'">',
          this.listaEquiposInner[index].nombre,
          this.listaEquiposInner[index].codigo,
          this.listaEquiposInner[index].tipoEquipo.descripcion,
          this.listaEquiposInner[index].categoria.descripcion,
          this.listaEquiposInner[index].equipoPrincipal.nombre ? this.listaEquiposInner[index].equipoPrincipal.nombre +" | Cod: "+this.listaEquiposInner[index].equipoPrincipal.codigo: "N/A",
          ''
        ];
        dataTable.rows.add(newRowsD);
      }



    this.genericosService.alertaTimerClose("");

    });
  }

  ngOnInit(): void {

  }

  editar(data:any){
    console.log("data click", data);

  }
}
