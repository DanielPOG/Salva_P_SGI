"use server"

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createClient  } from '@/lib/supabase/server'

// Schemas
const companySchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  NIT: z.string().min(1, 'El NIT es obligatorio'),
})

const locationSchema = z.object({
  company_id: z.string()
  .min(1, 'Debes seleccionar una compañía válida')
  .transform((val) => Number(val)),
  nombre_sede: z.string().min(1, 'El nombre de sede es obligatorio'),
  ciudad: z.string().min(1, 'La ciudad es obligatoria'),
  direccion: z.string().min(1, 'La dirección es obligatoria'),
  estado: z.string()
    .transform((val) => val === 'true'),
})

// Actions

export async function createCompany(prevState: any , formData: FormData){
    // validar esquema
    const validated = companySchema.safeParse({
        nombre: formData.get("nombre"),
        NIT: formData.get("NIT")
    })

    if (!validated.success){
       return { errors: z.treeifyError(validated.error) }
    }
    const {error} = await createClient().from("companies").insert(validated.data)
    if(error) return {message: error.message}
    revalidatePath("/companies")
    return {success: true}
}   

export async function createLocation(prevState: any, formData: FormData){
    const validated = locationSchema.safeParse({
        company_id: formData.get('company_id'),
        nombre_sede: formData.get('nombre_sede'),
        ciudad: formData.get('ciudad'),
        direccion: formData.get('direccion'),
        estado: formData.get('estado'),
    })
    if(!validated.success){
        return {errors: z.treeifyError(validated.error)}
    }
    const {error} = await createClient().from("locations").insert(validated.data)
    if(error) return {message: error.message}
    revalidatePath("/")
    return {success: true}
}

export async function deleteLocation(id:string){
    await createClient().from("locations").delete().eq("id",id)
    revalidatePath("/")
}