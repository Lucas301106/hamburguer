import Avaliacao from '../models/Avaliacao.js';
import Pedido from '../models/Pedido.js';

const AvaliacaoController = {
  create: async (req, res) => {
    try {
      const { pedido_id, nota } = req.body;

      const pedido = await Pedido.findByPk(pedido_id);
      if (!pedido) {
        return res.status(404).json({ error: 'Pedido não encontrado' });
      }

      const avaliacao = await Avaliacao.create({ pedido_id, nota });
      res.status(201).json(avaliacao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const avaliacoes = await Avaliacao.findAll();
      res.status(200).json(avaliacoes);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const avaliacao = await Avaliacao.findByPk(req.params.id);

      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }

      res.status(200).json(avaliacao);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const avaliacao = await Avaliacao.findByPk(req.params.id);

      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }

      if (req.body.pedido_id) {
        const pedido = await Pedido.findByPk(req.body.pedido_id);
        if (!pedido) {
          return res.status(404).json({ error: 'Pedido não encontrado' });
        }
      }

      await avaliacao.update(req.body);
      res.status(200).json(avaliacao);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const avaliacao = await Avaliacao.findByPk(req.params.id);

      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }

      await avaliacao.destroy();
      res.status(200).json({ message: 'Avaliação excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default AvaliacaoController;