import { Component, OnInit } from '@angular/core';
import { AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Departamento } from '../interfaces/departamento';
import { MatDialog } from '@angular/material/dialog';
import { DepartamentoAddEditComponent } from '../departamento-add-edit/departamento-add-edit.component';
import { DepartamentoService } from '../services/departamento.service';

@Component({
  selector: 'app-departamento',
  templateUrl: './departamento.component.html',
  styleUrls: ['./departamento.component.css']
})
export class DepartamentoComponent implements AfterViewInit, OnInit {

  displayedColumns: string[] = ['Bloque', 'Nombre', 'Estado', 'Piso', 'MetroCuadrado', 'Porcentaje', 'Acciones'];
  dataSource = new MatTableDataSource<Departamento>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;


  constructor(public dialog: MatDialog, 
    private _departamentoService: DepartamentoService) {

     }


  ngOnInit(): void {
    this.mostrarDepartamentos()
  }

  mostrarDepartamentos(){
    this._departamentoService.getList().subscribe({
      next: (lista) =>{
        console.log(lista)
        this.dataSource.data = lista
      },
      error: (e)=>{
        console.log(e);
      }
    })
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog() {
    this.dialog.open(DepartamentoAddEditComponent,{
      disableClose: true,
      width:"680px",

    }).afterClosed().subscribe(resultado => {
      if (resultado === "creado"){
        this.mostrarDepartamentos();
      }
    });
  }

  EditarDepartamento(dataDepartamento : Departamento){
    this.dialog.open(DepartamentoAddEditComponent,{
      disableClose: true,
      width:"680px",
      data: dataDepartamento

    }).afterClosed().subscribe(resultado => {
      if (resultado === "editado"){
        this.mostrarDepartamentos();
      }
    });
    
  }
}


