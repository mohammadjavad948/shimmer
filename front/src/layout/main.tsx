import Aside from '../components/aside';

export function MainLayout({ children }: { children: any }) {
  return (
    <div className="flex h-screen w-screen bg-gray-100 font-sans">
      <Aside />
      <div className="container mx-auto flex-1 p-5">{children}</div>
    </div>
  );
}
