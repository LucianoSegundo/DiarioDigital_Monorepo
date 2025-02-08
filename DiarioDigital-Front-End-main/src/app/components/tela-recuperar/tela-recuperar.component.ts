import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RecuperarSenhaRequest } from '../../DTO/request/Usuario/RecuperarSenhaReques';
import { AcessoApiService } from '../../service/acesso-api.service';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-tela-recuperar',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './tela-recuperar.component.html',
  styleUrl: './tela-recuperar.component.css'
})
export class TelaRecuperarComponent {
  falha: boolean = false;
  aguardando: boolean = false;
  campoNome: string = "borverde";
  campoSenha: string = "borverde";
  campoPalavra: string = "borverde";

  constructor(private api: AcessoApiService, private router: Router) { }

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    palavraSeguranca: new FormControl('', [Validators.required, Validators.minLength(4)]),
    novaSenha: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  telaLogin() {
    this.router.navigate(["/login"]);
  }

  recuperar() {
    if (this.formulario.valid) {

      this.aguardando = true;
      this.falha = false;

      this.api.recuperarSenha(this.formulario.value as RecuperarSenhaRequest).subscribe({
        next: (data) => {

          setTimeout(() => {
            this.aguardando = false;
            this.telaLogin();
          }, 550);

        },
        error: (error) => {

          console.error('Erro ao fazer a requisição:', error.error.message);
          this.aguardando = false;
          this.falha = true;

        }
      })
    }
  }

  ConferirCampoRecu(alvo: string) {
    if (this.formulario.get(alvo)?.hasError("required") || this.formulario.get(alvo)?.hasError("minlength") || this.formulario.get(alvo)?.hasError("min")) {
      if (alvo == "nome") this.campoNome = "borVer";
      else if (alvo == "novaSenha") this.campoSenha = "borVer";
      else if (alvo == "palavraSeguranca") this.campoPalavra = "borVer";

    } else {
      if (alvo == "nome") this.campoNome = "borverde";
      else if (alvo == "novaSenha") this.campoSenha = "borverde";
      else if (alvo == "palavraSeguranca") this.campoPalavra = "borverde";

    }
  }
}
