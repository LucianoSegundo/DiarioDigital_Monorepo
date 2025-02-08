import { Component, OnInit } from '@angular/core';
import { ButtonComponent } from "../../../button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcessoApiService } from '../../../../service/acesso-api.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CapituloRequest } from '../../../../DTO/request/capitulo/CapituloRequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-criar-capitulo',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './criar-capitulo.component.html',
  styleUrl: './criar-capitulo.component.css'
})
export class CriarCapituloComponent {
  tamanhoConteudo: number = 5000;
  tituloClass: string = "";
  ConteudoClass: string = "";
  mensagemERRo: string = ""
  livroID: string | null = "";

  aguardando: boolean = false;
  sucesso: boolean = false;
  falha: boolean = false;

  constructor(private api: AcessoApiService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.livroID = sessionStorage.getItem("livroID");

  }

  formulario = new FormGroup({
    titulo: new FormControl('', [Validators.required, Validators.minLength(4), Validators.maxLength(55)]),
    Conteudo: new FormControl('', [Validators.required, Validators.minLength(50), Validators.maxLength(this.tamanhoConteudo)])
  })


  validarCampo(alvo: string) {

    if (this.formulario.get(alvo)?.hasError("required") || this.formulario.get(alvo)?.hasError("minlength")) {
      if (alvo == "titulo") {
        this.tituloClass = "erro";
      }
      else if (alvo == "Conteudo") {
        this.ConteudoClass = "erro";
      }
    }
    else {
      if (alvo == "titulo") {
        this.tituloClass = "";
      }
      else if (alvo == "Conteudo") {
        this.ConteudoClass = "";
      }
    }
    if (alvo == "Conteudo") { }

  }

  criarCapitulo() {
    this.falha = false;
    this.aguardando = true;
    if (this.formulario.valid) {
      this.api.criarCapitulo(this.formulario.value as CapituloRequest, this.livroID as string).subscribe({
        next: (data) => {
          this.aguardando = false;
          this.sucesso = true
          this.formulario.reset()

          setTimeout(() => {
            this.sucesso = false;
          }, 3000);

        },
        error: (error: HttpErrorResponse) => {
          this.tratarErro(error);
        }
      });
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
      this.mensagemERRo = error.error.mensagem;
      this.aguardando = false;
      this.falha = true;

      setTimeout(() => {
        this.falha = false;
      }, 1000);
    };
  }


}
