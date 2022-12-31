import Aside from "../components/aside"


export function MainLayout({children}: {children: any}){
    return (
        <div className="flex gap-2 bg-gray-100 min-h-[100vh] h-[100vh] w-[100%]">
            <div className="h-[100vh] p-2 w-16 flex">
                <Aside />
            </div>
            <div className="container flex-1 bg-gray-200 min-h-[100vh]">

            </div>
        </div>
    )
}