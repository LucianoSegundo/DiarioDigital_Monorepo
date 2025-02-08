import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { ButtonComponent } from '../button/button.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  anterior: string = "";
  localizacao: string = "";
  variavel: boolean = false;
  constructor(public router: Router) {
    this.coletarRota();
  }

  botaoEntrar() {
    setTimeout(() => {
      this.router.navigate(["/login"]);
    }, 500);
  }

  botaoEncerrar() {
    setTimeout(() => {
      sessionStorage.clear()
      this.router.navigate(["/login"]);
    }, 500);

  }

  botaoPerfil() {
    setTimeout(() => {
      this.router.navigate(["/perfil"]);
    }, 500);
  }
  botaoVoltar() {
    setTimeout(() => {
      this.router.navigate([this.anterior]);
    }, 500);
  }

  coletarRota() {
    this.router.events.pipe(

      filter(event => event instanceof NavigationEnd)

    ).subscribe((event: NavigationEnd) => {
      this.anterior = this.localizacao;
      this.localizacao = event.url;

    })
  }
}
