
import { Corridor, CorridorDetail, DiversionType, DiversionTypeDetail, Diversion } from './types';

export const APP_TITLE = "Desvíos de Líneas SAETA";
export const EXTERNAL_LINK_URL = "https://www.saetasalta.com.ar";
export const EXTERNAL_LINK_TEXT = "Sitio Oficial de SAETA";

// SVG Icons
const ClockIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.414-1.415L11 9.586V6z" clip-rule="evenodd" /></svg>`;
const CheckCircleIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" /></svg>`;
const InformationCircleIcon = `<svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 inline-block mr-1" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clip-rule="evenodd" /></svg>`;


export const DIVERSION_TYPE_DETAILS: DiversionTypeDetail[] = [
  { id: DiversionType.MOMENTARY, name: "Momentáneo", iconSvg: ClockIcon },
  { id: DiversionType.PERMANENT, name: "Permanente", iconSvg: CheckCircleIcon },
  { id: DiversionType.OTHER, name: "Otro", iconSvg: InformationCircleIcon },
];

export const CORRIDOR_DETAILS: CorridorDetail[] = [
  { id: Corridor.CORREDOR_1, name: "Corredor 1", color: "#007BFF" },
  { id: Corridor.CORREDOR_2, name: "Corredor 2", color: "#DC3545" },
  { id: Corridor.CORREDOR_3, name: "Corredor 3", color: "#D2B48C" },
  { id: Corridor.CORREDOR_4, name: "Corredor 4", color: "#6C757D" },
  { id: Corridor.CORREDOR_5, name: "Corredor 5", color: "#FD7E14" },
  { id: Corridor.CORREDOR_6, name: "Corredor 6", color: "#0DCAF0" },
  { id: Corridor.CORREDOR_7, name: "Corredor 7", color: "#FFC107", textColor: "#333333" },
  { id: Corridor.CORREDOR_8, name: "Corredor 8", color: "#198754" },
  { id: Corridor.TRONCALES, name: "Troncales", color: "#C8A2C8" },
  { id: Corridor.METROPOLITANO, name: "Metropolitano", color: "#98FB98" },
  { id: Corridor.OTRO, name: "Otro Corredor/Zona", color: "#adb5bd" }
];

export const CORREDORES_DISPONIBLES: Corridor[] = CORRIDOR_DETAILS.map(c => c.id);

export const getCorridorDetail = (corridorId: Corridor): CorridorDetail | undefined => {
  return CORRIDOR_DETAILS.find(c => c.id === corridorId);
};

export const getDiversionTypeDetail = (typeId: DiversionType): DiversionTypeDetail | undefined => {
  return DIVERSION_TYPE_DETAILS.find(dt => dt.id === typeId);
};


export const INITIAL_DIVERSIONS_DATA: Diversion[] = [
  {
    id: '1',
    description: '**Atención:** Desvío en _Av. Principal_ por obras en el carril derecho.\n\nTomar rutas alternas indicadas:\n- Calle A\n- Calle B\n\nConsultar mapa para más detalles.',
    corridor: Corridor.CORREDOR_1,
    lines: ['1A', '1B'],
    publicationDate: '2024-07-27',
    type: DiversionType.MOMENTARY,
    estimatedDuration: "Hasta el 30/07/2024",
  },
  {
    id: '2',
    description: 'Cierre total de Calle Secundaria debido a evento deportivo.\n*Vigencia hasta las 18:00 hrs del día de hoy.*',
    corridor: Corridor.CORREDOR_2,
    lines: ['2F', '2G'],
    publicationDate: '2024-07-28',
    type: DiversionType.MOMENTARY,
    estimatedDuration: "Solo por hoy, hasta 18:00hs",
  },
  {
    id: '3',
    description: 'La parada de la *Línea 7A* en Plaza Flores se mueve permanentemente a la esquina de Rivadavia y Artigas debido a la peatonalización.',
    corridor: Corridor.CORREDOR_7,
    lines: ['7A', '7B', '7CD'],
    publicationDate: '2024-07-25',
    imageUrl: 'https://picsum.photos/400/200?random=3',
    type: DiversionType.PERMANENT,
    estimatedDuration: "Permanente",
  },
  {
    id: '4',
    description: 'Servicio Troncal Norte-Sur con modificación de parada en Plaza Central.\n\n- **Parada anterior:** Frente al Banco Nación\n- **Nueva parada:** Esquina Correo Argentino',
    corridor: Corridor.TRONCALES,
    lines: ['Troncal NS'],
    publicationDate: '2024-07-29',
    type: DiversionType.OTHER,
    estimatedDuration: "Indefinido",
  }
];