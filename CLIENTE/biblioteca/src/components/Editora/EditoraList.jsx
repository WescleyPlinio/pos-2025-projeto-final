import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { editorasApi } from '../../api/endpoints';

const EditoraList = () => {
  const [editoras, setEditoras] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchEditoras();
  }, []);

  const fetchEditoras = async () => {
    try {
      const response = await editorasApi.getAll();
      setEditoras(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir esta editora?')) {
      try {
        await editorasApi.delete(id);
        setEditoras(editoras.filter(editora => editora.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Lista de Editoras</h2>
      <Link to="/editoras/novo" className="btn btn-primary">
        Nova Editora
      </Link>
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {editoras.map((editora) => (
            <tr key={editora.id}>
              <td>{editora.id}</td>
              <td>{editora.nome}</td>
              <td>
                <Link to={`/editoras/${editora.id}`} className="btn btn-info btn-sm">
                  Ver
                </Link>
                <Link to={`/editoras/${editora.id}/editar`} className="btn btn-warning btn-sm">
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(editora.id)}
                  className="btn btn-danger btn-sm"
                >
                  Excluir
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EditoraList;