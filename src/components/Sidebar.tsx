import { Database, Users, BarChart3, X, Building2 } from 'lucide-react';

interface SidebarProps {
  activeItem: string;
  onItemClick: (item: string) => void;
  mobileMenuOpen: boolean;
  onCloseMobileMenu: () => void;
}

export function Sidebar({ activeItem, onItemClick, mobileMenuOpen, onCloseMobileMenu }: SidebarProps) {
  const menuItems = [
    { id: 'colegiados', label: 'Colegiados', icon: Building2 },
    { id: 'representantes', label: 'Representantes', icon: Users },
    { id: 'area-dados', label: 'Área de dados', icon: BarChart3 },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {mobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onCloseMobileMenu}
        />
      )}
      
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50
        w-[200px] bg-[#003366] min-h-screen flex flex-col
        transition-transform duration-300 lg:translate-x-0
        ${mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Close button for mobile */}
        <button
          onClick={onCloseMobileMenu}
          className="lg:hidden absolute top-4 right-4 text-white/90 hover:text-white"
        >
          <X size={24} />
        </button>

        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeItem === item.id;
          
          return (
            <button
              key={item.id}
              onClick={() => onItemClick(item.id)}
              className={`
                flex items-center gap-3 px-5 py-4 
                transition-colors duration-200
                ${isActive 
                  ? 'bg-[#0055aa] text-white' 
                  : 'text-white/90 hover:bg-[#004080]'
                }
              `}
            >
              <Icon size={18} />
              <span className="font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </>
  );
}
