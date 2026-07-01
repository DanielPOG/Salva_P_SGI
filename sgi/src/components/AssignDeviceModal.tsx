"use client"

import { useState } from "react"
import { Modal } from "@/components/modal"
import { NewDeviceForm } from "@/components/NewDeviceForm"
import { useRouter } from "next/navigation"
import type { Location } from "@/types/location"
export function AssignDeviceModal({locations}: {locations: Pick<Location, "id" | "nombre_sede">[]}) {
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
                Asignar Dispositivo
            </button>

            <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Asignar Nuevo Dispositivo">
                <NewDeviceForm locations={locations} onSuccess={handleSuccess} />
            </Modal>
        </>
    )
}