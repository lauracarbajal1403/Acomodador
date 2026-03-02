
import { DashboardStats, MemberWorkload, OldTaskAlert, Task } from './types';

export const DASHBOARD_STATS: DashboardStats = {
  totalTasks:91,
  inProgressPercent: 5,
  development: {
    count: 5,
    percentage: "5.4%",
    assignee: "Toño, Mau y Diego"
  },
  inProgress: {
    count: 5,
    membersCount: 4,
    percentage: "5.4%"

  },
  reviewBacklog: {
    count: 81,
    percentage: "89.01%"
  }
};

export const WORKLOAD_DATA: MemberWorkload[] = [
  {
    name: "Alan",
    totalTasks: 20,
    initial: "A",
    avatarColor: "bg-pink-400",
    breakdown: { URGENTE: 4, ALTA: 4, MEDIA: 5, BAJA: 6 }
  },
  {
    name: "Manny",
    totalTasks: 24,
    initial: "M",
    avatarColor: "bg-blue-500",
    breakdown: { URGENTE: 2, ALTA: 6, MEDIA: 12, BAJA: 4 }
  },
  {
    name: "Diego",
    totalTasks: 16,
    initial: "D",
    avatarColor: "bg-cyan-400",
    breakdown: { URGENTE: 0, ALTA: 0, MEDIA: 1, BAJA: 15 }
  },
  {
    name: "Mau",
    totalTasks: 14,
    initial: "M",
    avatarColor: "bg-emerald-400",
    breakdown: { URGENTE: 0, ALTA: 4, MEDIA: 9, BAJA: 1 }
  },
  {
    name: "Toño",
    totalTasks: 13,
    initial: "T",
    avatarColor: "bg-orange-400",
    breakdown: { URGENTE: 1, ALTA: 1, MEDIA: 4, BAJA: 7 }
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
    buckets: { "90d": 4, "60-90d": 1, "30-60d":  9}
  },
  {
    name: "Alan",
    totalOld: 9,
    buckets: { "90d": 4, "60-90d": 0, "30-60d": 1 }
  },
  {
    name: "Diego",
    totalOld: 5,
    buckets: { "90d": 1, "60-90d": 0, "30-60d": 4}
  }
];

export const URGENT_TASKS: Task[] = [
  { id: 1119, title: "Actualización para integrar las configuraciones de vacaciones personalizadas en reporte de balance de vacaciones.", date: "20/02/2026", assignee: "Alan" },
  { id: 1118, title: "Actualización para integrar las configuraciones de vacaciones personalizadas en saldos de vacaciones", date: "20/02/2026", assignee: "Alan" },
  { id: 1117, title: "Actualización para integrar las configuraciones de vacaciones personalizadas en movimientos afiliatorios", date: "20/02/2026", assignee: "Alan" },
  { id: 1116, title: "Refactorización de Modulo de Sueldos Variables", date: "20/02/2026", assignee: "Alan" },
  { id: 1043, title: "Se asigna un horario por defecto a un colaborador a pesar de que no se hayan creado horarios", date: "06/02/2026", assignee: "Toño" },
  { id: 1030, title: "No aparece el horario en check in y mi horario si el horario es asignado por el cliente o tenant", date: "05/02/2026", assignee: "Manny" },
  { id: 634, title: "Fase 2: Integración de Turnos Rotativos con Sistema de Asistencia", date: "18/11/2025", assignee: "Manny" }
];

export const HIGH_PRIORITY_TASKS: Task[] = [
  { id: 1139, title: "Bad Gateway al ir de Pago a prenómina", date: "27/02/2026", assignee: "Alan" },
  { id: 1134, title: "Muestra un horario base en horarios a pesar de que el colaborador no tenga un horario asignado", date: "27/02/2026", assignee: "Toño" },
  { id: 1131, title: "Se puede tener a un colaborador en dos nóminas al mismo tiempo", date: "27/02/2026", assignee: "Alan" },
  { id: 1129, title: "ERROR: Bad Gateway al crear los periodos de nómina", date: "27/02/2026", assignee: "Alan" },
  { id: 1126, title: "No se muestra el líder de equipo seleccionado en la bitácora", date: "27/02/2026", assignee: "Mau" },
  { id: 1122, title: "Marca fin de semana como día no laboral a pesar de que el empleado sí trabaja en fin de semana", date: "27/02/2026", assignee: "Mau" },
  { id: 635, title: "Fase 4: Integración de Turnos Rotativos con Sistema de Nómina", date: "18/11/2025", assignee: "Manny" },
  { id: 1056, title: "No valida que ingreses la contraseña correcta cuando eres invitado a un tenant", date: "27/02/2026", assignee: "Mau" },
  { id: 986, title: "Ocultar menú de tickets", date: "26/01/2026", assignee: "Manny" },
  { id: 961, title: "Crear configuración de retardos en empresas", date: "16/01/2026", assignee: "Alan" }
];
