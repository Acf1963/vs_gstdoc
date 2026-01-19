import React, { useState } from 'react';
import { Entity } from '../types';

interface LoginFormProps {
  onLogin: (user: Entity) => void;
  entities: Entity[];
}

const LoginForm: React.FC<LoginFormProps> = ({ onLogin, entities }) => {
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const found = entities.find(e => e.type === 'usuarios' && e.name === user && e.pass === pass);
    if (found) {
      onLogin(found);
    } else {
      setError(true);
    }
  };

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4 bg-gradient-to-br from-navy to-slateBg">
      <div className="glass-card w-full max-w-md p-10 rounded-[40px] shadow-2xl text-center animate-fadeIn">
        <div className="bg-navy w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-xl">
          <i className="fas fa-file-invoice text-4xl text-white"></i>
        </div>
        <h2 className="text-3xl font-black text-navy uppercase tracking-tighter mb-2">Acesso Gestdoc</h2>
        <p className="text-slate-500 font-medium mb-8">Insira suas credenciais para continuar</p>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="text-left">
            <label className="text-[10px] font-black text-navy uppercase ml-4">Usuário</label>
            <input 
              type="text" 
              value={user}
              onChange={e => setUser(e.target.value)}
              required 
              placeholder="admin" 
              className="w-full p-4 rounded-2xl font-bold text-lg border-2 outline-none focus:border-moss transition-all"
            />
          </div>
          <div className="text-left">
            <label className="text-[10px] font-black text-navy uppercase ml-4">Palavra-passe</label>
            <input 
              type="password" 
              value={pass}
              onChange={e => setPass(e.target.value)}
              required 
              placeholder="••••••" 
              className="w-full p-4 rounded-2xl font-bold text-lg border-2 outline-none focus:border-moss transition-all"
            />
          </div>
          {error && <div className="text-red-500 text-xs font-bold">Credenciais inválidas. Tente novamente.</div>}
          <button type="submit" className="w-full bg-navy text-white p-5 rounded-2xl font-black text-sm uppercase tracking-widest shadow-xl hover:bg-navy/90 transition-all mt-4">
            Entrar no Sistema
          </button>
        </form>
        <div className="mt-8 pt-6 border-t border-slate-100">
          <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Arquivo Inteligente &copy; 2024</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;