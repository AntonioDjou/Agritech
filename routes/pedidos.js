const express = require('express');
const router = express.Router();
const db = require('../db');
// Listar todos os pedidos
router.get('/', (req, res) => {
  db.query('SELECT * FROM pedidos', (err, results) => {
    if (err) return res.status(500).json({ erro: err });
    res.json(results);
  });
});
//  Criar um novo pedido
router.post('/', (req, res) => {
  const { id_cliente, item, quantidade, data_pedido } = req.body;
  db.query(
    'INSERT INTO pedidos (id_cliente, item, quantidade, data_pedido) VALUES (?, ?, ?, ?)',
    [id_cliente, item, quantidade, data_pedido],
    (err, result) => {
      if (err) return res.status(500).json({ erro: err });
      res.json({
        id_pedido: result.insertId,
        id_cliente,
        item,
        quantidade,
        data_pedido
      });
    }
  );
});
// Buscar um pedido por ID
router.get('/:id', (req, res) => {
  const id = req.params.id;
db.query('SELECT * FROM pedidos WHERE id_pedido = ?', [id], (err, result) => {
    if (err) return res.status(500).json({ erro: err });
    if (result.length === 0) return res.status(404).json({ mensagem: 'Pedido não encontrado' });
    res.json(result[0]);
  });
});
// Atualizar um pedido
router.put('/:id', (req, res) => {
  const id = req.params.id;
  const { id_cliente, item, quantidade, data_pedido } = req.body;
  db.query(
    'UPDATE pedidos SET id_cliente = ?, item = ?, quantidade = ?, data_pedido = ? WHERE id_pedido = ?',
    [id_cliente, item, quantidade, data_pedido, id],
    (err) => {
      if (err) return res.status(500).json({ erro: err });
      res.json({ mensagem: 'Pedido atualizado com sucesso' });
    }
  );
});
// Deletar um pedido
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM pedidos WHERE id_pedido = ?', [id], (err) => {
    if (err) return res.status(500).json({ erro: err });
    res.json({ mensagem: 'Pedido deletado com sucesso' });
  });
});
module.exports = router;
