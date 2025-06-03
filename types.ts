
export enum Corridor {
  CORREDOR_1 = "Corredor 1",
  CORREDOR_2 = "Corredor 2",
  CORREDOR_3 = "Corredor 3",
  CORREDOR_4 = "Corredor 4",
  CORREDOR_5 = "Corredor 5",
  CORREDOR_6 = "Corredor 6",
  CORREDOR_7 = "Corredor 7",
  CORREDOR_8 = "Corredor 8",
  TRONCALES = "Troncales",
  METROPOLITANO = "Metropolitano",
  OTRO = "Otro Corredor/Zona",
}

export interface CorridorDetail {
  id: Corridor;
  name: string;
  color: string;
  textColor?: string;
}

export enum DiversionType {
  MOMENTARY = "Momentáneo",
  PERMANENT = "Permanente",
  OTHER = "Otro",
}

export interface DiversionTypeDetail {
  id: DiversionType;
  name: string;
  iconSvg: string; // Store SVG string for the icon
}

export interface Diversion {
  id: string;
  description: string; // Content will be Markdown
  imageUrl?: string; 
  rawImageFile?: File;
  corridor: Corridor;
  lines: string[];
  publicationDate: string;
  type: DiversionType;
  estimatedDuration: string; // e.g., "2 horas", "Hasta nuevo aviso", "Indefinido"
}