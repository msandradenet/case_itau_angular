import { ChangeDetectorRef, Component, OnInit, ViewChild } from "@angular/core";
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { environment } from "src/environments/environment";
import { Fundo } from "./fundo";
import { FundoService } from "../servicos/fundo.service";

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

    this.fundoService.obterFundos()
      .subscribe((response: any) => {

        this.data = response.result;

        this.chRef.detectChanges();

        const table: any = $('table');

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
}