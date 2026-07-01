"use client"
import {useEffect, useState} from "react"
import type { DeviceWithLocation } from "@/types"
import { useRouter } from "next/navigation"
import { SearchInput } from "./table/SearchInput"
export function DevicesTable({devices}: {devices: DeviceWithLocation[]}){
    const [search, setSearch] = useState("")
    const router = useRouter()
    const [debouncedSearch, setDebouncedSearch] = useState("")
    useEffect(()=>{
        const handler = setTimeout(()=>{
            setDebouncedSearch(search)
        }, 400)
        return () => clearTimeout(handler)
    },[search])
    const filtered = devices.filter((device)=>
        device.serial.toLowerCase().includes(debouncedSearch.toLowerCase()))
    console.log("Filtered devices:", filtered) // Log the filtered devices for debugging
    return(
        <div className="rounded-xl border border-gray-400 bg-white shadow-sm p-6">
            <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder="Buscar por serial..."
            />
           <div className="overflow-x-auto rounded-xl border border-gray-400 bg-white shadow-sm">
            <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-gray-100 tex-center">
                            <th className="px-6 py-4">Serial</th>
                            <th className="px-6 py-4 ">Sede</th>
                            <th className="px-6 py-4 ">Fecha de asignación</th>
                            <th className="px-6 py-4 ">Descripción</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filtered.map((device)=>(
                            <tr key={device.id} className="text-center hover:bg-slate-200 transition-colors">
                                <td className="p-3">{device.serial}</td>
                                <td className="p-3">{device.locations?.nombre_sede ?? "N/A"}</td>
                                <td className="p-3">{new Date(device.fecha_asignacion).toLocaleDateString()}</td>
                                <td className="p-3">{device.descripcion ?? "N/A"}</td>
                            </tr>
                        ))}
                    </tbody>
            </table>
           </div>
        </div>
    )
}