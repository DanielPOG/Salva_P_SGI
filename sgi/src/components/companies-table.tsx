"use client"
import {useState, useEffect} from "react"
import type { CompanyWithLocations } from '@/types'
import { SearchInput } from "./table/SearchInput"
import { useRouter } from "next/navigation"
import { NewCompanyForm } from "./NewCompanyForm"
import { Modal } from "./modal"

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
    const [isOpen, setIsOpen] = useState(false)
    const [selectedCompany, setSelectedCompany] = useState<CompanyWithLocations | null>(null)
    const router = useRouter()
  
    const handleSuccess = () => {
      setIsOpen(false)
        setSelectedCompany(null)
      router.refresh() 
    }
    
    return (
        <div className="rounded-xl border border-gray-400 bg-white shadow-sm p-6">
          <SearchInput
            search={search}
            setSearch={setSearch}
            placeholder="Buscar por nombre de compañía..."
          />
          <div className="overflow-x-auto overflow-y-scroll max-h-96 rounded-xl border border-gray-400 bg-white shadow-sm">
          
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="px-6 py-4 text-left">nombre</th>
                  <th className="px-6 py-4 text-left">NIT</th>
                  <th className="px-6 py-4 text-left">Sede</th>
                  <th className="px-6 py-4 text-left">Fecha de Creación</th>
                  <th className="px-6 py-4 text-left">Acciones</th>

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
                    <td className="p-3">
                      <button
                        onClick={() => {
                          setSelectedCompany(company)
                          setIsOpen(true)
                        }}
                        className="bg-sky-500 text-white px-4 py-2 rounded-md hover:bg-sky-600"
                      >
                        Editar
                      </button>
                    </td>
                  </tr>

                ))}
              </tbody>
            </table>
            {selectedCompany && (
              <Modal
                isOpen={isOpen}
                onClose={() => {
                  setIsOpen(false)
                  setSelectedCompany(null)
                }}
                title={`Actualizar compañía: ${selectedCompany.nombre}`}
              >
                <NewCompanyForm mode="update" initialData={selectedCompany} onSuccess={handleSuccess} />
              </Modal>
            )}

            {filtered.length === 0 && (
              <p className="text-center text-gray-500 mt-4">No se encontraron compañías.</p>
            )}
          </div>
        </div>
        )
}