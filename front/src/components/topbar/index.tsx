export default function TopBar() {
  return (
    <div className="flex h-10 w-full items-center border-b-2 border-b-slate-400 px-2">
      <div className="flex gap-2">
        <span className="cursor-pointer rounded-md py-1 px-3 font-bold text-slate-800 hover:bg-slate-300">
          &lt;
        </span>
      </div>
    </div>
  );
}
