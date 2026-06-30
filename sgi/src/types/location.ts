import { Company } from "./company";

export interface Location{
    id: string;
    nombre_sede: string;
    ciudad: string;
    direccion: string;
    estado: boolean;
    company_id: string;
}

export type LocationWithCompany = Location & {
  companies: Pick<Company, 'nombre'>
}