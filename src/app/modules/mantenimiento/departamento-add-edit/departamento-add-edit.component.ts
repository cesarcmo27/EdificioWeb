import { Component,Inject, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

import { MatSnackBar } from '@angular/material/snack-bar';
import { Departamento } from '../interfaces/departamento';
import { DepartamentoService } from '../services/departamento.service';
import { AuthService } from 'src/app/services/auth.service';

interface ApartmentState {
  value: string;
  viewValue: string;
}

@Component({
  selector: 'app-departamento-add-edit',
  templateUrl: './departamento-add-edit.component.html',
  styleUrls: ['./departamento-add-edit.component.css']
})



export class DepartamentoAddEditComponent {

  formDepartamento: FormGroup
  tituloAccion: string = "Nuevo"
  botonAccion: string = "Guardar"
  selectedValue: string = ""

  listaDepartamentos: Departamento[] = []

  apartmentState: ApartmentState[] = [
    { value: '1', viewValue: 'Activo' },
    { value: '2', viewValue: 'Inactivo' },

  ];

  constructor(
    private dialogoReferencia: MatDialogRef<DepartamentoAddEditComponent>,
    private fb: FormBuilder,
    private snackBar: MatSnackBar,
    private departamentoService: DepartamentoService,
    @Inject (MAT_DIALOG_DATA)  public dataDepartamento : Departamento,
    private authService : AuthService) {

    this.formDepartamento = this.fb.group({
      idDepartamento: [''],
      Bloque: ['', Validators.required],
      Nombre: ['', Validators.required],
      Estado: ['', Validators.required],
      piso: ['', Validators.required],
      metrocuadrado: ['', Validators.required],
      Porcentaje: ['', Validators.required]
    })

    this.departamentoService.getList().subscribe({
      next: (data) => {
        this.listaDepartamentos = data;
      },
      error: (e) => { console.log('error al consultar al crear o editar') }
    })
  }

  ngOnInit() :void{
    if (this.dataDepartamento){
      this.formDepartamento.patchValue({
        idDepartamento: this.dataDepartamento.id,
        Bloque: this.dataDepartamento.block,
        Nombre: this.dataDepartamento.name,
        Estado: this.dataDepartamento.status.toString(),
        piso: this.dataDepartamento.floor,
        metrocuadrado: this.dataDepartamento.area,
        Porcentaje: this.dataDepartamento.percentage
      }) 
      
    }
    console.log(this.formDepartamento.value)
    this.tituloAccion = "Editar"
    this.botonAccion = "Actualizar"

  }

  mostrarAlert(msg: string, accion: string) {
    this.snackBar.open(msg, accion, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
      duration: 3000
    })
  }

  addEditApartamento() {

    console.log(this.formDepartamento.value)
    const user = this.authService.getUser()
   

    const departamento: Departamento = {
      name: this.formDepartamento.value.Nombre,
      block: this.formDepartamento.value.Bloque,
      status: this.formDepartamento.value.Estado,
      statusName: "",
      floor: this.formDepartamento.value.piso,
      percentage: this.formDepartamento.value.Porcentaje,
      area: this.formDepartamento.value.metrocuadrado,
      buildingId: user?.idEdificio ?? 'vacio'
    
  }
  console.log(departamento)
  this.departamentoService.add(departamento).subscribe(
   {
    next:(data)=>{
      this.mostrarAlert("Departamento creado","Listo")
      this.dialogoReferencia.close("creado")
    },
    error:(e)=>{
      this.mostrarAlert("Fallo","Error")
      console.log(e)
    }
   }
  )
}
 

}
