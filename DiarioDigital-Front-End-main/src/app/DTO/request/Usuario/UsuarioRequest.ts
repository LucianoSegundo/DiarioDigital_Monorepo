export class UsuarioRequest {
    nome: string;
    senha: string;
    palavraSegu: string;
    idade: number;
  
    constructor(nome: string, senha: string, palavraSegu: string, idade: number) {
      this.nome = nome;
      this.senha = senha;
      this.palavraSegu = palavraSegu;
      this.idade = idade;
    }
  }
  