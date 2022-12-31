

export function AsideItem(props: {children:any}){

    return (
        <div className="w-[100%] aspect-square bg-slate-400 rounded-md flex items-center justify-center cursor-pointer">
            {props.children}
        </div>
    )
}