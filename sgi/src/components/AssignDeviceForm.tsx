"use client"
import type { Location } from "@/types/location"
import { useActionState, useEffect, useRef } from "react"
import { assignDeviceToLocation } from "@/app/actions"
import { useRouter } from "next/dist/client/components/navigation"
import { Device } from "@/types/device"
type AssignDeviceFormProps={
    locations: Pick<Location, "id" | "nombre_sede">[]
    devicesUnassigned: Pick<Device, "id" | "serial">[]
    onSuccess: () => void
}
const initialState= {} as Awaited<ReturnType<typeof assignDeviceToLocation>>
export function AssignDeviceForm({locations, devicesUnassigned, onSuccess}: AssignDeviceFormProps){
    const [state, formAction, pending] = useActionState(assignDeviceToLocation,initialState)
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
                <label className="block text-sm font-medium mb-1">Sede</label>
                <select name="location_id" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition">
                    <option value="">Selecciona una sede...</option>
                    {locations.map((l)=>(
                        <option key={l.id} value={l.id}>
                            {l.nombre_sede}
                        </option>
                    ))}
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Dispositivo</label>
                <select name="serial" className="w-full rounded-lg border border-slate-400 px-3 py-2.5 text-sm
                    focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 outline-none transition">
                    <option value="">Selecciona un dispositivo...</option>
                    {devicesUnassigned.map((d)=>(
                        <option key={d.id} value={d.serial}>
                            {d.serial}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit" className="bg-sky-300 text-black px-4 py-2 rounded hover:bg-sky-400 transition">
                {pending ? "Guardando..." : "Guardar"}
            </button>
        </form>
    )
}