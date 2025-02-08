export class CapituloResponse {
  id: number;
  titulo: string;
  Conteudo:string;
  numeroCapitulo: number;

  constructor(id: number, titulo: string,Conteudo:string, numeroCapitulo: number) {
    this.id = id;
    this.titulo = titulo;
    this.Conteudo = Conteudo;
    this.numeroCapitulo = numeroCapitulo;
  }
}
