"use client"

import { useState } from "react"
import { Modal} from "@/components/modal"
import { NewLocationForm } from "@/components/NewLocationForm" 
import { useRouter } from "next/navigation"
import { Company } from "@/types/company"

export function CreateLocationModal({companies}: {companies: Pick<Company, 'id' | 'nombre'>[]}) {
    const [isOpen, setIsOpen] = useState(false)
    const router = useRouter()
    const handleSuccess = ()=>{
        setIsOpen(false)
        router.refresh() 
    }
    return(
        <>
            <button
            onClick={() => setIsOpen(true)}
            className="bg-sky-300 text-black px-4 py-2 rounded hover:bg-sky-400 transition mb-6"
            >
            + Agregar Sede
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Registrar Nueva Sede">
                <NewLocationForm companies={companies} onSuccess={handleSuccess} />
            </Modal>
        </>
    )
}