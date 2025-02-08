import { Component } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { ActivatedRoute, Router } from '@angular/router';
import { CapituloResponse } from '../../../../DTO/response/capitulo/CapituloResponse';
import { AcessoApiService } from '../../../../service/acesso-api.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-lista',
  standalone: true,
  imports: [MatTableModule, MatPaginator],
  templateUrl: './lista.component.html',
  styleUrl: './lista.component.css'
})
export class ListaComponent {
  colunas: string[] = ["icone", "titulo", "nCap"];
  paginaAtual: number = 0;
  totalPaginas: number = 0;
  totalItens: number = 0;
  baseDados: CapituloResponse[] = [];

  livroID: string | null = "";

  constructor(private router: Router, private api: AcessoApiService) {
    this.livroID = sessionStorage.getItem("livroID");

    this.coletarCapitulos();
  }

  paginador(evento: PageEvent) {
    this.coletarCapitulos(evento.pageIndex);
    this.paginaAtual = evento.pageIndex;
  }

  acessarCapitulo(id: number) {
    this.transferir(id);
    this.router.navigate(["/livros/" + this.livroID + "/capitulo/" + id]);
  }

  coletarCapitulos(pagina: number = 0) {
    if (this.livroID != null) {
      this.api.listarCapitulos(this.livroID as string, pagina).subscribe({
        next: (data) => {
          this.totalPaginas = data.totalPages;
          this.totalItens = data.totalElements;
          this.baseDados = data.content;

        },
        error: (error: HttpErrorResponse) => {
          this.tratarErro(error);
        }
      })
    }

  }

  tratarErro(error: HttpErrorResponse) {

    if (this.api.validarToken(error)) {

    }
    else if (error.status == 404) {

      alert("O livro não foi encontrado")
      setTimeout(() => {
        sessionStorage.removeItem("livroID");
        this.router.navigate(["/principal"]);
      }, 1000);
    }
    else {
      alert("algo deu errado")
      setTimeout(() => {
        sessionStorage.removeItem("livroID");
        this.router.navigate(["/principal"]);
      }, 1000);
    };
  }

  transferir(id: number) {
    let dados = JSON.stringify(this.baseDados);
    sessionStorage.setItem("dados", dados);
    sessionStorage.setItem("pAtual", this.paginaAtual.toString());
    sessionStorage.setItem("TItens", this.totalItens.toString());
    sessionStorage.setItem("TPagina", this.totalPaginas.toString());
    sessionStorage.setItem("index", this.baseDados.findIndex(x => x.id == id).toString());

  }
}
