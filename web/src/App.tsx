import { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { NewTransactionModal } from './components/NewTransactionModal';
import { Summary } from './components/Summary';
import { Trash2, X } from 'lucide-react';
import { ClearAllModal } from './components/ClearAllModal';


interface Transaction {
  id: number;
  title: string;
  amount: number;
  type: 'deposit' | 'withdraw';
  created_at?: string;
}

function App() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] = useState(false);
  const [isClearModalOpen, setIsClearModalOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  // FUNÇÃO PARA CARREGAR OS DADOS
  function loadTransactions() {
    fetch('http://localhost:3333/transactions')
      .then(response => response.json())
      .then(data => setTransactions(data));
  }

  /// FUNÇÃO PARA DELETAR LINHAS

  async function handleDeleteTransaction(id: number) {
    /// CONFIRMAÇÃO SE USUÁRIO QUER DELETAR
    const confirmed = confirm("Tem certeza que deseja apagar essa transação?");
    if (!confirmed) return;

    //// chama o BACKEND
    await fetch(`http://localhost:3333/transactions/${id}`, {
      method: 'DELETE',
    });

    //// RECARREGA A LISTA
    loadTransactions();
  }

  // Carrega ao iniciar
  useEffect(() => {
    loadTransactions();
  }, []);

  //// FUNÇÃO SELECIONAR OU DESSELECIONAR
  function toggleSelect(id: number) {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter(item => item !== id));
    } else {
      setSelectedIds([...selectedIds, id]);
    }
  }

  //// função para selecionar todos
  function toggleSelectAll() {
    if (selectedIds.length === transactions.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(transactions.map(t => t.id));
    }
  }

  //// DELETAR EM MASSA
  async function handleBatchDelete() {
    if (!confirm(`Tem certeza que deseja apagar ${selectedIds.length} itens?`)) return;

    await fetch('http://localhost:3333/transactions/batch-delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids: selectedIds })
    });

    setSelectedIds([]); // LIMPAR
    loadTransactions(); // RECARREGAR
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <Header onOpenNewTransactionModal={() => setIsNewTransactionModalOpen(true)} />

      <Summary transactions={transactions} />

      <NewTransactionModal
        isOpen={isNewTransactionModalOpen}
        onClose={() => setIsNewTransactionModalOpen(false)}
        onSuccess={() => loadTransactions()}
      />

      <main className="max-w-4xl mx-auto px-6 py-10">

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-zinc-300">Suas Transações</h2>

          {/* MOSTRA O BOTÃO APENAS SE TIVER O QUE APAGAR */}
          {transactions.length > 0 && (
            <button
              onClick={() => setIsClearModalOpen(true)}
              className="text-xs text-zinc-500 hover:text-red-400 underline transition-colors"
            >
              Limpar todo o histórico
            </button>
          )}
        </div>

        <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
          <table className="w-full text-left">
            <thead className="bg-zinc-950 text-zinc-400">
              <tr>
                {/* CHECKBOX "SELECT ALL" NO CABEÇALHO */}
                <th className="p-4 w-12">
                  <input
                    type="checkbox"
                    className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                    checked={transactions.length > 0 && selectedIds.length === transactions.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="p-4 font-medium">Descrição</th>
                <th className="p-4 font-medium">Valor</th>
                <th className="p-4 font-medium">Tipo</th>
              </tr>
            </thead>
            <tbody>
              {transactions.length === 0 ? (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-zinc-500">
                    Nenhuma transação registrada.
                  </td>
                </tr>
              ) : (
                transactions.map(item => (
                  <tr key={item.id} className={`border-t border-zinc-800 hover:bg-zinc-800/50 group transition-colors ${selectedIds.includes(item.id) ? 'bg-zinc-800/80' : ''}`}>

                    {/* CHECKBOX DA LINHA */}
                    <td className="p-4">
                      <input
                        type="checkbox"
                        className="accent-emerald-500 w-4 h-4 rounded cursor-pointer"
                        checked={selectedIds.includes(item.id)}
                        onChange={() => toggleSelect(item.id)}
                      />
                    </td>

                    <td className="p-4">{item.title}</td>
                    <td className={`p-4 font-bold ${item.type === 'deposit' ? 'text-emerald-400' : 'text-red-400'}`}>
                      {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(item.amount)}
                    </td>
                    <td className="p-4 flex justify-between items-center">
                      <span className="text-sm text-zinc-500">
                        {item.type === 'deposit' ? 'Entrada' : 'Saída'}
                      </span>
                      {/* BOTÃO DA LIXEIRA PARA APAGAR RAPIDAMENTE */}
                      <button
                        onClick={() => handleDeleteTransaction(item.id)}
                        className="text-zinc-600 hover:text-red-500 transition-colors p-2 opacity-0 group-hover:opacity-100"
                        title="Excluir"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <ClearAllModal
          isOpen={isClearModalOpen}
          onClose={() => setIsClearModalOpen(false)}
          onSuccess={() => loadTransactions()}
        />

            {selectedIds.length > 0 && (
          <div className="fixed bottom-10 left-1/2 -translate-x-1/2 bg-zinc-800 border border-zinc-700 shadow-2xl rounded-full px-6 py-3 flex items-center gap-6 z-50 animate-bounce">
            
            <div className="flex items-center gap-2">
              <span className="bg-emerald-500/10 text-emerald-500 text-xs font-bold px-2 py-1 rounded-full">
                {selectedIds.length}
              </span>
              <span className="text-sm font-medium text-zinc-100">selecionados</span>
            </div>

            <div className="h-4 w-px bg-zinc-600"></div>

            <button 
              onClick={handleBatchDelete}
              className="text-red-400 hover:text-red-300 text-sm font-bold flex items-center gap-2 transition-colors"
            >
              <Trash2 size={16} />
              Excluir Selecionados
            </button>
            
             <div className="h-4 w-px bg-zinc-600"></div>

             {/*BOTÃO PARA CANCELAR A SELEÇÃO */}
             <button 
              onClick={() => setSelectedIds([])}
              className="text-zinc-400 hover:text-zinc-200 transition-colors"
             >
                <X size={16} />
             </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default App;