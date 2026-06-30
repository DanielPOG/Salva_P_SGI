'use client'

import { useActionState } from 'react'
import { createLocation } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import type { Company } from '@/types'
type AwaitedCreateLocationResponse = Awaited<ReturnType<typeof createLocation>>
const initialState = {} as AwaitedCreateLocationResponse
export function NewLocationForm({ companies }: { companies: Pick<Company, 'id' | 'nombre'>[] }) {
  const [state, formAction, pending] = useActionState(createLocation, initialState)
  const router = useRouter()

  useEffect(() => {
    if (state.success) router.push('/')
  }, [state.success])
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Compañía</label>
        <select name="company_id" className="w-full border rounded px-3 py-2">
          <option value="">Selecciona una compañía...</option>
          {companies.map((c) => (
            <option key={c.id} value={c.id}>{c.nombre}</option>
          ))}
        </select>
        {state && "errors" in state && state.errors?.properties?.company_id && (
          <p className="text-red-500 text-sm mt-1">{state.errors.properties.company_id.errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Nombre de Sede</label>
        <input name="nombre_sede" type="text" className="w-full border rounded px-3 py-2" />
        {state && "errors" in state && state.errors?.properties?.nombre_sede && (
          <p className="text-red-500 text-sm mt-1">{state.errors.properties.nombre_sede.errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ciudad</label>
        <input name="ciudad" type="text" className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Dirección</label>
        <input name="direccion" type="text" className="w-full border rounded px-3 py-2" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select name="estado" className="w-full border rounded px-3 py-2">
          <option value="true">Activa</option>
          <option value="false">Inactiva</option>
        </select>
      </div>
      {state.message && <p className="text-red-500">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
      >
        {pending ? 'Guardando...' : 'Crear Sede'}
      </button>
    </form>
  )
}
