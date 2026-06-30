import { CreateDeviceModal } from "@/components/CreateDeviceModal"
import { DevicesTable} from "@/components/Devices-table"
import { createClient } from "@/lib/supabase/server"
export default async function Devices(){
    const { data: locations } = await createClient()
    .from('locations')
    .select('id, nombre_sede')
    .order('nombre_sede')
    const { data: devices } = await createClient()
    .from("devices")
    .select("*, locations(nombre_sede)")
    .order("fecha_asignacion")
  return(
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Dispositivos</h1>
            <CreateDeviceModal locations={locations ?? []} />
            <DevicesTable devices={devices ?? []}/>
        </div>
    )
}