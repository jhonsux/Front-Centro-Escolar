export class AlumnoModel {
  constructor (
    public student_id: string,
    public name: string,
    public firstname: string,
    public lastname: string,
    public sex: string,
    public status: string,
    public group_id: string,
    public semester_id: string,
    public parent_id: string
  ){ }
}

export class AlumnoModelV {
  constructor (
    public student_id: string,
    public name: string,
    public firstname: string,
    public lastname: string,
    public sex: string,
    public status: string,
    public group_id: string,
    public semestre: string,
    public parent_id: string
  ){ }
}

export class TutoresModel {
  constructor (
    public parent_id: string,
    public name: string,
    public firstname: string,
    public lastname: string,
    public adress: string,
    public telephone: string,
    public email: string,
    public celphone: string,
    public description: string
  ) {}
}

export class UsuariosModel {
  constructor (
    public user_id: string,
    public name: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public user_types: string
  ) {}
}

export class UsuariosModelC {
  constructor (
    public name: string,
    public firstname: string,
    public lastname: string,
    public email: string,
    public password: string,
    public user_types: string
  ) {}
}

export class ReportesModel {
  constructor (
    public report_id: string,
    public student_id: string,
    public incidencia: string,
    public user: string,
    public description: string,
    public justificado: string,
    public date: string,
  ) {}
}

export class ReportesModelC {
  constructor (
   // public report_id: string,
    public student_id: string,
    public type_id: string,
    public user_id: string,
    public description: string,
    public justificado: string,
    public date: string
  ) {}
}

export class JustificantesModel {
  constructor (
    public justification_id: string,
    public report_id: string,
    public student_id: string,
    public name: string,
    public firstname: string,
    public lastname: string,
    public issue_date: string,
    public description: string
  ) {}
}

export class JustificantesModelC {
  constructor (
    //public justification_id: string,
    public report_id: string,
    public student_id: string,
    public issue_date: string,
    public description: string
  ) {}
}

export class IncidenciasModel {
  constructor (

  ) {}
}

export class PeriodoModelC {
  constructor (
    public periodo_id: string,
    public nombre: string,
    public fecha_inicio: string,
    public fecha_fin: string,
    public cicle_id: string

  ) {}
}

export class CiclosModel {
  constructor (
    public cicle_id: string,
    public fecha_inicio: string,
    public fecha_fin: string
  ) {}
}

export class CicloModelC {
  constructor (
    public fecha_inicio: string,
    public fecha_fin: string
  ) {}
}

export class ComunicadosModel {
  constructor (
    public communication_id: string,
    public parent_id: string,
    public date: string,
    public method: string,
    public description: string
  ) {}
}

export class ComunicadosModelC {
  constructor (
    public parent_id: string,
    public date: string,
    public method: string,
    public description: string
  ) {}
}
