
const fastify = require('fastify')({ logger: true })
const cors = require('@fastify/cors');
const sqlite3 = require('sqlite3').verbose();

//// configurar o banco local

const db = new sqlite3.Database('./finanças.db');

/// criar tabela se não existir

db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS transactions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT,
            amount REAL,
            type TEXT,
            created_at DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    `);
});

/// REGISTRA O CORS para liberar acesso do react

fastify.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
});

/// ROTAS

fastify.get('/transactions', async (request, reply) => {  
    return new Promise((resolve, reject) => {
        db.all('SELECT * FROM transactions ORDER BY created_at DESC', [], (err, rows) => {
            if (err) reject(err);
                resolve(rows);
        });
    });
 });

// Criar transação
fastify.post('/transactions', async (request, reply) => {
    const { title, amount, type } = request.body;
    return new Promise((resolve, reject) => {
        const stmt = db.prepare("INSERT INTO transactions (title, amount, type) VALUES (?, ?, ?)");
        stmt.run(title, amount, type, function(err) {
            if (err) reject(err);
            resolve({ id: this.lastID, title, amount, type });
        });
        stmt.finalize();
    });
});

/// deletar entrada
fastify.delete('/transactions/:id', async (request, reply) => {
    const id = request.params.id;

    return new Promise((resolve, reject) => {
    const stmt = db.prepare("DELETE FROM transactions WHERE id = ?");
        stmt.run(id, function(err) {
        if (err) reject(err);
        resolve({ message: "Deletado com sucesso" });
        });
        stmt.finalize();
    });
});

/// FUNÇÃO PARA DELETAR VÁRIAS ENTRADAS

fastify.post('/transactions/batch-delete', async (request, reply) => {
    const { ids } = request.body; 
    
    return new Promise((resolve, reject) => {
        const placeholders = ids.map(() => '?').join(',');
        const sql = `DELETE FROM transactions WHERE id IN (${placeholders})`;
        
        const stmt = db.prepare(sql);
        stmt.run(ids, function(err) {
            if (err) reject(err);
            resolve({ message: `${this.changes} itens deletados` });
        });
        stmt.finalize();
    });
});

/// FUNÇÃO PURGE

fastify.delete('/transactions', async (request, reply) => {
    return new Promise((resolve, reject) => {
        db.run("DELETE FROM transactions", function(err) {
            if (err) reject(err);
            resolve({ message: "Histórico limpo com sucesso" });
        });
    });
});

// roda o server
const start = async () => {
    try {
        await fastify.listen({ port: 3333, host: '0.0.0.0' });
        console.log('Backend rodando em http://localhost:3333');
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};



start();