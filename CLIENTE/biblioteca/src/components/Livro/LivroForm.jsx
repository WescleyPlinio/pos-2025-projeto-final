import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { livrosApi, autoresApi, editorasApi } from '../../api/endpoints';

const LivroForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [autores, setAutores] = useState([]);
  const [editoras, setEditoras] = useState([]);
  const [formData, setFormData] = useState({
    titulo: '',
    autor: '',
    editora: '',
    ano_lancamento: '',
    status: 'Novo',
    paginas: ''
  });

  const statusOptions = ['Novo', 'Seminovo', 'Velho'];

  useEffect(() => {
    fetchAutores();
    fetchEditoras();
    if (id) {
      fetchLivro();
    }
  }, [id]);

  const fetchLivro = async () => {
    try {
      const response = await livrosApi.getById(id);
      const livro = response.data;
      setFormData({
        titulo: livro.titulo,
        autor: livro.autor,
        editora: livro.editora,
        ano_lancamento: livro.ano_lancamento.split('T')[0],
        status: livro.status,
        paginas: livro.paginas
      });
    } catch (err) {
      console.error('Erro ao buscar livro:', err);
    }
  };

  const fetchAutores = async () => {
    try {
      const response = await autoresApi.getAll();
      setAutores(response.data);
    } catch (err) {
      console.error('Erro ao buscar autores:', err);
    }
  };

  const fetchEditoras = async () => {
    try {
      const response = await editorasApi.getAll();
      setEditoras(response.data);
    } catch (err) {
      console.error('Erro ao buscar editoras:', err);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSend = {
        ...formData,
        autor: parseInt(formData.autor),
        editora: parseInt(formData.editora),
        paginas: parseInt(formData.paginas)
      };

      if (id) {
        await livrosApi.update(id, dataToSend);
      } else {
        await livrosApi.create(dataToSend);
      }
      
      navigate('/livros');
    } catch (err) {
      console.error('Erro ao salvar livro:', err);
      alert('Erro ao salvar livro. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Livro' : 'Novo Livro'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Título:</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
            maxLength={50}
          />
        </div>

        <div className="form-group">
          <label>Autor:</label>
          <select
            name="autor"
            value={formData.autor}
            onChange={handleChange}
            required
          >
            <option value="">Selecione um autor</option>
            {autores.map(autor => (
              <option key={autor.id} value={autor.id}>
                {autor.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Editora:</label>
          <select
            name="editora"
            value={formData.editora}
            onChange={handleChange}
            required
          >
            <option value="">Selecione uma editora</option>
            {editoras.map(editora => (
              <option key={editora.id} value={editora.id}>
                {editora.nome}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Ano de Lançamento:</label>
          <input
            type="date"
            name="ano_lancamento"
            value={formData.ano_lancamento}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Status:</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            required
          >
            {statusOptions.map(option => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Páginas:</label>
          <input
            type="number"
            name="paginas"
            value={formData.paginas}
            onChange={handleChange}
            required
            min="1"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
        </button>
        <button 
          type="button" 
          onClick={() => navigate('/livros')}
          className="btn btn-secondary"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default LivroForm;