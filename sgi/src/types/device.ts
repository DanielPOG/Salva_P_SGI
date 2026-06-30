import { Location } from "./location";
export interface Device {
  id: string;
  serial: string;
  location_id: string;
  fecha_asignacion: Date;
  descripcion?: string;
}


export type DeviceWithLocation = Device & {
    location: Pick<Location, "nombre_sede" | "ciudad" | "direccion" | "estado">;
}