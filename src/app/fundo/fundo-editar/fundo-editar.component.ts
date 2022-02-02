import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { FundoService } from '../../servicos/fundo.service';
import { Fundo } from '../fundo';

@Component({
  selector: 'app-fundo-editar',
  templateUrl: './fundo-editar.component.html',
  styles: [
  ]
})
export class FundoEditarComponent implements OnInit {

  idRoute: any;
  listaTipos: any[] = [];
  formFundo!: FormGroup;

  constructor(
    private fundoService: FundoService,
    private Router: Router,
    private ActivatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
  ) {
    this.carregarForm(new Fundo);
  }

  carregarForm(model: any) {
    this.formFundo = this.formBuilder.group({
      codigo: [model.codigo],
      nome: [model.nome, Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
      patrimonio: [model.patrimonio, Validators.compose([Validators.required])],
      cnpj: [model.cnpj, Validators.compose([Validators.required, Validators.minLength(14)])],
      codigo_tipo: [model.codigo_Tipo, Validators.compose([Validators.required])]
    })
  }

  ngOnInit(): void {
    this.idRoute = this.ActivatedRoute.snapshot.paramMap.get("id");

    this.fundoService.obterTipos().subscribe((response: any) => {
      this.listaTipos = response.result;
    });

    this.fundoService.obterFundo(this.idRoute).subscribe((response: any) => {
      this.carregarForm(response.result);
    });
  }

  onSubmitForm(form: any) {
    if (this.formFundo.valid) {
      Swal.fire({
        title: '<strong>Confirmação</strong>',
        text: 'Deseja realmente editar o fundo?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#343a40'
      }).then((result) => {
        if (result.isConfirmed) {
          this.fundoService.editarFundo(form.value).subscribe((response: any) => {
            if (response.statusCode == 200) {
              this.toastr.success("Fundo editado com sucesso!");
              this.Router.navigateByUrl("/fundo");
            } else {
              this.toastr.error(response.message);
            }
          },
            error => this.toastr.error(error.error.message));
        }
      });
    }  
    else{
      Object.keys(this.formFundo.controls).forEach(campo => {
        const controle = this.formFundo.get(campo);
        controle?.markAsDirty();
      });
    }   
  }

  aplicaCssErro(campo: any) {
    return {
      'is-invalid': this.verificaValidTouched(campo),
      'is-valid': this.verificaValidTouched(campo),
    }
  }

  verificaValidTouched(campo: any) {
    return !this.formFundo.get(campo)?.valid && (!!this.formFundo.get(campo)?.touched || !!this.formFundo.get(campo)?.dirty);
  }

}
