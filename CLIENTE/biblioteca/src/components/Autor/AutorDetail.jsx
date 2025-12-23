import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { autoresApi } from '../../api/endpoints';

const AutorDetail = () => {
  const { id } = useParams();
  const [autor, setAutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAutor();
  }, [id]);

  const fetchAutor = async () => {
    try {
      const response = await autoresApi.getById(id);
      setAutor(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!autor) return <div>Autor não encontrado</div>;

  return (
    <div>
      <h2>Detalhes do Autor</h2>
      <div className="card">
        <div className="card-body">
          <h3>{autor.nome}</h3>
          <p><strong>ID:</strong> {autor.id}</p>
        </div>
      </div>
      <div className="mt-3">
        <Link to={`/autores/${id}/editar`} className="btn btn-warning">
          Editar
        </Link>
        <Link to="/autores" className="btn btn-secondary ml-2">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default AutorDetail;