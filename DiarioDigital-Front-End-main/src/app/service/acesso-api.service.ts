import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../DTO/request/Usuario/LoginRequest';
import { UsuarioRequest } from '../DTO/request/Usuario/UsuarioRequest';
import { Observable } from 'rxjs';
import { LivroResponse } from '../DTO/response/livro/LivroResponse';
import { RecuperarSenhaRequest } from '../DTO/request/Usuario/RecuperarSenhaReques';
import { Router } from '@angular/router';
import { PaginacaoLivroResponse } from '../DTO/response/livro/PaginacaoLivroResponse';
import { LoginResponse } from '../DTO/response/usuario/LoginResponse';
import { UsuarioResponse } from '../DTO/response/usuario/UsuarioResponse';
import { PaginacaoCapituloResponse } from '../DTO/response/capitulo/PaginacaoCapituloResponse';
import { CapituloResponse } from '../DTO/response/capitulo/CapituloResponse';
import { CapituloRequest } from '../DTO/request/capitulo/CapituloRequest';

@Injectable({
  providedIn: 'root',
})
export class AcessoApiService {
  private userUrl: string = environment.urlBase + '/api/v1/usuario';
  private livroUrl: string = environment.urlBase + '/api/v1/livro';
  private capituloUrl: string = environment.urlBase + '/api/v1/capitulo';

  constructor(private http: HttpClient, private router: Router) { }

  private createHeaders(): HttpHeaders {
    const token: string = sessionStorage.getItem('token') || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    });
  }

  //Lidando com usuarios

  cadastrarUsu(usuario: UsuarioRequest): Observable<UsuarioResponse> {
    return this.http.post<UsuarioResponse>(this.userUrl + "/", usuario);
  }

  login(usuario: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(this.userUrl + '/login', usuario);
  }

  recuperarSenha(usuario: RecuperarSenhaRequest): Observable<UsuarioResponse> {
    return this.http.put<UsuarioResponse>(this.userUrl + '/recuperarSenha', usuario);
  }
  excluirUsuario(senha: string): Observable<any> {
    return this.http.delete<any>(this.userUrl + '/excluir', { headers: this.createHeaders(), body: senha });
  }

  //Lidando com Livros

  criarLivro(titulo: string): Observable<LivroResponse> {
    return this.http.post<LivroResponse>(this.livroUrl + '/criar', titulo, { headers: this.createHeaders() });
  }

  excluirLivro(senha: string, livroID: string): Observable<any> {
    return this.http.delete<any>(this.livroUrl + '/deletar/' + livroID, { headers: this.createHeaders(), body: senha });
  }

  verificarLivro(livroId: number): Observable<LivroResponse> {
    return this.http.get<LivroResponse>(this.livroUrl + '/' + livroId, { headers: this.createHeaders() });
  }

  listarLivro(pagina: number = 0): Observable<PaginacaoLivroResponse> {
    return this.http.get<PaginacaoLivroResponse>(this.livroUrl + '/listar?pagina=' + pagina, { headers: this.createHeaders() });
  }

  //Lidando com Capitulos

  criarCapitulo(capitulo: CapituloRequest, IDlivro: string): Observable<CapituloResponse> {
    return this.http.post<CapituloResponse>(this.capituloUrl + '/' + IDlivro, capitulo, { headers: this.createHeaders() });
  }

  listarCapitulos(IdLivro: string, pagina: number = 0): Observable<PaginacaoCapituloResponse> {
    return this.http.get<PaginacaoCapituloResponse>(this.capituloUrl + '/listar/' + IdLivro + '?pagina=' + pagina + '&ordarPor=numeroCapitulo', { headers: this.createHeaders() });
  }


  //Outros

  validarToken(error: HttpErrorResponse): boolean {
    if (error.status == 0) {
      
      sessionStorage.clear();
      alert("De alguma forma não foi possivel se conectar ao servidor")

      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);
      return true;
    }
    else if (error.status === 401) {

      if (sessionStorage.getItem("token") != null) {
        alert("sessão expirou, necessário refazer o login");
      }
      else
        alert("é necessário estar logado para acessar este conteudo");

      sessionStorage.clear();
      setTimeout(() => {
        this.router.navigate(['/login']);
      }, 1000);

      return true;
    }
    return false;
  }
}
