import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Import dos componentes
import LivroList from './components/Livro/LivroList';
import LivroForm from './components/Livro/LivroForm';
import LivroDetail from './components/Livro/LivroDetail';
import AutorList from './components/autor/AutorList';
import AutorForm from './components/Autor/AutorForm';
import AutorDetail from './components/Autor/AutorDetail';
import EditoraList from './components/Editora/EditoraList';
import EditoraForm from './components/Editora/EditoraForm';
import EditoraDetail from './components/Editora/EditoraDetail';

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar">
          <h1>Biblioteca Manager</h1>
          <ul className="nav-links">
            <li><Link to="/livros">Livros</Link></li>
            <li><Link to="/autores">Autores</Link></li>
            <li><Link to="/editoras">Editoras</Link></li>
            <li><Link to="/livros/novo">Novo Livro</Link></li>
            <li><Link to="/autores/novo">Novo Autor</Link></li>
            <li><Link to="/editoras/novo">Nova Editora</Link></li>
          </ul>
        </nav>

        <div className="container">
          <Routes>
            {/* Rotas para Livros */}
            <Route path="/livros" element={<LivroList />} />
            <Route path="/livros/novo" element={<LivroForm />} />
            <Route path="/livros/:id/editar" element={<LivroForm />} />
            <Route path="/livros/:id" element={<LivroDetail />} />
            
            {/* Rotas para Autores */}
            <Route path="/autores" element={<AutorList />} />
            <Route path="/autores/novo" element={<AutorForm />} />
            <Route path="/autores/:id/editar" element={<AutorForm />} />
            <Route path="/autores/:id" element={<AutorDetail />} />
            
            {/* Rotas para Editoras */}
            <Route path="/editoras" element={<EditoraList />} />
            <Route path="/editoras/novo" element={<EditoraForm />} />
            <Route path="/editoras/:id/editar" element={<EditoraForm />} />
            <Route path="/editoras/:id" element={<EditoraDetail />} />
            
            {/* Rota padrão */}
            <Route path="/" element={<LivroList />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;