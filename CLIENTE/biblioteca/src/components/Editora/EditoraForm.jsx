import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { editorasApi } from '../../api/endpoints';

const EditoraForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nome: ''
  });

  useEffect(() => {
    if (id) {
      fetchEditora();
    }
  }, [id]);

  const fetchEditora = async () => {
    try {
      const response = await editorasApi.getById(id);
      setFormData({
        nome: response.data.nome
      });
    } catch (err) {
      console.error('Erro ao buscar editora:', err);
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
        await editorasApi.update(id, formData);
      } else {
        await editorasApi.create(formData);
      }
      
      navigate('/editoras');
    } catch (err) {
      console.error('Erro ao salvar editora:', err);
      alert('Erro ao salvar editora. Verifique os dados.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>{id ? 'Editar Editora' : 'Nova Editora'}</h2>
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
            placeholder="Digite o nome da editora"
          />
        </div>

        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading ? 'Salvando...' : id ? 'Atualizar' : 'Criar'}
        </button>
        <button 
          type="button" 
          onClick={() => navigate('/editoras')}
          className="btn btn-secondary ml-2"
        >
          Cancelar
        </button>
      </form>
    </div>
  );
};

export default EditoraForm;