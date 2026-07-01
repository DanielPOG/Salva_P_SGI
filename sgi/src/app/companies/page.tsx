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
    .order("nombre");
    return(
        <main className="max-w-7xl mx-auto p-8">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-bold mb-6">Compañías</h1>
                <CreateCompanyModal />
            </div>
            <CompaniesTable companies={companies ?? []} />
        </main>
    )
}