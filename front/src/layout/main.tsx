import Aside from "../components/aside"


export function MainLayout({children}: {children: any}){
    return (
        <div className="flex gap-2 bg-gray-100 min-h-[100vh] h-[100vh] w-[100%]">
                <Aside />
            <div className="flex-1 bg-gray-200 min-h-[100vh]">

            </div>
        </div>
    )
}