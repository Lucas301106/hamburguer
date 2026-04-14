import Categoria from '../models/Categoria.js';
import Produto from '../models/Produto.js';

const includeCategoria = [{ model: Produto, as: 'produtos' }];

const CategoriaController = {
  create: async (req, res) => {
    try {
      const categoria = await Categoria.create(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findAll: async (req, res) => {
    try {
      const categorias = await Categoria.findAll({
        include: includeCategoria,
      });

      res.status(200).json(categorias);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  findById: async (req, res) => {
    try {
      const categoria = await Categoria.findByPk(req.params.id, {
        include: includeCategoria,
      });

      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      res.status(200).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  update: async (req, res) => {
    try {
      const categoria = await Categoria.findByPk(req.params.id);

      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      await categoria.update(req.body);
      res.status(200).json(categoria);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  delete: async (req, res) => {
    try {
      const categoria = await Categoria.findByPk(req.params.id);

      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      await categoria.destroy();
      res.status(200).json({ message: 'Categoria excluída com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },

  restaure: async (req, res) => {
    try {
      const categoria = await Categoria.findByPk(req.params.id, {
        paranoid: false,
      });

      if (!categoria) {
        return res.status(404).json({ error: 'Categoria não encontrada' });
      }

      await categoria.restore();
      res.status(200).json({ message: 'Categoria restaurada com sucesso' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
};

export default CategoriaController;