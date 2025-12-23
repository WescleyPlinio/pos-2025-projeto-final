import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { livrosApi, autoresApi, editorasApi } from '../../api/endpoints';

const LivroList = () => {
  const [livros, setLivros] = useState([]);
  const [autores, setAutores] = useState({}); // {id: nome}
  const [editoras, setEditoras] = useState({}); // {id: nome}
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deleteError, setDeleteError] = useState(null);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Busca tudo em paralelo
      const [livrosRes, autoresRes, editorasRes] = await Promise.all([
        livrosApi.getAll(),
        autoresApi.getAll(),
        editorasApi.getAll()
      ]);

      // Cria mapas de ID -> Nome
      const autoresMap = {};
      autoresRes.data.forEach(autor => {
        autoresMap[autor.id] = autor.nome;
      });

      const editorasMap = {};
      editorasRes.data.forEach(editora => {
        editorasMap[editora.id] = editora.nome;
      });

      setAutores(autoresMap);
      setEditoras(editorasMap);
      setLivros(livrosRes.data);
      setLoading(false);
    } catch (err) {
      setError(err.message);
      setLoading(false);
    }
  };

  // Função para obter o nome do autor
  const getAutorNome = (autorId) => {
    return autores[autorId] || `Autor ${autorId}`;
  };

  // Função para obter o nome da editora
  const getEditoraNome = (editoraId) => {
    return editoras[editoraId] || `Editora ${editoraId}`;
  };

  // Função para excluir livro
  const handleDelete = async (id) => {
    // Confirmação antes de excluir
    const confirmDelete = window.confirm(
      `Tem certeza que deseja excluir este livro?`
    );
    
    if (!confirmDelete) return;
    
    try {
      setDeleteError(null);
      await livrosApi.delete(id);
      
      // Atualiza a lista removendo o livro excluído
      setLivros(livros.filter(livro => livro.id !== id));
      
      // Opcional: Mostrar mensagem de sucesso
      alert('Livro excluído com sucesso!');
      
    } catch (err) {
      console.error('Erro ao excluir livro:', err);
      setDeleteError(`Erro ao excluir livro: ${err.message}`);
      
      // Mensagens de erro mais específicas
      if (err.response?.status === 404) {
        alert('Livro não encontrado. Talvez já tenha sido excluído.');
      } else if (err.response?.status === 403) {
        alert('Você não tem permissão para excluir este livro.');
      } else if (err.response?.status === 500) {
        alert('Erro no servidor. Tente novamente mais tarde.');
      } else {
        alert('Erro ao excluir livro. Verifique sua conexão.');
      }
      
      // Recarrega os dados em caso de erro
      fetchData();
    }
  };

  if (loading) return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p>Carregando livros...</p>
    </div>
  );
  
  if (error) return (
    <div className="error-container">
      <h3>Erro ao carregar livros</h3>
      <p>{error}</p>
      <button onClick={fetchData} className="btn btn-primary">
        Tentar novamente
      </button>
    </div>
  );

  return (
    <div>
      <h2>Lista de Livros</h2>
      
      {deleteError && (
        <div className="alert alert-danger">
          {deleteError}
          <button 
            onClick={() => setDeleteError(null)}
            className="close-btn"
          >
            ×
          </button>
        </div>
      )}
      
      <div className="mb-3">
        <Link to="/livros/novo" className="btn btn-primary">
          + Novo Livro
        </Link>
        <span className="ms-3 text-muted">
          Total: {livros.length} livro{livros.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {livros.length === 0 ? (
        <div className="empty-state">
          <p>Nenhum livro cadastrado ainda.</p>
          <Link to="/livros/novo" className="btn btn-primary">
            Adicionar primeiro livro
          </Link>
        </div>
      ) : (
        <table className="table table-striped table-hover">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Título</th>
              <th>Autor</th>
              <th>Editora</th>
              <th>Ano</th>
              <th>Status</th>
              <th>Páginas</th>
              <th className="text-center">Ações</th>
            </tr>
          </thead>
          <tbody>
            {livros.map((livro) => (
              <tr key={livro.id}>
                <td>{livro.id}</td>
                <td>
                  <strong>{livro.titulo}</strong>
                </td>
                <td>{getAutorNome(livro.autor)}</td>
                <td>{getEditoraNome(livro.editora)}</td>
                <td>{new Date(livro.ano_lancamento).getFullYear()}</td>
                <td>
                  <span className={`status-badge status-${livro.status.toLowerCase()}`}>
                    {livro.status}
                  </span>
                </td>
                <td>{livro.paginas}</td>
                <td className="text-center">
                  <div className="btn-group" role="group">
                    <Link 
                      to={`/livros/${livro.id}`} 
                      className="btn btn-info btn-sm"
                      title="Ver detalhes"
                    >
                      Ver
                    </Link>
                    <Link 
                      to={`/livros/${livro.id}/editar`} 
                      className="btn btn-warning btn-sm"
                      title="Editar"
                    >
                      Editar
                    </Link>
                    <button
                      onClick={() => handleDelete(livro.id)}
                      className="btn btn-danger btn-sm"
                      title="Excluir"
                    >
                      Excluir
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default LivroList;