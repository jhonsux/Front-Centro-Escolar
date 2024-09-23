import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AlumnoService } from './shared/alumno.service';

import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { ListaTutoresComponent } from './lista-tutores/lista-tutores.component';
import { ListaReportesComponent } from './lista-reportes/lista-reportes.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrearReporteComponent } from './crear-reporte/crear-reporte.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { CrearTutorComponent } from './crear-tutor/crear-tutor.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarTutorComponent } from './editar-tutor/editar-tutor.component';
import { EditarReporteComponent } from './crear-database/editar-reporte.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { InicioComponent } from './inicio/inicio.component';
import { DetallesAlumnoComponent } from './detalles-alumno/detalles-alumno.component';
import { AlumnoTutorComponent } from './alumno-tutor/alumno-tutor.component';
import { BuscarAlumnoComponent } from './crear-ciclo/buscar-alumno.component';
import { CrearJustificanteComponent } from './crear-justificante/crear-justificante.component';
import { CrearIncidenciaComponent } from './lista-graduados/crear-incidencia.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { TutorComunicacionComponent } from './crear_comunicado/tutor-comunicacion.component';
import { ListaJustificantesComponent } from './lista-justificantes/lista-justificantes.component';
import { ListaComunicadosComponent } from './noSeUsa/lista-comunicados.component';


@NgModule({
  declarations: [
    AppComponent,
    EditarAlumnoComponent,
    ListaAlumnosComponent,
    ListaTutoresComponent,
    ListaReportesComponent,
    ListaUsuariosComponent,
    CrearReporteComponent,
    CrearAlumnoComponent,
    CrearTutorComponent,
    CrearUsuarioComponent,
    EditarTutorComponent,
    EditarReporteComponent,
    EditarUsuarioComponent,
    InicioComponent,
    DetallesAlumnoComponent,
    AlumnoTutorComponent,
    BuscarAlumnoComponent,
    CrearJustificanteComponent,
    CrearIncidenciaComponent,
    MenuInicioComponent,
    TutorComunicacionComponent,
    ListaJustificantesComponent,
    ListaComunicadosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    AlumnoService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
