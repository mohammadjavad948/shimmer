export function AsideItem(props: { children: any }) {
  return (
    <div className="flex h-[100%] py-3 px-4 rounded-lg bg-slate-400 cursor-pointer items-center md:h-auto md:w-[100%]">
      {props.children}
    </div>
  );
}
