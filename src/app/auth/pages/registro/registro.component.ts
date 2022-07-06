import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import { nombreApellidoPattern, emailPattern, noPuedeSerStrider } from '../../../shared/validator/validaciones';
import { ValidatorService } from '../../../shared/validator/validator.service';
import { EmailValidatorService } from '../../../shared/validator/email-validator.service';


@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  miFormulario: FormGroup = this.fb.group({
    nombre: ['', [ Validators.required, Validators.pattern( this.validatorService.nombreApellidoPattern ) ]],
    email: ['', [ Validators.required, Validators.pattern( this.validatorService.emailPattern )], [ this.emailValidator ]],
    username: ['', [ Validators.required, this.validatorService.noPuedeSerStrider ]],
    password: ['', [ Validators.required, Validators.minLength(6) ]],
    password2: ['', [ Validators.required ]]
  }, {
    validators: [ this.validatorService.camposIguales('password', 'password2') ]
  });

  get errorEmailMsg(): string {

    const errors = this.miFormulario.get('email')?.errors;
    if ( errors?.['required'] ) {
      return 'El correo es obligatorio.'
    } else if ( errors?.['pattern'] ) {
      return 'El valor ingresado no tiene formato de correo.'
    } else if ( errors?.['emailTomado'] ) {
      return 'El correo ingresado ya ha sigo tomado.'
    }

    return '';
  }

  constructor( private fb: FormBuilder,
               private validatorService: ValidatorService,
               private emailValidator: EmailValidatorService ) { }

  ngOnInit(): void {

    this.miFormulario.reset({
      nombre: 'Joaquin Coelho',
      email: 'test1@test.com',
      username: 'joacoe1922',
      password: '123456',
      password2: '123456',
    })

  }

  campoNoValido( campo: string ) {
    return this.miFormulario.get(campo)?.invalid &&
              this.miFormulario.get(campo)?.touched;
  }

  submitFormulario() {

    if ( this.miFormulario.invalid ) {
      return;
    }

    console.log( this.miFormulario.value );

    this.miFormulario.markAllAsTouched();

  }

}
