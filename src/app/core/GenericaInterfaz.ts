export interface UsuarioToken {
  usuario: string;
  id: string;
  correoElectronico: string;
  primerNombre: string;
  segundoNombre: string;
  primerApellido: string;
  segundoApellido: string;
  tUsuario: string;
  ex: Date;
  iat: Date;
}

export class Equipo {
  id: string;
  categoria: string;
  equipoPrincipal: string;
  nombre: string;
  marca: string;
  noSerie: string;
  descripcion: string;
  fechaRegistro: Date;
  fechaAdquisionEmpresa: Date;
  imagenArrayUrl: Array<string>;
  modelo: string;
  codigo: string;
  tipoEquipo: string;

  constructor() {
    this.id = '';
    this.categoria = '';
    this.nombre = '';
    this.marca = '';
    this.noSerie = '';
    this.equipoPrincipal = '';
    this.descripcion = '';
    this.fechaRegistro = new Date();
    this.fechaAdquisionEmpresa = new Date();
    this.imagenArrayUrl = [''];
    this.modelo = '';
    this.codigo = '';
    this.tipoEquipo = '';
  }
}

class Categoria{
codigo: string;
descripcion: string;
}

class TipoEquipoInt{
  codigo: string;
  descripcion: string;
  }

  class EquipoPrincipal{
    id: string;
    codigo: string;
    nombre: string;
    }
export class EquipoInner {
  id: string;
  categoria: Categoria;
  equipoPrincipal:EquipoPrincipal ;
  nombre: string;
  imagenPrincipal: string;
  marca: string;
  noSerie: string;
  descripcion: string;
  fechaRegistro: Date;
  fechaAdquisionEmpresa: Date;
  imagenArrayUrl: Array<string>;
  modelo: string;
  codigo: string;
  tipoEquipo: TipoEquipoInt;


}

export class TipoEquipo {
  id: string;
  descripcion: string;
  codigo: string;
}

export class CategoriaEquipo {
  id: string;
  descripcion: string;
  codigo: string;
  estado: BigInteger;
}
