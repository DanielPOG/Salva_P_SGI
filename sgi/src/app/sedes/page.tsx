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
        <h1 className="text-3xl font-bold">Sedes</h1>
        <CreateLocationModal companies={companies ?? []} />
      </div>
      <LocationsTable locations={locations ?? []} />
    </main>
  );
}
