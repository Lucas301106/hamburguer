# Atividade Prática - API da Hamburgueria

## O que foi implementado

- Criação da funcionalidade de avaliação de pedidos
- Model `Avaliacao`
- Controller `AvaliacaoController`
- Rotas para:
  - Pedido
  - Entrega
  - Produto
  - Avaliação
- Migration para a tabela `avaliacoes`
- Relacionamento entre `Avaliacao` e `Pedido` com foreign key
- Eager loading no controller de `Pedido` incluindo:
  - entrega
  - avaliações
- Eager loading no controller de `Categoria` incluindo:
  - produtos

## Observações

- Banco utilizado: MySQL
- Projeto testado localmente com servidor rodando em `http://localhost:3000`