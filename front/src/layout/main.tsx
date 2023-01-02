import Aside from '../components/aside';

export function MainLayout({ children }: { children: any }) {
  return (
    <div className="flex h-screen w-screen bg-gray-100">
      {/* <Aside /> */}
      <div className="flex-1 container p-5 mx-auto bg-gray-200">
        {children}
      </div>
    </div>
  );
}
