"use server"

import { z } from 'zod'
import { revalidatePath } from 'next/cache'
import { createClient  } from '@/lib/supabase/server'

// Schemas
const companySchema = z.object({
  nombre: z.string().min(1, 'El nombre es obligatorio'),
  NIT: z.string().min(1, 'El NIT es obligatorio'),
})

const companyUpdateSchema = z.object({
    nombre: z.string().min(1, 'El nombre es obligatorio'),
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

const deviceSchema = z.object({
    serial: z.string().min(1, 'El serial es obligatorio'),
    location_id: z
    .preprocess((val) => (val === "" ? null : val), z.string().nullable().optional())
    .nullable(),
    fecha_asignacion: z.string().transform((val)=> new Date(val)),
    descripcion: z.string().optional(),
})
const deviceAssignmentSchema = z.object({
    serial: z.string().min(1, 'El serial es obligatorio'),
    location_id: z.string().transform((val)=>Number(val)),
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
export async function updateCompany(companyId: string, prevState: any, formData: FormData){
    const validated = companyUpdateSchema.safeParse({
        nombre: formData.get("nombre"),
    })
    if(!validated.success){
        return {errors: z.treeifyError(validated.error)}
    }
    const {error} = await createClient().from("companies").update(validated.data).eq("id", companyId)
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
    revalidatePath("/sedes")
    return {success: true}
}

export async function deleteLocation(id:string){
    try {

        await createClient().from("locations").delete().eq("id",id)
        revalidatePath("/sedes")
    }catch (error) {
        console.error("Error deleting location:", error)
        throw error
    }
}

export async function createDevice(prevState: any, formData: FormData){
    const locationInput= formData.get("location_id")
    const fechaInput= formData.get("fecha_asignacion")
    const fechaFinal = fechaInput && fechaInput !== "" 
    ? new Date(fechaInput as string).toISOString() 
    : new Date().toISOString(); 
    const validated = deviceSchema.safeParse({
        serial: formData.get("serial"),
        location_id: locationInput ? locationInput : null,
        fecha_asignacion: fechaFinal,
        descripcion: formData.get("descripcion")
    })
    if (!validated.success){
        return {errors: z.treeifyError(validated.error)}
    }
    const {error} = await createClient().from("devices").insert(validated.data)
    if(error) return {message: error.message}
    revalidatePath("/devices")
    return {success: true}
}
export async function assignDeviceToLocation(prevState: any, formData: FormData){
    const validated = deviceAssignmentSchema.safeParse({
        serial: formData.get("serial"),
        location_id: formData.get("location_id")
    })
    if(!validated.success){
        console.log("erro",JSON.stringify(validated.error.format(), null, 2))
        return {errors: z.treeifyError(validated.error)}
    }
    const {error} = await createClient().from("devices").update({location_id: validated.data.location_id, fecha_asignacion: new Date().toISOString()}).eq("serial", validated.data.serial)
    if(error) return {message: error.message}
    revalidatePath("/devices")
    return {success: true}
}