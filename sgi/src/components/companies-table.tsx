"use client"
import {useState, useEffect} from "react"
import type { CompanyWithLocations } from '@/types'
import { table } from "console"

export function CompaniesTable({companies}: {companies: CompanyWithLocations[]}){
    const [search, setSearch] = useState("")
    const [debouncedSearch, setDebouncedSearch] = useState("")
    useEffect(()=>{
      const handler = setTimeout(()=>{
        setDebouncedSearch(search)
      }, 400)
      return () => clearTimeout(handler)
    },[search])
    const filtered = companies.filter((company) =>
        company.nombre.toLowerCase().includes(debouncedSearch.toLowerCase())
    )

    
    return (
        <div className="rounded-xl border border-gray-400 bg-white shadow-sm p-6">
          <input
            type="text"
            placeholder="Buscar por nombre de compañía..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-full border border-gray-500 rounded-lg px-3 py-2"
          />
          <div className="overflow-x-auto rounded-xl border border-gray-400 bg-white shadow-sm">
          
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left">nombre</th>
                  <th className="px-6 py-4 text-left">NIT</th>
                  <th className="px-6 py-4 text-left">Sede</th>
                  <th className="px-6 py-4 text-left">Fecha de Creación</th>

                </tr>
              </thead>
              <tbody>
                {filtered.map((company) => (
                  <tr key={company.id} className=" hover:bg-slate-200 transition-colors">
                    <td className="p-3">{company.nombre}</td>
                    <td className="p-3">{company.NIT}</td>
                    <td className="p-3">
                      {company.locations && company.locations.length > 0 
                          ? `${company.locations[0].nombre_sede} - ${company.locations[0].ciudad}`
                          : "Sin sede"}
                      </td>
                    <td className="p-3">{new Date(company.fecha_creacion).toLocaleDateString()}</td>
                  
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No se encontraron compañías.</p>
            )}
          </div>
        </div>
        )
}