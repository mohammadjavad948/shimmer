export function AsideItem(props: { children: any }) {
  return (
    <div className="flex aspect-square h-[100%] cursor-pointer items-center justify-center rounded-md md:h-auto md:w-[100%]">
      {props.children}
    </div>
  );
}
