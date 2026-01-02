import { useState, FormEvent } from 'react';


//// criando tipo do modal e condições
interface NewTransactionModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

//// função que guarda os dados de entrada
export function NewTransactionModal({ isOpen, onClose, onSuccess }: NewTransactionModalProps) {
    const [title, setTitle] = useState('');
    const [amount, setAmount] = useState(0);
    const [type, setType] = useState<'deposit' | 'withdraw'>('deposit');

    /// SE NÃO ESTIVER ABERTO NÃO RENDERIZA
    if (!isOpen) {
        return null;
    }

    /// FUNÇÃO SUB,OT

    async function handleCreateNewTransaction(e: FormEvent) {

        e.preventDefault();

        /// envia para o backend
        await fetch('http://localhost:3333/transactions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title, amount, type }),
        });

        ////    LIMPAR OS CAMPOS
        setTitle('');
        setAmount(0);
        setType('deposit');

        /// CONFIRMA QUE DEU CERTO

        onClose();
        onSuccess();
    }

    return (
        // Fundo escuro do MODAL
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center backdrop-blur-sm">

            {/* CRIA JANELA DO MODAL */}
            <div className="bg-zinc-900 p-8 rounded-lg w-full max-w-md border border-zinc-800 shadow-xl">
                <h2 className="text-2xl font-bold mb-6 text-zinc-200">Nova Transação</h2>

                <form onSubmit={handleCreateNewTransaction} className="flex flex-col gap-4">

                    <input
                        placeholder="Descrição (ex: Aluguel)"
                        className="bg-zinc-950 text-white p-4 rounded border border-zinc-800 placeholder:text-zinc-500"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        required
                    />

                    <input
                        type="number"
                        placeholder="Valor"
                        className="bg-zinc-950 text-white p-4 rounded border border-zinc-800 placeholder:text-zinc-500"
                        value={amount}
                        onChange={e => setAmount(Number(e.target.value))} // Converte texto para número
                        required
                    />

                    <div className="grid grid-cols-2 gap-4">
                        <button
                            type="button" // Type button para não enviar o form
                            onClick={() => setType('deposit')}
                            className={`p-4 rounded border flex items-center justify-center gap-2 transition-colors ${type === 'deposit'
                                    ? 'bg-emerald-500/10 border-emerald-500 text-emerald-500'
                                    : 'bg-zinc-800 border-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            Entrada
                        </button>

                        <button
                            type="button"
                            onClick={() => setType('withdraw')}
                            className={`p-4 rounded border flex items-center justify-center gap-2 transition-colors ${type === 'withdraw'
                                    ? 'bg-red-500/10 border-red-500 text-red-500'
                                    : 'bg-zinc-800 border-zinc-800 text-zinc-300 hover:bg-zinc-700'
                                }`}
                        >
                            Saída
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold p-4 rounded mt-4 transition-colors"
                    >
                        Cadastrar
                    </button>

                    <button
                        type="button"
                        onClick={onClose}
                        className="text-zinc-500 hover:text-zinc-300 text-sm text-center"
                    >
                        Cancelar
                    </button>
                </form>
            </div>
        </div>
    );
}