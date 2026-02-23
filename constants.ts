
import { DashboardStats, MemberWorkload, OldTaskAlert, Task } from './types';

export const DASHBOARD_STATS: DashboardStats = {
  totalTasks:98,
  inProgressPercent: 8,
  development: {
    count: 13,
    percentage: "13.3%",
    assignee: "Toño, Mau y Alan"
  },
  inProgress: {
    count: 7,
    membersCount: 4,
    percentage: "8.2%"
  },
  reviewBacklog: {
    count: 77,
    percentage: "78.5%"
  }
};

export const WORKLOAD_DATA: MemberWorkload[] = [
  {
    name: "Alan",
    totalTasks: 10,
    initial: "A",
    avatarColor: "bg-pink-400",
    breakdown: { URGENTE: 0, ALTA: 3, MEDIA: 1, BAJA: 6 }
  },
  {
    name: "Manny",
    totalTasks: 23,
    initial: "M",
    avatarColor: "bg-blue-500",
    breakdown: { URGENTE: 3, ALTA: 6, MEDIA: 10, BAJA: 4 }
  },
  {
    name: "Diego",
    totalTasks: 18,
    initial: "D",
    avatarColor: "bg-cyan-400",
    breakdown: { URGENTE: 1, ALTA: 0, MEDIA: 5, BAJA: 12 }
  },
  {
    name: "Mau",
    totalTasks: 4,
    initial: "M",
    avatarColor: "bg-emerald-400",
    breakdown: { URGENTE: 0, ALTA: 1, MEDIA: 2, BAJA: 1 }
  },
  {
    name: "Toño",
    totalTasks: 13,
    initial: "T",
    avatarColor: "bg-orange-400",
    breakdown: { URGENTE: 2, ALTA: 5, MEDIA: 3, BAJA: 3 }
  },
  {
    name: "Adrián",
    totalTasks: 2,
    initial: "A",
    avatarColor: "bg-indigo-500",
    breakdown: { URGENTE: 0, ALTA: 0, MEDIA: 0, BAJA: 2 }
  }
];

export const OLD_TASKS: OldTaskAlert[] = [
  {
    name: "Manny",
    totalOld: 14,
    buckets: { "90d": 3, "60-90d": 3, "30-60d":  7}
  },
  {
    name: "Alan",
    totalOld: 9,
    buckets: { "90d": 2, "60-90d": 4, "30-60d": 3 }
  },
  {
    name: "Diego",
    totalOld: 5,
    buckets: { "90d": 1, "60-90d": 2, "30-60d": 2 }
  }
];

export const URGENT_TASKS: Task[] = [
  { id: 1055, title: "Al hacer clic en cualquier botón de asistencia diaria se traba Nommy por completo", date: "13/02/2026", assignee: "Toño" },
  { id: 1088, title: "Puedes ver empleados de otras empresas en las felicitaciones de resumen del equipo", date: "10/02/2026", assignee: "Mau" },
  { id: 1081, title: "Puedes crearte un usuario en el portal de empleados si le das a ¿Olvidaste tu contraseña?", date: "13/02/2026", assignee: "Mau" },
  { id: 1043, title: "Se asigna un horario por defecto a un colaborador a pesar de que no se hayan creado horarios", date: "06/02/2026", assignee: "Manny" },
  { id: 1080, title: "Evaluaciones muestra colaboradores que fueron eliminados", date: "13/02/2026", assignee: "Mau" },
  { id: 1030, title: "No aparece el horario en check in y mi horario si el horario es asignado por el cliente o tenant", date: "05/02/2026", assignee: "Manny" },
  { id: 953, title: "Si no hay horarios configurados que aparezca el botón de check in", date: "16/01/2026", assignee: "Toño" },
  { id: 634, title: "Fase 2: Integración de Turnos Rotativos con Sistema de Asistencia", date: "18/11/2025", assignee: "Manny" },
  { id: 931, title: "Modificar los grupos de empleados", date: "14/01/2026", assignee: "Diego" },
  { id: 1078, title: "Se muestran empresas a las que no tiene acceso el empleado en evaluaciones", date: "13/02/2026", assignee: "Mau" }
];

export const HIGH_PRIORITY_TASKS: Task[] = [
  { id: 1086, title: "Reporte de asistencias cuenta retardos", date: "13/02/2026", assignee: "Toño" },
  { id: 1082, title: "Puedes crearte un usuario en Nommy si le das a ¿Olvidaste tu contraseña?", date: "13/02/2026", assignee: "Mau" },
  { id: 977, title: "Marca como día no laboral cuando no tengo horario agendado", date: "23/01/2026", assignee: "Manny" },
  { id: 1066, title: "La página se carga cada que haces clic en el scrollbar de asistencias y no permite deslizar para ver todos los empleados", date: "13/02/2026", assignee: "Toño" },
  { id: 1065, title: "Agregar configuración para definir si entrar en tolerancia cuenta como retardo o no a plantillas de horarios", date: "13/02/2026", assignee: "Toño" },
  { id: 1056, title: "No valida que ingreses la contraseña correcta cuando eres invitado a un tenant", date: "13/02/2026", assignee: "Alan" },
  { id: 1050, title: "Asistencia diaria muestra empleados de empresas a las que no tiene acceso el usuario", date: "13/12/2025", assignee: "Toño" },
  { id: 1048, title: "Se descarga el reporte de asistencias por colaborador con la fecha de un día anterior al seleccionado", date: "13/02/2026", assignee: "Toño" },
  { id: 635, title: "Fase 4: Integración de Turnos Rotativos con Sistema de Nómina", date: "18/11/2025", assignee: "Manny" },
  { id: 588, title: "No manda correo al programar entrevista", date: "03/11/2025", assignee: "Manny" }
];
