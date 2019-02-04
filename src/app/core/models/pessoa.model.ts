import { Endereco } from './endereco.model';

export class Pessoa {
  codigo: number;
  nome: string;
  ativo = true;
  endereco: Endereco = new Endereco();
}
