import { Location } from "./location";
export interface Company{
    id: string;
    nombre: string;
    NIT: string;
    fecha_creacion:string;
}

export type CompanyWithLocations = Company & {
  locations: Location[];
};