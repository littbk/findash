interface HeaderProps {
  onOpenNewTransactionModal: () => void;
}

export function Header({ onOpenNewTransactionModal }: HeaderProps) {
  return (
    <header className="bg-zinc-900 py-6 border-b border-zinc-800">
      <div className="max-w-4xl mx-auto px-6 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-emerald-500">FinDash 💰</h1>
        <button 
          onClick={onOpenNewTransactionModal}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded font-medium transition-colors"
        >
          Nova Transação
        </button>
      </div>
    </header>
  );
}