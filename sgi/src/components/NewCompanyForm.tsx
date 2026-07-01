'use client'

import { useActionState } from 'react'
import { createCompany } from '@/app/actions'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'


type AwaitedCreateCompanyResponse = Awaited<ReturnType<typeof createCompany>>
const initialState = {} as AwaitedCreateCompanyResponse
interface NewCompanyFormProps {
  onSuccess: () => void
}

export function NewCompanyForm({ onSuccess }: NewCompanyFormProps) {
  const [state, formAction, pending] = useActionState(createCompany, initialState)

  useEffect(() => {
    if (state && 'success' in state && state.success) {
      onSuccess()
    }
  }, [state, onSuccess])

  return (
      <form action={formAction} className="flex flex-col gap-4">
        {/* Campo Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input name="nombre" type="text" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
          
          {state && 'errors' in state && state.errors?.properties?.nombre?.errors && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.properties.nombre.errors[0]}
            </p>
          )}
        </div>

        {/* Campo NIT */}
        <div>
          <label className="block text-sm font-medium mb-1">NIT</label>
          <input name="NIT" type="text" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
          
          {state && 'errors' in state && state.errors?.properties?.NIT?.errors && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.properties.NIT.errors[0]}
            </p>
          )}
        </div>

        {state && 'message' in state && state.message && (
          <p className="text-red-500 text-sm">{state.message}</p>
        )}

        <button
          type="submit"
          disabled={pending}
          className="bg-sky-300 text-black px-4 py-2 rounded hover:bg-sky-400 transition"
        >
          {pending ? 'Guardando...' : 'Crear Compañía'}
        </button>
      </form>
  )
}