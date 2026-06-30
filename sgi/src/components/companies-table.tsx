"use client"
import {useState} from "react"
import type { CompanyWithLocations } from '@/types'
import { table } from "console"

export function CompaniesTable({companies}: {companies: CompanyWithLocations[]}){
    const [search, setSearch] = useState("")
    const filtered = companies.filter((company) =>
        company.nombre.toLowerCase().includes(search.toLowerCase())
    )
    console.log("Filtered companies:", filtered) // Agrega este console.log para depuración
    
    return (
        <div>
          <input
            type="text"
            placeholder="Buscar por nombre de compañía..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="mb-4 w-full border rounded px-3 py-2"
          />
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-3 text-left">nombre</th>
                <th className="p-3 text-left">NIT</th>
                <th className="p-3 text-left">Sede</th>
                <th className="p-3 text-left">Fecha de Creación</th>

              </tr>
            </thead>
            <tbody>
              {filtered.map((company) => (
                <tr key={company.id} className="border-b">
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
        )
}