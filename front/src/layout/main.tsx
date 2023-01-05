import Aside from '../components/aside';
import TopBar from '../components/topbar';

export function MainLayout({ children }: { children: any }) {
  return (
    <div className="flex h-screen max-h-screen w-screen flex-col overflow-hidden bg-gray-100 font-sans">
      <TopBar />
      <div className="flex h-full flex-1 flex-col md:flex-row">
        <Aside />
        <div className="container mx-auto h-full w-full overflow-auto p-5 pb-10">
          {children}
        </div>
      </div>
    </div>
  );
}
