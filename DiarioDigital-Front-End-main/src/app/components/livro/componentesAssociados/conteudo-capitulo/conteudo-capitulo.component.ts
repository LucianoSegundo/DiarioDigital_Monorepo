import { Component } from '@angular/core';
import { CapituloResponse } from '../../../../DTO/response/capitulo/CapituloResponse';
import { AcessoApiService } from '../../../../service/acesso-api.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-conteudo-capitulo',
  standalone: true,
  imports: [MatPaginatorModule],
  templateUrl: './conteudo-capitulo.component.html',
  styleUrl: './conteudo-capitulo.component.css'
})
export class ConteudoCapituloComponent {
  listaIndex: number = 0;
  elementosIndex: number = 0;
  quantidadeElementos: number = 0;

  paginaIndex: number = 0;
  totalPaginas: number = 0;
  livroID: string | null = "";

  baseDados: CapituloResponse[] = [];

  constructor(private api: AcessoApiService) {
    this.receber();
  }

  receber() {

    this.livroID = sessionStorage.getItem("livroID");

    this.listaIndex = Number(sessionStorage.getItem("index"));

    this.paginaIndex = Number(sessionStorage.getItem("pAtual"));

    this.elementosIndex = ((this.paginaIndex) * 10) + this.listaIndex;

    let dados = sessionStorage.getItem("dados");
    if (dados != null) {
      this.baseDados = JSON.parse(dados as string);
      sessionStorage.removeItem("dados");

      this.quantidadeElementos = Number(sessionStorage.getItem("TItens"));
      sessionStorage.removeItem("TItens");

      this.totalPaginas = Number(sessionStorage.getItem("TPagina"));
      sessionStorage.removeItem("TPagina");

    }
    else this.coletarDados(this.paginaIndex);
  }
  paginador(evento: PageEvent) {


    if (evento.pageIndex > (evento.previousPageIndex as number)) {

      let index = this.listaIndex + 1;

      if (index > 9 && this.paginaIndex < this.totalPaginas) {

        this.coletarDados(this.paginaIndex + 1);

      }
      else if (index <= 9) {
        this.listaIndex = index;
        sessionStorage.setItem("index", this.listaIndex.toString())
      }

    }

    else if (evento.pageIndex < (evento.previousPageIndex as number)) {

      let index = this.listaIndex - 1;

      if (index < 0 && this.paginaIndex > 0) {

        this.coletarDados(this.paginaIndex - 1);

      }
      else if (index >= 0) {
        this.listaIndex = index;
        sessionStorage.setItem("index", this.listaIndex.toString())
      }

    }

  }

  coletarDados(pagina: number) {

    this.api.listarCapitulos(this.livroID as string, pagina).subscribe({
      next: (data) => {

        this.baseDados = data.content;
        this.totalPaginas = data.totalPages;
        this.quantidadeElementos = data.totalElements;

        if (pagina < this.paginaIndex) {

          this.listaIndex = 9;
          this.paginaIndex = pagina;
          sessionStorage.setItem("index", this.listaIndex.toString())
          sessionStorage.setItem("pAtual", this.paginaIndex.toString());
        }

        else if (pagina > this.paginaIndex) {

          this.listaIndex = 0;
          this.paginaIndex = pagina;
          sessionStorage.setItem("index", this.listaIndex.toString())
          sessionStorage.setItem("pAtual", this.paginaIndex.toString());
        }

      },
      error: (error: HttpErrorResponse) => {
        this.elementosIndex--;
        this.api.validarToken(error);

      }
    })
  }
}
