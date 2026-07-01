import { Card } from "@/components/Card";
import { createClient } from "@/lib/supabase/server"
export default async function Home(){
    const { count: countDevice, error: errorDevice } = await createClient()
    .from("devices")
    .select("*", { count: "exact", head: true });

    const { count: countLocation, error: errorLocation } = await createClient()
    .from("locations")
    .select("*", { count: "exact", head: true })
    .eq("estado", true);

    return(
        <main className="p-3">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <h2 className="text-xs font-light opacity-75">Resumen del inventario, sedes y mantenimiento de dispositivos médicos.</h2>
            <article className="mt-6">
                <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                    <Card number={countDevice?.toString() || "0"} sedes={countLocation?.toString() || "0"}>
                        <p className="text-[0.800rem] font-light opacity-75">Dispositivos Totales</p>
                    </Card>
                    <Card number={countDevice?.toString() || "0"} sedes={countLocation?.toString() || "0"}>
                        <p className="text-[0.800rem] font-light opacity-75">Dispositivos Totales</p>
                    </Card>
                </section>
                <section>
                    asda
                </section>
            </article>
        </main>
    )
}