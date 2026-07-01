'use client'

import { useActionState } from 'react'
import { createCompany, updateCompany } from '@/app/actions'
import { useEffect } from 'react'


type CompanyActionResponse = Awaited<ReturnType<typeof createCompany>> | Awaited<ReturnType<typeof updateCompany>>
const initialState = {} as CompanyActionResponse
type FormMode= "create" | "update"
interface NewCompanyFormProps {
  mode: FormMode
  initialData?:{
    id: string
    nombre: string
    NIT: string
  }
  onSuccess: () => void
}

export function NewCompanyForm({ onSuccess, mode, initialData }: NewCompanyFormProps) {
  const handleFormAction = async (prevState: any, formData: FormData)=>{
    if (mode === "create") {
      return await createCompany(prevState, formData)
    } else {
      const updateWithId = updateCompany.bind(null, initialData?.id ?? '')
      return await updateWithId(prevState, formData)
    }
  }
  const [state, formAction, pending] = useActionState(handleFormAction, initialState)
  const isEditMode = mode === 'update'
  const showNitError = mode === 'create' && state && 'errors' in state

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
          <input defaultValue={initialData?.nombre} name="nombre" type="text" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
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
          {isEditMode ? (
            <>
              <div className="w-full rounded-lg border border-slate-300 bg-slate-50 px-3 py-2.5 text-sm text-slate-700">
                {initialData?.NIT}
              </div>
              <input type="hidden" name="NIT" value={initialData?.NIT} />
            </>
          ) : (
            <>
              <input defaultValue={initialData?.NIT} name="NIT" type="number" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
                  focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
              
                {showNitError && state?.errors?.properties && 'NIT' in state.errors.properties && (
                  <p className="text-red-500 text-sm mt-1">
                    {(state.errors.properties as any)['NIT']?.errors?.[0]}
                  </p>
                )}
            </>
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
          {pending ? 'Guardando...' : isEditMode ? 'Actualizar Compañía' : 'Crear Compañía'}
        </button>
      </form>
  )
}