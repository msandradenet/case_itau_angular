import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ToastrService } from 'ngx-toastr';
import { FundoService } from '../../servicos/fundo.service';


@Component({
  selector: 'app-fundo-criar',
  templateUrl: './fundo-criar.component.html'
})
export class FundoCriarComponent implements OnInit {

  listaTipos: any[] = []; 
  formFundo: FormGroup;

  constructor(
    private fundoService: FundoService,
    private Router: Router,
    private formBuilder: FormBuilder,
    private toastr: ToastrService
    ) { 
      this.formFundo =  this.formBuilder.group({
        codigo: ['', Validators.compose([Validators.required])],
        nome: ['', Validators.compose([Validators.required, Validators.minLength(3), Validators.maxLength(100)])],
        patrimonio: ['', Validators.compose([Validators.required])],
        cnpj: ['', Validators.compose([Validators.required, Validators.minLength(14) ])],
        codigo_tipo: ['', Validators.compose([Validators.required])]
      });
     }   

  ngOnInit(): void {
    this.fundoService.obterTipos().subscribe((response: any) => {
      this.listaTipos = response.result;
    });
  }

  onSubmitForm(form: any) { 
    if(this.formFundo.valid){      
      Swal.fire({
        title: '<strong">Confirmação</strong>',
        text: 'Deseja realmente cadastrar o fundo?',
        icon: 'question',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonText: 'Continuar',
        confirmButtonColor: '#343a40'
      }).then((result) => {
        if (result.isConfirmed) {
          this.fundoService.cadastrarFundo(form.value).subscribe((response: any) => {
            if (response.statusCode == 200) {
              this.toastr.success("Fundo cadastrado com sucesso!");
              this.Router.navigateByUrl("/fundo");
            } else {
              this.toastr.error(response.message);
            }
          },
          error =>{this.toastr.error(error.error.message); });
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

  aplicaCssErro(campo: any){
    return {
      'is-invalid': this.verificaValidTouched(campo),
      'is-valid': this.verificaValidTouched(campo),
    }
  }

  verificaValidTouched(campo: any){
    return !this.formFundo.get(campo)?.valid && (!!this.formFundo.get(campo)?.touched || !!this.formFundo.get(campo)?.dirty);
  }
}
