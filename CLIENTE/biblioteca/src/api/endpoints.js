import api from './api';

export const livrosApi = {
  getAll: () => api.get('/livros/'),
  getById: (id) => api.get(`/livros/${id}/`),
  create: (data) => api.post('/livros/', data),
  update: (id, data) => api.put(`/livros/${id}/`, data),
  patch: (id, data) => api.patch(`/livros/${id}/`, data),
  delete: (id) => api.delete(`/livros/${id}/`),
};

export const autoresApi = {
  getAll: () => api.get('/autores/'),
  getById: (id) => api.get(`/autores/${id}/`),
  create: (data) => api.post('/autores/', data),
  update: (id, data) => api.put(`/autores/${id}/`, data),
  patch: (id, data) => api.patch(`/autores/${id}/`, data),
  delete: (id) => api.delete(`/autores/${id}/`),
};

export const editorasApi = {
  getAll: () => api.get('/editoras/'),
  getById: (id) => api.get(`/editoras/${id}/`),
  create: (data) => api.post('/editoras/', data),
  update: (id, data) => api.put(`/editoras/${id}/`, data),
  patch: (id, data) => api.patch(`/editoras/${id}/`, data),
  delete: (id) => api.delete(`/editoras/${id}/`),
};