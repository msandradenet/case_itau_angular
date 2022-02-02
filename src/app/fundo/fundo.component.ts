import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { environment } from "src/environments/environment";
import { Fundo } from "./fundo";
import { FundoService } from "../servicos/fundo.service";

const table: any = $('table');

@Component({
  selector: 'app-fundos',
  templateUrl: './fundo.component.html'
})

export class FundosComponent implements OnInit {

  public data!: Fundo[];  

  constructor(
    private fundoService: FundoService,
    private chRef: ChangeDetectorRef,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.obterFundos();    
  }

  obterFundos(){
    this.fundoService.obterFundos()
      .subscribe((response: any) => {

        this.data = response.result;

        this.chRef.detectChanges();

        table.DataTable(environment.tableOptions);
      },
        error => this.toastr.error(error)
      );
  }

  excluirFundo(id: any) {
    Swal.fire({
      title: '<strong">Confirmação</strong>',
      text: 'Deseja realmente excluir o fundo?',
      icon: 'question',
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#343a40'
    }).then((result) => {
      if (result.isConfirmed) {
        this.fundoService.excluirFundo(id).subscribe((response: any) => {
          if (response.statusCode == 200) {

            this.data.forEach((value, index) => {
              if (value.codigo == id) {
                this.data.splice(index, 1);
              }
            });

            this.toastr.success("Fundo excluido com sucesso!");
          } else {
            this.toastr.error(response.message);
          }
        },
        error => this.toastr.error(error));
      }
    });
  }

  alterarPatrimonio(codigo: any, patrimonio: any) {
    let input: any;
    Swal.fire({
      title: 'Qual o novo valor de patrimônio?',
      icon: 'question',
      html: `
    <input
      type="number"
      value="${patrimonio}"
      class="form-control"
      id="sweetPatrimonio">`,
      showCancelButton: true,
      cancelButtonText: 'Cancelar',
      confirmButtonText: 'Continuar',
      confirmButtonColor: '#343a40',
      showLoaderOnConfirm: true,
      didOpen: () => {
        input = Swal.getHtmlContainer()?.querySelector('#sweetPatrimonio');
      }
    }).then((result) => {
      if (input.value) {      
      if (result.isConfirmed) {
        this.fundoService.alterarFundo(codigo, input.value).subscribe((response: any) => {
          if (response.statusCode == 200) {
            this.toastr.success("Patrimônio alterado com sucesso!");
            this.obterFundos();  
          } else {
            this.toastr.error(response.message);
          }
        },
        error => this.toastr.error(error.error.message));
      }
    }
    else{
      this.toastr.error("Digite um valor válido para o patrimônio!");
    }
    });
  }
}