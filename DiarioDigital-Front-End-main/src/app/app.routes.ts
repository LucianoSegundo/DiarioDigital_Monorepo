import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { PrincipalComponent } from './components/principal/principal.component';
import { LoginComponent } from './components/login/login.component';
import { TelaRecuperarComponent } from './components/tela-recuperar/tela-recuperar.component';
import { LivroComponent } from './components/livro/livro.component';
import { CriarCapituloComponent } from './components/livro/componentesAssociados/criar-capitulo/criar-capitulo.component';
import { ListaComponent } from './components/livro/componentesAssociados/lista/lista.component';
import { ConteudoCapituloComponent } from './components/livro/componentesAssociados/conteudo-capitulo/conteudo-capitulo.component';
import { OpcoesLivroComponent } from './components/livro/componentesAssociados/opcoes-livro/opcoes-livro.component';
import { PerfilComponent } from './components/perfil/perfil.component';

export const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'principal', component: PrincipalComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recuperar', component: TelaRecuperarComponent },
    { path: 'perfil', component: PerfilComponent},
    {
        path: 'livros/:livroID', component: LivroComponent,
        children: [
            { path: '', component: ListaComponent },
            { path: 'configuracoes', component: OpcoesLivroComponent },
            { path: 'criar', component: CriarCapituloComponent },
            { path: 'capitulo/:capituloID', component: ConteudoCapituloComponent }
        ],
    },
    { path: '**', redirectTo: '/home', pathMatch: 'full' }

];
