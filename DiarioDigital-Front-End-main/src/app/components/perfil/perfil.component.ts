import { Component } from '@angular/core';
import { ButtonComponent } from "../button/button.component";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AcessoApiService } from '../../service/acesso-api.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
import { UsuarioResponse } from '../../DTO/response/usuario/UsuarioResponse';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [ButtonComponent, ReactiveFormsModule],
  templateUrl: './perfil.component.html',
  styleUrl: './perfil.component.css'
})
export class PerfilComponent {
  classe: string = "";

  constructor(private api: AcessoApiService, private router: Router) {
  }
  formulario = new FormGroup({
    senha: new FormControl("", [Validators.required, Validators.minLength(4)]),
    confsenha: new FormControl("", [Validators.required, Validators.minLength(4)])

  })

  validarCampo() {
    if (this.formulario.value.confsenha != this.formulario.value.senha) this.classe = "erro";
    else this.classe = "";
  }

  excluirUsuario() {
    if (this.formulario.valid && (this.formulario.value.senha == this.formulario.value.confsenha)) {
      this.api.excluirUsuario(this.formulario.value.senha as string).subscribe({
        next: (data) => {
          sessionStorage.clear();
          this.router.navigate(["/home"]);
        },
        error: (error: HttpErrorResponse) => {
          this.api.validarToken(error);
          alert("Algo deu errado: " + error.error.message)
        }
      })
    }
  }

}
