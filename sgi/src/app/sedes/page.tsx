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
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sedes</h1>
      <CreateLocationModal companies={companies ?? []} />
      <LocationsTable locations={locations ?? []} />
    </main>
  );
}
