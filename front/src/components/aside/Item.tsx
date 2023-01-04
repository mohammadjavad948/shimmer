export function AsideItem(props: { children: any, icon: any }) {
  return (
    <div 
      className="flex py-3 px-4 rounded-lg cursor-pointer text-slate-800 items-center md:gap-2 md:h-auto md:w-[100%] hover:bg-slate-300"
    >
      <span className="hidden md:block">
        {props.icon}
      </span>
      
      {props.children}
    </div>
  );
}
