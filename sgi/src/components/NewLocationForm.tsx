'use client'

import { useActionState } from 'react'
import { createLocation } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { useEffect, useRef } from 'react'
import type { Company } from '@/types'
type AwaitedCreateLocationResponse = Awaited<ReturnType<typeof createLocation>>
const initialState = {} as AwaitedCreateLocationResponse
interface NewLocationFormProps {
    companies: Pick<Company, 'id' | 'nombre'>[]
    onSuccess: () => void
}


export function NewLocationForm({ companies, onSuccess }: NewLocationFormProps) {
  const [state, formAction, pending] = useActionState(createLocation, initialState)
  const router = useRouter()
const formRef = useRef<HTMLFormElement>(null) // <-- Referencia para controlar el HTML del formulario
  useEffect(() => {
    // Si la acción terminó correctamente en el servidor
    if (state && 'success' in state && state.success) {
      formRef.current?.reset() 
      router.refresh()         
      onSuccess()              
    }
  }, [state, onSuccess, router])
  return (
    <form action={formAction} className="flex flex-col gap-4">
      <div>
        <label className="block text-sm font-medium mb-1">Compañía</label>
        <select name="company_id" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition">
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
        <input name="nombre_sede" type="text" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
        {state && "errors" in state && state.errors?.properties?.nombre_sede && (
          <p className="text-red-500 text-sm mt-1">{state.errors.properties.nombre_sede.errors[0]}</p>
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Ciudad</label>
        <input name="ciudad" type="text" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Dirección</label>
        <input name="direccion" type="text" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Estado</label>
        <select name="estado" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition">
          <option value="true">Activa</option>
          <option value="false">Inactiva</option>
        </select>
      </div>
      {state.message && <p className="text-red-500">{state.message}</p>}
      <button
        type="submit"
        disabled={pending}
        className="bg-sky-300 text-black px-4 py-2 rounded hover:bg-sky-400 transition"
      >
        {pending ? 'Guardando...' : 'Crear Sede'}
      </button>
    </form>
  )
}
