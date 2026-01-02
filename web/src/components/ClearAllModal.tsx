import { useState } from 'react';
import { AlertTriangle } from 'lucide-react';

interface ClearAllModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function ClearAllModal({ isOpen, onClose, onSuccess }: ClearAllModalProps) {
  const [confirmationText, setConfirmationText] = useState('');
  const CONFIRMATION_PHRASE = "excluir tudo"; 

  if (!isOpen) return null;

  const handleClearAll = async () => {
    if (confirmationText !== CONFIRMATION_PHRASE) return;

    await fetch('http://localhost:3333/transactions', {
      method: 'DELETE',
    });

    setConfirmationText(''); 
    onSuccess(); 
    onClose(); 
  };

  return (
    <div className="fixed inset-0 bg-black/80 flex items-center justify-center backdrop-blur-sm z-50">
      <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md border border-red-900/50 shadow-2xl">
        
        <div className="flex flex-col items-center gap-4 mb-6 text-center">
          <div className="bg-red-500/10 p-4 rounded-full">
            <AlertTriangle className="text-red-500" size={40} />
          </div>
          <h2 className="text-2xl font-bold text-red-500">Zona de Perigo</h2>
          <p className="text-zinc-400">
            Você está prestes a apagar <strong>todas as transações</strong>. 
            Essa ação não pode ser desfeita.
          </p>
        </div>

        <div className="space-y-4">
          <label className="block text-sm text-zinc-300">
            Para confirmar, digite <span className="font-bold text-red-400 select-none">"{CONFIRMATION_PHRASE}"</span> abaixo:
          </label>
          
          <input 
            type="text"
            className="w-full bg-zinc-950 text-white p-3 rounded border border-zinc-700 focus:border-red-500 outline-none transition-colors"
            placeholder={CONFIRMATION_PHRASE}
            value={confirmationText}
            onChange={(e) => setConfirmationText(e.target.value)}
            onPaste={(e) => e.preventDefault()} 
          />

          <button 
            onClick={handleClearAll}
            disabled={confirmationText !== CONFIRMATION_PHRASE}
            className={`w-full font-bold p-4 rounded mt-2 transition-all duration-300 ${
              confirmationText === CONFIRMATION_PHRASE
                ? 'bg-red-600 hover:bg-red-700 text-white cursor-pointer shadow-[0_0_20px_rgba(220,38,38,0.5)]' 
                : 'bg-zinc-800 text-zinc-500 cursor-not-allowed opacity-50'
            }`}
          >
            Entendo as consequências, apagar tudo
          </button>
          
          <button 
            onClick={onClose}
            className="w-full text-zinc-500 hover:text-zinc-300 text-sm mt-2"
          >
            Cancelar
          </button>
        </div>
      </div>
    </div>
  );
}