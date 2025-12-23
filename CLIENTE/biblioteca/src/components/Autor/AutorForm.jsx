import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { autoresApi } from '../../api/endpoints';

const AutorForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: ''
  });

  useEffect(() => {
    if (id) {
      fetchAutor();
    }
  }, [id]);

  const fetchAutor = async () => {
    try {
      const response = await autoresApi.getById(id);
      setFormData({
        nome: response.data.nome
      });
    } catch (err) {
      console.error('Erro ao buscar autor:', err);
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
      if (id) {
        await autoresApi.update(id, formData);
      } else {
        await autoresApi.create(formData);
      }
      
      navigate('/autores');
    } catch (err) {
      console.error('Erro ao salvar autor:', err);
      alert('Erro ao salvar autor. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Autor' : 'Novo Autor'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Nome:</label>
          <input
            type="text"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
            maxLength={50}
            placeholder="Digite o nome do autor"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
        </button>
        <button 
          type="button" 
          onClick={() => navigate('/autores')}
          className="btn btn-secondary ml-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default AutorForm;