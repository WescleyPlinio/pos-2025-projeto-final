import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { livrosApi } from '../../api/endpoints';

const LivroDetail = () => {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchLivro();
  }, [id]);

  const fetchLivro = async () => {
    try {
      const response = await livrosApi.getById(id);
      setLivro(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!livro) return <div>Livro não encontrado</div>;

  return (
    <div>
      <h2>Detalhes do Livro</h2>
      <div className="card">
        <div className="card-body">
          <h3>{livro.titulo}</h3>
          <p><strong>Autor:</strong> {livro.autor_nome}</p>
          <p><strong>Editora:</strong> {livro.editora_nome}</p>
          <p><strong>Ano de Lançamento:</strong> {new Date(livro.ano_lancamento).getFullYear()}</p>
          <p><strong>Status:</strong> {livro.status}</p>
          <p><strong>Páginas:</strong> {livro.paginas}</p>
        </div>
      </div>
      <div className="mt-3">
        <Link to={`/livros/${id}/editar`} className="btn btn-warning">
          Editar
        </Link>
        <Link to="/livros" className="btn btn-secondary ml-2">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default LivroDetail;