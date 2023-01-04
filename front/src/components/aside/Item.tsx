export function AsideItem(props: { children: any, icon: any }) {
  return (
    <div 
      className="flex py-3 px-4 rounded-lg cursor-pointer items-center md:gap-2 md:h-auto md:w-[100%]"
    >
      <span className="hidden md:block text-gray-800">
        {props.icon}
      </span>
      {props.children}
    </div>
  );
}
