import Aside from '../components/aside';

export function MainLayout({ children }: { children: any }) {
  return (
    <div className="flex h-[100vh] w-[100%] flex-col bg-gray-100 md:min-h-[100vh] md:flex-row md:gap-2">
      <Aside />
      <div className="flex-1 bg-gray-200 md:min-h-[100vh]">hi</div>
    </div>
  );
}
