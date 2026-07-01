import {createClient } from "@/lib/supabase/server"
import { LocationsTable } from '@/components/locations-table'
import { CreateLocationModal } from "@/components/CreateLocationModal";

export default async function Home() {
  const {data: locations} = await createClient()
    .from("locations")
    .select("*, companies(nombre)")
    .order("nombre_sede")

  const { data: companies } = await createClient()
    .from('companies')
    .select('id, nombre')
    .order('nombre')
  return (
    <main className="max-w-7xl mx-auto p-8">
      <div  className="flex items-center justify-between">
        <div className="grid grid-cols-1 mb-4">
          <h1 className="text-3xl font-bold mb-4">Sedes</h1>
          <h2 className="text-xs font-light opacity-75">Ubicaciones de la red y dispositivos asignados a cada una.</h2>
        </div>
        <CreateLocationModal companies={companies ?? []} />
      </div>
      <LocationsTable locations={locations ?? []} />
    </main>
  );
}
