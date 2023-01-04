export function AsideItem(props: { children: any; icon: any }) {
  return (
    <div className="flex cursor-pointer items-center rounded-lg py-3 px-4 font-semibold text-slate-800 hover:bg-slate-300 md:h-auto md:w-[100%] md:gap-2">
      <span className="hidden md:block">{props.icon}</span>
      {props.children}
    </div>
  );
}
