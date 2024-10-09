import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from './inicio/inicio.component';
import { MenuInicioComponent } from './menu-inicio/menu-inicio.component';
import { ListaAlumnosComponent } from './lista-alumnos/lista-alumnos.component';
import { CrearAlumnoComponent } from './crear-alumno/crear-alumno.component';
import { AlumnoTutorComponent } from './alumno-tutor/alumno-tutor.component';
import { EditarAlumnoComponent } from './editar-alumno/editar-alumno.component';
import { CrearReporteComponent } from './crear-reporte/crear-reporte.component';
import { ListaTutoresComponent } from './lista-tutores/lista-tutores.component';
import { CrearTutorComponent } from './crear-tutor/crear-tutor.component';
import { EditarTutorComponent } from './editar-tutor/editar-tutor.component';
import { TutorComunicacionComponent } from './crear_comunicado/tutor-comunicacion.component';
import { ListaReportesComponent } from './lista-reportes/lista-reportes.component';
import { CrearJustificanteComponent } from './crear-justificante/crear-justificante.component';
import { ListaUsuariosComponent } from './lista-usuarios/lista-usuarios.component';
import { CrearUsuarioComponent } from './crear-usuario/crear-usuario.component';
import { EditarUsuarioComponent } from './editar-usuario/editar-usuario.component';
import { CrearIncidenciaComponent } from './lista-graduados/crear-incidencia.component';
import { ListaJustificantesComponent } from './lista-justificantes/lista-justificantes.component';
import { BuscarAlumnoComponent } from './crear-ciclo/buscar-alumno.component';
import { EditarReporteComponent } from './crear-database/editar-reporte.component';
import { TutorGuard } from './auth/tutor-guard.guard';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent },
  { path: 'menu', component: MenuInicioComponent },

  // Alumnos
  {
    path: 'alumnos',
    children: [
      { path: '', component: ListaAlumnosComponent },
      { path: 'graduados', component: CrearIncidenciaComponent },
      { path: 'crear', component: CrearAlumnoComponent, canActivate: [TutorGuard] },
      { path: ':id', component: AlumnoTutorComponent },
      { path: 'actualizar/:id', component: EditarAlumnoComponent, canActivate: [TutorGuard] },
      { path: 'reporte/:id', component: CrearReporteComponent },
    ]
  },

  // Tutores
  {
    path: 'tutores',
    children: [
      {
        path: '',
        component: ListaTutoresComponent,
        canActivate: [TutorGuard]
      },
      {
        path: 'crear',
        component: CrearTutorComponent,
        canActivate: [TutorGuard]
      },
      {
        path: 'actualizar/:id',
        component: EditarTutorComponent,
        canActivate: [TutorGuard]
      },
      {
        path: ':id',
        component: TutorComunicacionComponent
      },
    ]
  }
  ,

  // Reportes
  {
    path: 'reportes',
    children: [
      { path: '', component: ListaReportesComponent },
      { path: 'crear', component: CrearReporteComponent },
      { path: ':id', component: CrearJustificanteComponent, canActivate: [TutorGuard] },
    ]
  },

  // Usuarios
  {
    path: 'usuarios',
    children: [
      { path: '', component: ListaUsuariosComponent, canActivate: [TutorGuard] },
      { path: 'crear', component: CrearUsuarioComponent, canActivate: [TutorGuard]},
      { path: 'actualizar/:id', component: CrearUsuarioComponent, canActivate: [TutorGuard] },
    ]
  },

  // Justificantes
  {
    path: 'justificantes',
    children: [
      { path: '', component: ListaJustificantesComponent },
      { path: 'crear', component: CrearJustificanteComponent, canActivate: [TutorGuard] },
    ]
  },

  // Comunicados
  // { path: 'comunicados', component: ListaComunicadosComponent },
  { path: 'comunicados/crear', component: TutorComunicacionComponent },

  { path: 'ciclo_escolar', component: BuscarAlumnoComponent, canActivate: [TutorGuard] },
  { path: 'upload', component: EditarReporteComponent, canActivate: [TutorGuard] },

  // Default and wildcard routes
  { path: '', redirectTo: '/inicio', pathMatch: 'full' },
  { path: '**', redirectTo: '/inicio' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
