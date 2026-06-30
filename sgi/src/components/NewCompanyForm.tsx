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
    <main className="p-8 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-6">Nueva Compañía</h1>
      <form action={formAction} className="flex flex-col gap-4">
        
        {/* Campo Nombre */}
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input name="nombre" type="text" className="w-full border rounded px-3 py-2" />
          
          {state && 'errors' in state && state.errors?.properties?.nombre?.errors && (
            <p className="text-red-500 text-sm mt-1">
              {state.errors.properties.nombre.errors[0]}
            </p>
          )}
        </div>

        {/* Campo NIT */}
        <div>
          <label className="block text-sm font-medium mb-1">NIT</label>
          <input name="NIT" type="text" className="w-full border rounded px-3 py-2" />
          
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
          className="bg-blue-600 text-white rounded px-4 py-2 disabled:opacity-50"
        >
          {pending ? 'Guardando...' : 'Crear Compañía'}
        </button>
      </form>
    </main>
  )
}