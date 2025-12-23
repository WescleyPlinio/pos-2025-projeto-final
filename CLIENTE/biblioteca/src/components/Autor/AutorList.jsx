import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { autoresApi } from '../../api/endpoints';

const AutorList = () => {
  const [autores, setAutores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAutores();
  }, []);

  const fetchAutores = async () => {
    try {
      const response = await autoresApi.getAll();
      setAutores(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este autor?')) {
      try {
        await autoresApi.delete(id);
        setAutores(autores.filter(autor => autor.id !== id));
      } catch (err) {
        setError(err.message);
      }
    }
  };

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  return (
    <div>
      <h2>Lista de Autores</h2>
      <Link to="/autores/novo" className="btn btn-primary">
        Novo Autor
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
          {autores.map((autor) => (
            <tr key={autor.id}>
              <td>{autor.id}</td>
              <td>{autor.nome}</td>
              <td>
                <Link to={`/autores/${autor.id}`} className="btn btn-info btn-sm">
                  Ver
                </Link>
                <Link to={`/autores/${autor.id}/editar`} className="btn btn-warning btn-sm">
                  Editar
                </Link>
                <button 
                  onClick={() => handleDelete(autor.id)}
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

export default AutorList;