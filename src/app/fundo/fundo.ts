import { TipoFundo } from "./tipoFundo";

export class Fundo {
    codigo!: string;
    nome!: string;
    cnpj!: string;
    patrimonio!:  number;
    codigo_tipo!: number;   
    tipoFundo!: TipoFundo;  
}
