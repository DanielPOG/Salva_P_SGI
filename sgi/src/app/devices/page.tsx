import { AssignDeviceModal } from "@/components/AssignDeviceModal"
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
    const {data: devicesUnassigned}= await createClient()
    .from("devices")
    .select("id, serial, location_id")

  return(
        <main className="max-w-7xl mx-auto p-8">
            <div  className="flex items-center justify-between">
                <div className="grid grid-cols-1 mb-4">
                    <h1 className="text-3xl font-bold mb-4">Dispositivos</h1>
                    <h2 className="text-xs font-light opacity-75">Gestión de dispositivos médicos y su asignación a sedes.</h2> 
                </div>
                <div className="md:grid grid-cols-1 ml-5 lg:grid-cols-2 gap-4">
                    {/* TODO: Añadir funcion de asignacion  */}
                    <CreateDeviceModal locations={locations ?? []} />
                    <AssignDeviceModal locations={locations ?? []} devicesUnassigned={devicesUnassigned ?? []} />
                </div>
            </div>
            <div className="mb-4">
            </div>
            <DevicesTable devices={devices ?? []}/>
        </main>
    )
}