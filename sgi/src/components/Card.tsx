export function Card({number,sedes,subtitle, children}: {number: string, sedes: string, subtitle: string, children: React.ReactNode}){
    return(
        <div className="bg-white shadow-md rounded-lg p-4 w-full">
            <div className="grid grid-cols-[60px_1fr] gap-4 ">
                <div className="flex items-center justify-center">
                    icon
                </div>
                <div className="flex flex-col items-start justify-center ">
                    <h3 className="text-lg font-bold mb-1">{number}</h3>
                    {children}
                    <p className="text-[0.800rem] font-light opacity-50">{sedes}, {subtitle}</p>
                </div>
            </div>
        </div>
    )
}