import { CompaniesTable } from "@/components/companies-table";
import { createClient } from "@/lib/supabase/server";
import { CreateCompanyModal } from "@/components/CreateCompanyModal"
export default async function Companies(){
    const { data: companies } = await createClient()
    .from("companies")
    .select(`
        *,
        locations (
        nombre_sede,
        ciudad,
        company_id
        )
    `)
    .order("fecha_creacion", { ascending: false });
    return(
        <main className="max-w-7xl mx-auto p-8">
            <div className="flex items-center justify-between">
                <div className="grid grid-cols-1 mb-4">
                    <h1 className="text-3xl font-bold mb-4">Compañías</h1>
                    <h2 className="text-xs font-light opacity-75">Gestión de compañías y sus respectivas sedes.</h2>
                </div>
                <CreateCompanyModal />
            </div>
            <CompaniesTable companies={companies ?? []} />
        </main>
    )
}