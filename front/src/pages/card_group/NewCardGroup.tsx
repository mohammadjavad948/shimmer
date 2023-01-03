import { MainLayout } from '../../layout/main';

export function NewCardGroup() {
  return (
    <MainLayout>
      <div className="mb-2 flex w-full gap-2">
        <span className="text-base font-semibold text-slate-500">
          Card Groups
        </span>

        <span className="font-bold text-slate-500">&gt;</span>

        <span className="text-base font-semibold text-slate-700">New</span>
      </div>
    </MainLayout>
  );
}
