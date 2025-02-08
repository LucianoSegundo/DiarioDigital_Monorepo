export class RecuperarSenhaRequest {
    nome: string;
    novaSenha: string;
    palavraSeguranca: string;
   
  
    constructor(nome: string, novaSenha: string, palavraSeguranca: string) {
      this.nome = nome;
      this.novaSenha= novaSenha;
      this.palavraSeguranca = palavraSeguranca;
    }
  }
  