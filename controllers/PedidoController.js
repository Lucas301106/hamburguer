import Pedido from '../models/Pedido.js';
import Entrega from '../models/Entrega.js';
import Avaliacao from '../models/Avaliacao.js';

const includePedido = [
  { model: Entrega, as: 'entrega' },
  { model: Avaliacao, as: 'avaliacoes' },
];

const PedidoController = {
  create: async (req, res) => {
    try {
      const pedido = await Pedido.create(req.body);
      const pedidoCriado = await Pedido.findByPk(pedido.id, {
        include: includePedido,
      });

      res.status(201).json(pedidoCriado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const pedidos = await Pedido.findAll({
        include: includePedido,
      });

      res.status(200).json(pedidos);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const pedido = await Pedido.findByPk(req.params.id, {
        include: includePedido,
      });

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      res.status(200).json(pedido);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const pedido = await Pedido.findByPk(req.params.id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      await pedido.update(req.body);

      const pedidoAtualizado = await Pedido.findByPk(req.params.id, {
        include: includePedido,
      });

      res.status(200).json(pedidoAtualizado);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const pedido = await Pedido.findByPk(req.params.id);

      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      await pedido.destroy();
      res.status(200).json({ message: 'Pedido excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default PedidoController;
