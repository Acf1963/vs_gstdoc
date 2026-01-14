import React, { useState, useRef } from 'react';

interface HeaderProps {
  onEntityClick: () => void;
  onNavChange: (tab: 'home' | 'requests' | 'reports') => void;
  onImport: (file: File) => void;
  onLogout: () => void;
  userName: string;
}

const Header: React.FC<HeaderProps> = ({ onEntityClick, onNavChange, onImport, onLogout, userName }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const menuItems = [
    { label: 'Início', action: () => onNavChange('home'), icon: 'fa-home' },
    { label: 'Solicitação', action: () => onNavChange('requests'), icon: 'fa-plus-circle' },
    { label: 'Relatórios', action: () => onNavChange('reports'), icon: 'fa-chart-bar' },
    { label: 'Cadastros', action: onEntityClick, icon: 'fa-database' },
  ];

  return (
    <header className="bg-navy text-white sticky top-0 z-50 shadow-xl border-b border-white/10">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3 cursor-pointer" onClick={() => onNavChange('home')}>
          <div className="bg-moss p-2 rounded-lg shadow-inner">
            <i className="fas fa-file-invoice text-2xl text-white"></i>
          </div>
          <div>
            <h1 className="text-2xl font-black tracking-tight leading-none">GESTDOC</h1>
            <span className="text-[10px] uppercase tracking-widest text-moss font-bold">Arquivo Inteligente</span>
          </div>
        </div>

        <nav className="hidden lg:flex items-center gap-8">
          {menuItems.map((item) => (
            <button 
              key={item.label}
              onClick={item.action}
              className="hover:text-moss transition-colors font-bold text-sm uppercase flex items-center gap-2"
            >
              <i className={`fas ${item.icon} text-moss`}></i>
              {item.label}
            </button>
          ))}
          
          <div className="h-6 w-px bg-white/20 mx-2"></div>
          
          <div className="flex items-center gap-4">
            <div className="text-right hidden xl:block">
                <div className="text-xs font-black uppercase tracking-tighter leading-none">{userName}</div>
                <div className="text-[9px] text-moss font-bold uppercase">Online</div>
            </div>
            <button onClick={onLogout} className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500 flex items-center justify-center transition-all group" title="Sair">
                <i className="fas fa-sign-out-alt"></i>
            </button>
          </div>
        </nav>

        <button className="lg:hidden text-2xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          <i className={`fas ${isMobileMenuOpen ? 'fa-times' : 'fa-bars'}`}></i>
        </button>
      </div>

      {isMobileMenuOpen && (
        <div className="lg:hidden bg-navy-light border-t border-white/5 py-6 px-4 space-y-4 shadow-inner">
          {menuItems.map((item) => (
            <button 
              key={item.label}
              onClick={() => { item.action(); setIsMobileMenuOpen(false); }}
              className="w-full text-left p-4 hover:bg-white/5 rounded-xl flex items-center gap-4 text-lg font-bold"
            >
              <i className={`fas ${item.icon} text-moss`}></i>
              {item.label}
            </button>
          ))}
          <button onClick={onLogout} className="w-full bg-red-600 text-white p-4 rounded-xl flex items-center justify-center gap-2 font-bold uppercase">
            <i className="fas fa-sign-out-alt"></i> Sair do Sistema
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;