import { ArrowUpCircle, ArrowDownCircle, DollarSign } from 'lucide-react';

interface SummaryProps {
  transactions: {
    type: 'deposit' | 'withdraw';
    amount: number;
  }[];
}

export function Summary({ transactions }: SummaryProps) {
    const summary = transactions.reduce(
    (acc, transaction) => {
      if (transaction.type === 'deposit') {
        acc.deposits += transaction.amount;
        acc.total += transaction.amount;
      } else {
        acc.withdraws += transaction.amount;
        acc.total -= transaction.amount;
      }
      return acc;
    },
    { deposits: 0, withdraws: 0, total: 0 } 
  );

  /// FORMATAR EM FORMATO MOEDA
  const formatMoney = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="max-w-4xl mx-auto px-6 -mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
      
      {/* Card Entradas */}
      <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
        <header className="flex items-center justify-between text-zinc-400 mb-4">
          <span>Entradas</span>
          <ArrowUpCircle className="text-emerald-500" size={32} />
        </header>
        <strong className="text-2xl font-bold text-emerald-400">
          {formatMoney(summary.deposits)}
        </strong>
      </div>

      {/* Card Saídas */}
      <div className="bg-zinc-800 p-6 rounded-lg border border-zinc-700">
        <header className="flex items-center justify-between text-zinc-400 mb-4">
          <span>Saídas</span>
          <ArrowDownCircle className="text-red-500" size={32} />
        </header>
        <strong className="text-2xl font-bold text-red-400">
          {formatMoney(summary.withdraws)}
        </strong>
      </div>

      {/* Card Total */}
      <div className={`p-6 rounded-lg border border-zinc-700 ${summary.total >= 0 ? 'bg-emerald-700' : 'bg-red-700'}`}>
        <header className="flex items-center justify-between text-zinc-100 mb-4">
          <span>Total</span>
          <DollarSign className="text-white" size={32} />
        </header>
        <strong className="text-2xl font-bold text-white">
          {formatMoney(summary.total)}
        </strong>
      </div>

    </div>
  );
}