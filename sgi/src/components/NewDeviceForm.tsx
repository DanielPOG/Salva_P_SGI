"use client"

import { useActionState } from "react"
import { createDevice } from "@/app/actions"
import { useRouter } from "next/navigation"
import { useEffect, useRef } from "react"
import type { Location } from "@/types/location"
import type { Device } from "@/types/device"
type AwaitedCreateDeviceResponse = Awaited<ReturnType<typeof createDevice>>
const initialState = {} as AwaitedCreateDeviceResponse

interface NewDeviceFormProps{
    locations: Pick<Location, "id" | "nombre_sede">[]
    onSuccess: () => void
}

export function NewDeviceForm({locations, onSuccess}: NewDeviceFormProps){
    const [state, formAction, pending] = useActionState(createDevice, initialState)
    const router = useRouter()
    const formRef = useRef<HTMLFormElement>(null)
    useEffect(()=>{
        if(state && "success" in state && state.success){
            formRef.current?.reset()
            router.refresh()
            onSuccess()
        }
    },[state, onSuccess, router])
    return(
        <form action={formAction} className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium mb-1 ">Dispositivos</label>
                <select name="location_id" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition">
                    <option value="">Selecciona una sede...</option>
                    {locations.map((l)=>(
                        <option key={l.id} value={l.id}>
                            {l.nombre_sede}
                        </option>
                    ))}
                </select>
                {state && "errors" in state && state.errors?.properties?.location_id && (
                    <p className="text-red-500 text-sm mt-1">{state.errors.properties.location_id.errors[0]}</p>
                )}
            </div>
            <label className="block text-sm font-medium mb-1 ">Serial del dispositivo</label>
            <input type="text" name="serial" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
            {state && "errors" in state && state.errors?.properties?.serial && (
                <p className="text-red-500 text-sm mt-1">{state.errors.properties.serial.errors[0]}</p>
            )}
            <div>
                <label className="block text-sm font-medium mb-1 ">Fecha de asignación</label>
                <input type="date" name="fecha_asignacion" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1 ">Descripción</label>
                <input type="text" name="descripcion" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
              focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition" />
            </div>
            {state.message && <p className="text-red-500">{state.message}</p>}
            <button type="submit" className="bg-sky-300 text-black px-4 py-2 rounded hover:bg-sky-400 transition">
                {pending ? "Guardando..." : "Guardar"}
            </button>
        </form>
    )
}