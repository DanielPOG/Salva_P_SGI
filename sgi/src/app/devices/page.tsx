import { CreateDeviceModal } from "@/components/CreateDeviceModal"
import { DevicesTable} from "@/components/Devices-table"
import { createClient } from "@/lib/supabase/server"
export default async function Devices(){
    const { data: locations } = await createClient()
    .from('locations')
    .select('id, nombre_sede')
    .order('nombre_sede')
  return(
        <div className="p-8">
            <h1 className="text-2xl font-bold mb-6">Dispositivos</h1>
            <CreateDeviceModal locations={locations ?? []} />
            <DevicesTable/>
        </div>
    )
}