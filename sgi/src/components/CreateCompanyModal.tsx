'use client' // 🔥 Este sí es un Client Component

import { useState } from 'react'
import { Modal } from '@/components/modal'
import { NewCompanyForm } from "@/components/NewCompanyForm" 
import { useRouter } from 'next/navigation'


export function CreateCompanyModal() {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const handleSuccess = () => {
    setIsOpen(false)
    router.refresh() 
  }

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="bg-sky-300 text-black px-4 py-2 rounded hover:bg-sky-400 transition mb-6"
      >
        + Agregar Compañía
      </button>

      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Registrar Nueva Compañía">
        <NewCompanyForm onSuccess={handleSuccess} />
      </Modal>
    </>
  )
}