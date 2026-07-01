import { Card } from "@/components/Card";
import { ChartBarLabelCustom } from "@/components/Chart";
import { ChartPieDonutText } from "@/components/ChartPie";
import { createClient } from "@/lib/supabase/server"
export default async function Home(){
    const { count: countDevice, error: errorDevice } = await createClient()
    .from("devices")
    .select("*", { count: "exact", head: true });
    const { count: countDeviceAssigned, error: errorDeviceAssigned } = await createClient()
    .from("devices")
    .select("*", { count: "exact", head: true })
    .not("location_id", "is", null);
    const { count: countLocation, error: errorLocation } = await createClient()
    .from("locations")
    .select("*", { count: "exact", head: true })
    .eq("estado", true);

    const { count: countCompany, error: errorCompany } = await createClient()
    .from("companies")
    .select("*", {count:"exact", head: true });
    return(
        <main className="max-w-7xl mx-auto p-8">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <h2 className="text-xs font-light opacity-75">Resumen del inventario, sedes y mantenimiento de dispositivos médicos.</h2>
            <article className="mt-6">
                <section className="grid grid-cols-1 mb-2 md:grid-cols-2 mb-3 xl:grid-cols-2 gap-6 mb-5">
                    <Card number={countDevice?.toString() || "0"} sedes={countDeviceAssigned?.toString() || "0"} subtitle="Dispositivos Asignados">
                        <p className="text-[0.800rem] font-light opacity-75">Dispositivos Totales</p>
                    </Card>
                    <Card number={countCompany?.toString() || "0"} sedes={countLocation?.toString() || "0"} subtitle="Sedes Activas">
                        <p className="text-[0.800rem] font-light opacity-75">Compañías</p>
                    </Card>
                </section>
                <section className="grid grid-cols-2 ">
                    <ChartBarLabelCustom/>
                    <ChartPieDonutText/>
                </section>
            </article>
        </main>
    )
}