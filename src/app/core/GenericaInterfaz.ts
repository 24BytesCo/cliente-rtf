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
  nombre: string;
  marca: string;
  noSerie: string;
  descripcion: string;
  fechaRegistro: Date;
  fechaAdquisicionEmpresa: Date;
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
    this.descripcion = '';
    this.fechaRegistro = new Date();
    this.fechaAdquisicionEmpresa = new Date();
    this.imagenArrayUrl = [''];
    this.modelo = '';
    this.codigo = '';
    this.tipoEquipo = '';
  }
}

export class TipoEquipo {
  id: string;
  descripcion: string;
  codigo: string;
}
