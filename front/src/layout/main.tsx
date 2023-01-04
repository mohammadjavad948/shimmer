import Aside from '../components/aside';
import TopBar from '../components/topbar';

export function MainLayout({ children }: { children: any }) {
  return (
    <div className="flex h-screen flex-col w-screen bg-gray-100 font-sans">
      <TopBar />
      <div className="flex flex-1 flex-col md:flex-row">
        <Aside />
        <div className="container mx-auto flex-1 p-5">{children}</div>
      </div>
    </div>
  );
}
