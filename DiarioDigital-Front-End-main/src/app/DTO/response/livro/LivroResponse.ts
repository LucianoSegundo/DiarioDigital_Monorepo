export class LivroResponse {
  id: number;
  titulo: string;
  numeroCapitulos: number;

  constructor(id: number, titulo: string, numeroCapitulos: number) {
    this.id = id;
    this.titulo = titulo;
    this.numeroCapitulos = numeroCapitulos;
  }
}
