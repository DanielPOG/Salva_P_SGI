"use client"
import {useState} from "react"
import {deleteLocation} from "@/app/actions"
import type { LocationWithCompany } from '@/types'
export  function LocationsTable({locations}: {locations: LocationWithCompany[]} ) {
    const [search, setSearch] = useState('')
    const filtered = locations.filter((loc) =>
    loc.nombre_sede.toLowerCase().includes(search.toLowerCase())
    )
    return (
    <div>
      <input
        type="text"
        placeholder="Buscar por nombre de sede..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-4 w-full border rounded px-3 py-2"
      />
      <table className="w-full border-collapse">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-3 text-left">Sede</th>
            <th className="p-3 text-left">Compañía</th>
            <th className="p-3 text-left">Ciudad</th>
            <th className="p-3 text-left">Estado</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((loc) => (
            <tr key={loc.id} className="border-b">
              <td className="p-3">{loc.nombre_sede}</td>
              <td className="p-3">{loc.companies.nombre}</td>
              <td className="p-3">{loc.ciudad}</td>
              <td className="p-3">{loc.estado ? "Activo": "Inactivo"}</td>
              <td className="p-3">
                <form action={deleteLocation.bind(null, loc.id)}>
                  <button type="submit" className="text-red-500 hover:underline">
                    Eliminar
                  </button>
                </form>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {filtered.length === 0 && (
        <p className="text-center text-gray-500 mt-4">No se encontraron sedes.</p>
      )}
    </div>
    )
}