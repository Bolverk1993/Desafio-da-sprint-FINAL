export interface Contato {
  nome: string;
  sobrenome: string;
  email: string;
  cpf: string;
  telefone: string;
  contato: 'TELEFONE' | 'E-MAIL';
  receberPropagandas: boolean;
  aceitouLGPD: boolean;
}