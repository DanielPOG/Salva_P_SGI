"use client"
import {useEffect, useState} from "react"
import Swal from "sweetalert2"
import {deleteLocation} from "@/app/actions"
import type { LocationWithCompany } from '@/types'
import { useRouter } from "next/navigation"

export  function LocationsTable({locations}: {locations: LocationWithCompany[]} ) {
    const [search, setSearch] = useState('')
    const router = useRouter()
    const [debouncedSearch, setDebouncedSearch] = useState('')
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(search)
        }, 400) 
        return () => {
            clearTimeout(handler)
        }
      }, [search])
    const filtered = locations.filter((loc) =>
        loc.nombre_sede.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    const handleDelete = async (e: React.SyntheticEvent<HTMLFormElement, SubmitEvent>, id: string) => {
       e.preventDefault()
               Swal.fire({
            title: '¿Estás seguro?',
            text: "¡No podrás revertir esta acción!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar',
            customClass: {
                popup: 'bg-white rounded-2xl p-6 shadow-xl border border-gray-100',
                title: 'text-xl font-bold text-gray-800',
                confirmButton: 'bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition duration-200',
                cancelButton: 'bg-gray-100 hover:bg-gray-200 text-gray-700 font-medium py-2 px-4 rounded-lg mr-3'
            },
            buttonsStyling: false
        }).then(async (result) => {
            // Si el usuario confirma en la alerta visual...
            if (result.isConfirmed) {
                try {
                    // Ejecutamos tu Server Action pasando el ID directamente
                    await deleteLocation(id)
                    router.refresh()
                    // Alerta opcional de éxito
                    Swal.fire({
                        title: '¡Eliminado!',
                        text: 'La sede ha sido eliminada correctamente.',
                        icon: 'success',
                        customClass: { confirmButton: 'bg-green-500 text-white py-2 px-4 rounded-lg' },
                        buttonsStyling: false
                    })
                } catch (error) {
                    Swal.fire('Error', 'No se pudo eliminar la sede.', 'error')
                }
            }
        })
    }
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
                <form onSubmit={(e) => handleDelete(e, loc.id)}>
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