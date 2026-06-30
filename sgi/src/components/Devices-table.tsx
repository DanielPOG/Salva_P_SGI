"use client"
import {useEffect, useState} from "react"
import type { DeviceWithLocation } from "@/types"
import { useRouter } from "next/navigation"
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
        <div>
            <input
                type="text"
                placeholder="Buscar por serial"
                value={search}
                onChange={(e)=> setSearch(e.target.value)}
                className="mb-4 w-full border rounded px-3 py-2"
           />
           <table className="w-full border-collapse">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="p-3 text-left">Serial</th>
                        <th className="p-3 text-left">Sede</th>
                        <th className="p-3 text-left">Fecha de asignación</th>
                        <th className="p-3 text-left">Descripción</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.map((device)=>(
                        <tr key={device.id} className="border-b">
                            <td className="p-3">{device.serial}</td>
                            <td className="p-3">{device.locations?.nombre_sede ?? "N/A"}</td>
                            <td className="p-3">{new Date(device.fecha_asignacion).toLocaleDateString()}</td>
                            <td className="p-3">{device.descripcion ?? "N/A"}</td>
                        </tr>
                    ))}
                </tbody>
           </table>
        </div>
    )
}