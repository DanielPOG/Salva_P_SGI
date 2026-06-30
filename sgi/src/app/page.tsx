import {createClient } from "@/lib/supabase/server"
import { LocationsTable } from '@/components/locations-table'

export default async function Home() {
  const {data: locations} = await createClient()
    .from("locations")
    .select("*, companies(nombre)")
    .order("nombre_sede")
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-6">Sedes</h1>
      
      <LocationsTable locations={locations ?? []} />
    </div>
  );
}
