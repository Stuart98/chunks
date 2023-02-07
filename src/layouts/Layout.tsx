import PageContent from '@/layouts/PageContent';
import LeftSidebar from '@/layouts/LeftSidebar';

function Layout() {
  return (
    <div data-theme="emerald" className="drawer drawer-mobile bg-base-200">
      <input
        id="left-sidebar-drawer"
        type="checkbox"
        className="drawer-toggle"
      />
      <PageContent />
      <LeftSidebar />
    </div>
  );
}

export default Layout;
