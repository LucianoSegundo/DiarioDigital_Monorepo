import { Component } from '@angular/core';
import { AcessoApiService } from '../../service/acesso-api.service';
import { Router } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ButtonComponent } from '../button/button.component';
import { LoginRequest } from '../../DTO/request/Usuario/LoginRequest';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  falha: boolean = false;
  aguardando: boolean = false;
  CampoNome: string = "borbranco";
  campoSenha: string = "borbranco";

  constructor(private api: AcessoApiService, private router: Router) { }

  formulario = new FormGroup({
    nome: new FormControl('', [Validators.required, Validators.minLength(4)]),
    senha: new FormControl('', [Validators.required, Validators.minLength(4)])

  });

  telaRecu() {
    this.router.navigate(["/recuperar"]);
  }
  telaHome() {
    this.router.navigate(["/home"]);
  }

  ConferirCampoLogin(alvo: string) {
    if (this.formulario.get(alvo)?.hasError("required") || this.formulario.get(alvo)?.hasError("minlength") || this.formulario.get(alvo)?.hasError("min")) {
      if (alvo == "nome") this.CampoNome = "borVer";
      else if (alvo == "senha") this.campoSenha = "borVer";

    } else {
      if (alvo == "nome") this.CampoNome = "borbranco";
      else if (alvo == "senha") this.campoSenha = "borbranco";

    }
  }

  logar() {
    if (this.formulario.valid) {

      this.aguardando = true;
      this.falha = false;

      this.api.login(this.formulario.value as LoginRequest).subscribe({
        next: (data) => {
          this.loginSucesso(data);
        },
        error: (error) => {
          this.loginError(error);
        }
      })
    }
  }

  private loginSucesso(data: any) {
    let acesso = data.accessToken;

    sessionStorage.setItem("token", acesso);

    setTimeout(() => {
      this.aguardando = false;
      this.router.navigate(["/principal"]);
    }, 550);

  }
  private loginError(error: HttpErrorResponse) {
    this.aguardando = false;
    this.falha = true;
    console.error('Erro ao fazer a requisição: ' + error.error.message);
  }

}
