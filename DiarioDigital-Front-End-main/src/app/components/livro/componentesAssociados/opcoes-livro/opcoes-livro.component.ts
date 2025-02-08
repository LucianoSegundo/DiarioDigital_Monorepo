import { Component } from '@angular/core';
import { ButtonComponent } from "../../../button/button.component";
import { LivroResponse } from '../../../../DTO/response/livro/LivroResponse';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcessoApiService } from '../../../../service/acesso-api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-opcoes-livro',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './opcoes-livro.component.html',
  styleUrl: './opcoes-livro.component.css'
})
export class OpcoesLivroComponent {
  classe: string = "";
  livroID: string | null = "";
  livro: LivroResponse = { id: 0, titulo: "", numeroCapitulos: 0 };

  constructor(private api: AcessoApiService, private router: Router) {
    this.livroID = sessionStorage.getItem("livroID");
    this.requirirLivro();

  }
  formulario = new FormGroup({
    senha: new FormControl("", [Validators.required, Validators.minLength(4)]),
    confsenha: new FormControl("", [Validators.required, Validators.minLength(4)])

  })

  validarCampo() {
    if (this.formulario.value.confsenha != this.formulario.value.senha) this.classe = "erro";
    else this.classe = "";
  }

  excluirLivro() {
    if (this.formulario.valid && (this.formulario.value.senha == this.formulario.value.confsenha)) {
      this.api.excluirLivro(this.formulario.value.senha as string, this.livroID as string).subscribe({
        next: (data) => {
          this.router.navigate(["/principal"]);
        },
        error: (error: HttpErrorResponse) => {
          this.api.validarToken(error);
          alert("Algo deu errado: " + error.error.message)
        }
      })
    }
  }

  requirirLivro() {
    this.api.verificarLivro(Number.parseInt(this.livroID as string)).subscribe({
      next: (data) => {
        this.livro = data;
      },
      error: (error: HttpErrorResponse) => {
        this.api.validarToken(error);
        alert("Algo deu errado: " + error.error.message)
      }
    })
  }
}
