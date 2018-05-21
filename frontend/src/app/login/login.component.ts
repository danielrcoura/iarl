import { Component, OnInit } from '@angular/core';
import * as $ from 'jquery';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ViewContainerRef } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {

  model: any = {};
  _loginForm: FormGroup;
  constructor(private toastr: ToastsManager,
              private vRef: ViewContainerRef,
              private auth: AuthService,
              private fb: FormBuilder,
              private router: Router
    ) {
    this.toastr.setRootViewContainerRef(vRef);
    this.createForm();
  }

  ngOnInit() {
  }

  createForm(){
    this._loginForm = this.fb.group({
      username: [null, [Validators.required]],
      password: [null, [Validators.required, Validators.minLength(8)]],
    });
  }

  login() {
    if (!this._loginForm.valid){
      this.toastr.warning('Usuário ou senha inválido!', 'Alerta!');
    } else {
      this.model = this._loginForm.value;
      console.log(JSON.stringify(this.model));
      console.log(this.auth.login(this.model));
      
      console.log('tudo certo');
      //this.router.navigateByUrl('deskboard');
    }
    // if ( !this.model.username || !this.model.password ) {
    //   this.toastr.warning('Usuário ou senha inválido!', 'Alerta!');
    // } else {
    //   this.auth.login(this.model);
    //   console.log(JSON.stringify(this.model));
    // }
  }
}
