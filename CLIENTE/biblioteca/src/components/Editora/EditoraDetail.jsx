import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { editorasApi } from '../../api/endpoints';

const EditoraDetail = () => {
  const { id } = useParams();
  const [editora, setEditora] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEditora();
  }, [id]);

  const fetchEditora = async () => {
    try {
      const response = await editorasApi.getById(id);
      setEditora(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;
  if (!editora) return <div>Editora não encontrada</div>;

  return (
    <div>
      <h2>Detalhes da Editora</h2>
      <div className="card">
        <div className="card-body">
          <h3>{editora.nome}</h3>
          <p><strong>ID:</strong> {editora.id}</p>
        </div>
      </div>
      <div className="mt-3">
        <Link to={`/editoras/${id}/editar`} className="btn btn-warning">
          Editar
        </Link>
        <Link to="/editoras" className="btn btn-secondary ml-2">
          Voltar
        </Link>
      </div>
    </div>
  );
};

export default EditoraDetail;