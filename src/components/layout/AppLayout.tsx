import { ReactNode, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  Layers,
  GitCompare,
  Brain,
  BarChart3,
  Menu,
  X,
  Search,
  GraduationCap,
} from 'lucide-react';
import { cn } from '@/lib/utils';

interface AppLayoutProps {
  children: ReactNode;
}

const navigation = [
  { name: 'Home', href: '/', icon: LayoutDashboard },
  { name: 'Explore Companies', href: '/explore', icon: Building2 },
  { name: 'Categories', href: '/categories', icon: Layers },
  { name: 'Compare', href: '/compare', icon: GitCompare },
  { name: 'Skill Mapping', href: '/skills', icon: Brain },
  { name: 'Analytics', href: '/analytics', icon: BarChart3 },
];

export function AppLayout({ children }: AppLayoutProps) {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={cn(
          'fixed inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-sidebar-border">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary">
                <GraduationCap className="w-6 h-6 text-primary-foreground" />
              </div>
              <div>
                <span className="text-lg font-bold text-sidebar-foreground">SRM</span>
                <span className="text-xs block text-muted-foreground">Placement Intelligence</span>
              </div>
            </Link>
            <button
              className="lg:hidden text-muted-foreground hover:text-foreground"
              onClick={() => setSidebarOpen(false)}
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={cn(
                    'nav-item',
                    isActive && 'nav-item-active'
                  )}
                  onClick={() => setSidebarOpen(false)}
                >
                  <item.icon className="w-5 h-5" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="p-4 rounded-lg bg-secondary/50">
              <p className="text-xs text-muted-foreground">
                Enterprise Placement Intelligence Platform
              </p>
              <p className="text-xs text-muted-foreground/60 mt-1">
                163 parameters per company
              </p>
            </div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:pl-72">
        {/* Top header */}
        <header className="sticky top-0 z-30 h-16 bg-background/95 backdrop-blur-sm border-b border-border">
          <div className="flex items-center justify-between h-full px-4 lg:px-8">
            <div className="flex items-center gap-4">
              <button
                className="lg:hidden p-2 text-muted-foreground hover:text-foreground hover:bg-secondary rounded-lg"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
              
              {/* Search */}
              <div className="hidden sm:block relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search companies, sectors, skills..."
                  className="search-input pl-10 w-80"
                />
              </div>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-xs text-muted-foreground hidden md:block">
                Data-driven placement decisions
              </span>
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="p-4 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
