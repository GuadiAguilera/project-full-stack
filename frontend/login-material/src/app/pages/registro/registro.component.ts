import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AccesoService } from '../../services/acceso.service';
import { Router, RouterModule } from '@angular/router';
import { Usuario } from '../../../interfaces/Usuario';


@Component({
  selector: 'app-registro',
  standalone: true,
    imports: [MatCardModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css'
})
export class RegistroComponent {
  private accesoService = inject(AccesoService);
  private router = inject(Router);
  public formBuild= inject(FormBuilder);

  public formRegistro: FormGroup = this.formBuild.group({
    nombre:["", Validators.required],
    correo:["", Validators.required], 
    clave:["", Validators.required], 
  })

  registrarse(){
    if(this.formRegistro.invalid){
      return;
    }

    const objeto:Usuario ={
      nombre: this.formRegistro.value.nombre,
      correo: this.formRegistro.value.correo,
      clave: this.formRegistro.value.clave,
    }


    this.accesoService.registrarse(objeto).subscribe({
      next: (data) => {
        if(data.isSuccess){
          this.router.navigate([""]);
        }else{
          alert("No se pudo registrar al usuario");
        }
      }, error: (error) => {
        console.log(error.message);
        alert("Ocurrió un error al registrarse");
      }
    })
  }

  volver(){
    this.router.navigate([""]);
  }
}
