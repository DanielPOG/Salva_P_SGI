import { createClient } from '@/lib/supabase/server'
import { NewLocationForm } from './form'

export default async function NewLocationPage() {
  // Se cargan las compañías en el servidor para popular el <select>
  const { data: companies } = await createClient()
    .from('companies')
    .select('id, nombre')
    .order('nombre')
    return (
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nueva Sede</h1>
      <NewLocationForm companies={companies ?? []} />
    </main>
  )
}