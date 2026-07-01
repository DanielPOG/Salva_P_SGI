'use client'

import { ReactNode } from 'react'

interface ModalProps {
  isOpen: boolean
  onClose: () => void
  title: string
  children: ReactNode
}

export function Modal({ isOpen, onClose, title, children }: ModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 ">
      {/* Caja del Modal */}
      <div className="bg-white w-full max-w-md rounded-lg shadow-xl p-6 relative animate-in fade-in zoom-in-95 duration-200">
        
        {/* Cabecera */}
        <div className="flex items-center justify-between mb-4 border-b pb-2">
          <h2 className="text-xl font-bold text-gray-800">{title}</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-2xl font-semibold p-1"
          >
            &times;
          </button>
        </div>

        {/* Cuerpo (Aquí cae el formulario) */}
        <div>{children}</div>
      </div>
    </div>
  )
}