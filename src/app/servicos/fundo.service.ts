import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Fundo } from "../fundo/fundo";
import { environment } from "src/environments/environment";

@Injectable()
export class FundoService {

constructor(private http: HttpClient){}

    private urlApiFundos = environment.urlApiFundos;
    private v = "v2/";
    private request: any = {
        Codigo: String, 
        Patrimonio: Number
    }

    obterFundos() : Observable<Fundo[]>{
        return this.http
        .get<Fundo[]>(this.urlApiFundos + this.v + "fundo");
    }   

    obterFundo(codigo: number) : Observable<Fundo[]>{
        return this.http
        .get<Fundo[]>(this.urlApiFundos + this.v + "fundo/"+ codigo);
    }

    obterTipos() : Observable<Fundo[]>{
        return this.http
        .get<Fundo[]>(this.urlApiFundos + this.v + "tipoFundo");
    }

    cadastrarFundo(fundo: Fundo) {
        return this.http
        .post(this.urlApiFundos + this.v + "fundo", fundo).pipe((response: any) => response);
    }

    editarFundo(fundo: Fundo) {
        return this.http
        .put(this.urlApiFundos + this.v + "fundo", fundo).pipe((response: any) => response);
    }

    excluirFundo(codigo: number) {
        return this.http
        .delete(this.urlApiFundos + this.v + "fundo/" + codigo).pipe((response: any) => response);
    }

    alterarFundo(codigo: string, patrimonio: string) {
        this.request.Codigo = codigo;        
        this.request.Patrimonio = parseFloat(patrimonio);        
        return this.http
        .put(this.urlApiFundos + this.v + "fundo/patrimonio", this.request).pipe((response: any) => response);
    }
}