import React, { useState, useEffect } from 'react';
import { Calendar, CheckSquare, List, LogOut, Plus, Edit2, Trash2, X, Search, Filter, Clock, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

const API_BASE_URL = 'https://render.com/docs/web-services#port-binding';

// API Service
const api = {
  auth: {
    register: (data) => fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    }),
    login: (data) => fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    })
  },
  todos: {
    get: (token, page = 1, limit = 10) => fetch(`${API_BASE_URL}/todo?page=${page}&limit=${limit}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    }),
    create: (token, data) => fetch(`${API_BASE_URL}/todo`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }),
    update: (token, id, data) => fetch(`${API_BASE_URL}/todo/${id}`, {
      method: 'PUT',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }),
    delete: (token, id) => fetch(`${API_BASE_URL}/todo/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  },
  tasks: {
    get: (token, params = {}) => {
      const query = new URLSearchParams(params).toString();
      return fetch(`${API_BASE_URL}/task?${query}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
    },
    create: (token, data) => fetch(`${API_BASE_URL}/task`, {
      method: 'POST',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }),
    update: (token, id, data) => fetch(`${API_BASE_URL}/task/${id}`, {
      method: 'PATCH',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }),
    delete: (token, id) => fetch(`${API_BASE_URL}/task/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
  },
  calendar: {
    get: (token, from, to) => fetch(`${API_BASE_URL}/calender?from=${from}&to=${to}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
  }
};

// Auth Component with Modern Design
const AuthForm = ({ onLogin }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const endpoint = isLogin ? api.auth.login : api.auth.register;
      const data = isLogin ? 
        { email: formData.email, password: formData.password } :
        formData;

      const response = await endpoint(data);
      const result = await response.json();

      if (!response.ok) {
        setError(result.message || result.msg || 'Authentication failed');
        setLoading(false);
        return;
      }

      localStorage.setItem('token', result.token);
      onLogin(result.token);
    } catch (err) {
      setError('Network error. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Animated Background Circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -left-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-40 -right-40 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute -bottom-40 left-1/2 w-80 h-80 bg-white opacity-10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="bg-white bg-opacity-20 backdrop-blur-xl rounded-3xl shadow-2xl p-8 w-full max-w-md relative z-10 border border-white border-opacity-30">
        <div className="text-center mb-8">
          <div className="inline-block p-4 bg-white bg-opacity-20 rounded-2xl mb-4">
            <CheckSquare className="w-12 h-12 text-white" />
          </div>
          <h2 className="text-4xl font-bold text-white mb-2">
            {isLogin ? 'Welcome Back' : 'Get Started'}
          </h2>
          <p className="text-white text-opacity-80">
            {isLogin ? 'Sign in to your account' : 'Create your account'}
          </p>
        </div>
        
        {error && (
          <div className="bg-red-500 bg-opacity-20 backdrop-blur-sm text-white p-4 rounded-xl mb-6 text-sm border border-red-300 border-opacity-30 animate-shake">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div className="transform transition-all duration-300">
              <label className="block text-sm font-medium text-white mb-2">Full Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white placeholder-opacity-60 transition-all duration-300"
                placeholder="John Doe"
                required={!isLogin}
                minLength={3}
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-white mb-2">Email Address</label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white placeholder-opacity-60 transition-all duration-300"
              placeholder="you@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-white mb-2">Password</label>
            <input
              type="password"
              value={formData.password}
              onChange={(e) => setFormData({...formData, password: e.target.value})}
              className="w-full px-4 py-3 bg-white bg-opacity-20 backdrop-blur-sm border border-white border-opacity-30 rounded-xl focus:ring-2 focus:ring-white focus:border-transparent text-white placeholder-white placeholder-opacity-60 transition-all duration-300"
              placeholder="••••••••"
              required
              minLength={isLogin ? 1 : 8}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-white text-purple-600 py-3 rounded-xl font-semibold hover:bg-opacity-90 transition-all duration-300 disabled:bg-opacity-50 transform hover:scale-105 active:scale-95 shadow-lg"
          >
            {loading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing...
              </span>
            ) : (isLogin ? 'Sign In' : 'Create Account')}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-white text-opacity-80 text-sm">
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <button
              onClick={() => {
                setIsLogin(!isLogin);
                setError('');
              }}
              className="text-white font-semibold hover:underline ml-1 transition-all duration-300"
            >
              {isLogin ? 'Sign Up' : 'Sign In'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

// Modern Todo Component
const TodoList = ({ token }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingTodo, setEditingTodo] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });

  const fetchTodos = async () => {
    setLoading(true);
    try {
      const response = await api.todos.get(token, page, 10);
      const data = await response.json();
      setTodos(data.data);
      setTotal(data.total);
    } catch (err) {
      console.error('Failed to fetch todos:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, [page]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTodo) {
        await api.todos.update(token, editingTodo.id, formData);
      } else {
        await api.todos.create(token, formData);
      }
      setShowModal(false);
      setFormData({ title: '', description: '' });
      setEditingTodo(null);
      fetchTodos();
    } catch (err) {
      console.error('Failed to save todo:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this todo?')) return;
    try {
      await api.todos.delete(token, id);
      fetchTodos();
    } catch (err) {
      console.error('Failed to delete todo:', err);
    }
  };

  const openEditModal = (todo) => {
    setEditingTodo(todo);
    setFormData({ title: todo.title, description: todo.description });
    setShowModal(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">My Todos</h2>
          <p className="text-gray-500">Organize your daily tasks</p>
        </div>
        <button
          onClick={() => {
            setEditingTodo(null);
            setFormData({ title: '', description: '' });
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium"
        >
          <Plus size={20} /> New Todo
        </button>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      ) : todos.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <div className="inline-block p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-full mb-4">
            <List size={48} className="text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No todos yet</h3>
          <p className="text-gray-500">Create your first todo to get started!</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {todos.map((todo, idx) => (
              <div 
                key={todo.id} 
                className="bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100"
                style={{animationDelay: `${idx * 50}ms`}}
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-2">{todo.title}</h3>
                    {todo.description && (
                      <p className="text-gray-600 text-sm leading-relaxed">{todo.description}</p>
                    )}
                  </div>
                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => openEditModal(todo)}
                      className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                    >
                      <Edit2 size={18} />
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center items-center gap-2 pt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
            >
              Previous
            </button>
            <span className="px-6 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg font-medium">
              {page} of {Math.ceil(total / 10)}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / 10)}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
            >
              Next
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg transform transition-all duration-300 animate-slideUp shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{editingTodo ? 'Edit Todo' : 'Create New Todo'}</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter todo title..."
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="Add more details..."
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {editingTodo ? 'Update Todo' : 'Create Todo'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Modern Task Component
const TaskList = ({ token }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [filters, setFilters] = useState({ status: '', priority: '', search: '' });
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    start_date: '',
    end_date: '',
    priority: 'medium'
  });

  const fetchTasks = async () => {
    setLoading(true);
    try {
      const params = { page, limit: 10, ...filters };
      Object.keys(params).forEach(key => !params[key] && delete params[key]);
      
      const response = await api.tasks.get(token, params);
      const data = await response.json();
      setTasks(data.data);
      setTotal(data.total);
    } catch (err) {
      console.error('Failed to fetch tasks:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchTasks();
  }, [page, filters]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingTask) {
        await api.tasks.update(token, editingTask.id, formData);
      } else {
        await api.tasks.create(token, formData);
      }
      setShowModal(false);
      setFormData({ title: '', description: '', start_date: '', end_date: '', priority: 'medium' });
      setEditingTask(null);
      fetchTasks();
    } catch (err) {
      console.error('Failed to save task:', err);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this task?')) return;
    try {
      await api.tasks.delete(token, id);
      fetchTasks();
    } catch (err) {
      console.error('Failed to delete task:', err);
    }
  };

  const toggleStatus = async (task) => {
    try {
      const newStatus = task.status === 'pending' ? 'done' : 'pending';
      await api.tasks.update(token, task.id, { status: newStatus });
      fetchTasks();
    } catch (err) {
      console.error('Failed to update status:', err);
    }
  };

  const openEditModal = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || '',
      start_date: task.start_date?.split('T')[0] || '',
      end_date: task.end_date?.split('T')[0] || '',
      priority: task.priority
    });
    setShowModal(true);
  };

  const priorityConfig = {
    low: { bg: 'bg-green-100', text: 'text-green-700', border: 'border-green-200', dot: 'bg-green-500' },
    medium: { bg: 'bg-yellow-100', text: 'text-yellow-700', border: 'border-yellow-200', dot: 'bg-yellow-500' },
    high: { bg: 'bg-red-100', text: 'text-red-700', border: 'border-red-200', dot: 'bg-red-500' }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">My Tasks</h2>
          <p className="text-gray-500">Manage your projects and deadlines</p>
        </div>
        <button
          onClick={() => {
            setEditingTask(null);
            setFormData({ title: '', description: '', start_date: '', end_date: '', priority: 'medium' });
            setShowModal(true);
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-6 py-3 rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center gap-2 font-medium"
        >
          <Plus size={20} /> New Task
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="md:col-span-2 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search tasks..."
              value={filters.search}
              onChange={(e) => setFilters({...filters, search: e.target.value})}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <select
            value={filters.status}
            onChange={(e) => setFilters({...filters, status: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Status</option>
            <option value="pending">⏳ Pending</option>
            <option value="done">✓ Completed</option>
          </select>
          <select
            value={filters.priority}
            onChange={(e) => setFilters({...filters, priority: e.target.value})}
            className="px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
          >
            <option value="">All Priority</option>
            <option value="low">🟢 Low</option>
            <option value="medium">🟡 Medium</option>
            <option value="high">🔴 High</option>
          </select>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-20 bg-white rounded-2xl shadow-sm">
          <div className="inline-block p-6 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full mb-4">
            <CheckSquare size={48} className="text-blue-500" />
          </div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No tasks found</h3>
          <p className="text-gray-500">Create a new task or adjust your filters</p>
        </div>
      ) : (
        <>
          <div className="grid gap-4">
            {tasks.map((task, idx) => {
              const config = priorityConfig[task.priority];
              return (
                <div 
                  key={task.id} 
                  className={`bg-white p-6 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border ${task.status === 'done' ? 'border-gray-200 bg-gray-50' : 'border-gray-100'}`}
                  style={{animationDelay: `${idx * 50}ms`}}
                >
                  <div className="flex items-start gap-4">
                    <input
                      type="checkbox"
                      checked={task.status === 'done'}
                      onChange={() => toggleStatus(task)}
                      className="mt-1 w-6 h-6 cursor-pointer rounded-lg border-2 border-gray-300 text-blue-600 focus:ring-2 focus:ring-blue-500 transition-all duration-200"
                    />
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className={`text-lg font-semibold mb-2 transition-all duration-200 ${task.status === 'done' ? 'line-through text-gray-500' : 'text-gray-800'}`}>
                            {task.title}
                          </h3>
                          {task.description && (
                            <p className={`text-sm leading-relaxed ${task.status === 'done' ? 'text-gray-400' : 'text-gray-600'}`}>
                              {task.description}
                            </p>
                          )}
                        </div>
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => openEditModal(task)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
                          >
                            <Edit2 size={18} />
                          </button>
                          <button
                            onClick={() => handleDelete(task.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-all duration-200"
                          >
                            <Trash2 size={18} />
                          </button>
                        </div>
                      </div>
                      <div className="flex gap-2 flex-wrap items-center">
                        <span className={`inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium border ${config.bg} ${config.text} ${config.border}`}>
                          <span className={`w-2 h-2 rounded-full ${config.dot}`}></span>
                          {task.priority.charAt(0).toUpperCase() + task.priority.slice(1)} Priority
                        </span>
                        {task.start_date && (
                          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium bg-blue-50 text-blue-700 border border-blue-200">
                            <Clock size={12} />
                            {new Date(task.start_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                        {task.end_date && (
                          <span className="inline-flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full font-medium bg-purple-50 text-purple-700 border border-purple-200">
                            <AlertCircle size={12} />
                            Due {new Date(task.end_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="flex justify-center items-center gap-2 pt-4">
            <button
              onClick={() => setPage(p => Math.max(1, p - 1))}
              disabled={page === 1}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
            >
              Previous
            </button>
            <span className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-lg font-medium">
              {page} of {Math.ceil(total / 10)}
            </span>
            <button
              onClick={() => setPage(p => p + 1)}
              disabled={page >= Math.ceil(total / 10)}
              className="px-4 py-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-all duration-200"
            >
              Next
            </button>
          </div>
        </>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn overflow-y-auto">
          <div className="bg-white rounded-3xl p-8 w-full max-w-lg my-8 transform transition-all duration-300 animate-slideUp shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-2xl font-bold text-gray-800">{editingTask ? 'Edit Task' : 'Create New Task'}</h3>
              <button 
                onClick={() => setShowModal(false)} 
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Task Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  placeholder="Enter task title..."
                  required
                  minLength={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({...formData, description: e.target.value})}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  rows={4}
                  placeholder="Add task details..."
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                  <input
                    type="date"
                    value={formData.start_date}
                    onChange={(e) => setFormData({...formData, start_date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Due Date</label>
                  <input
                    type="date"
                    value={formData.end_date}
                    onChange={(e) => setFormData({...formData, end_date: e.target.value})}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    min={formData.start_date}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority Level</label>
                <div className="grid grid-cols-3 gap-3">
                  {['low', 'medium', 'high'].map(priority => (
                    <button
                      key={priority}
                      type="button"
                      onClick={() => setFormData({...formData, priority})}
                      className={`px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                        formData.priority === priority
                          ? priority === 'low' ? 'bg-green-500 text-white' :
                            priority === 'medium' ? 'bg-yellow-500 text-white' :
                            'bg-red-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {priority.charAt(0).toUpperCase() + priority.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
              <div className="flex gap-3 pt-2">
                <button 
                  type="submit" 
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-500 text-white py-3 rounded-xl font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-300"
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-100 text-gray-700 py-3 rounded-xl font-semibold hover:bg-gray-200 transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

// Google Calendar-Style Calendar Component
const CalendarView = ({ token }) => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedEvent, setSelectedEvent] = useState(null);

  const fetchEvents = async () => {
    setLoading(true);
    try {
      const firstDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), 1);
      const lastDay = new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 0);
      
      const from = firstDay.toISOString().split('T')[0];
      const to = lastDay.toISOString().split('T')[0];
      
      const response = await api.calendar.get(token, from, to);
      const data = await response.json();
      setEvents(data.events || []);
    } catch (err) {
      console.error('Failed to fetch calendar:', err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchEvents();
  }, [currentMonth]);

  const getDaysInMonth = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }
    return days;
  };

  const getEventsForDay = (day) => {
    if (!day) return [];
    const dateStr = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
      .toISOString().split('T')[0];
    return events.filter(event => {
      const eventStart = event.start.split('T')[0];
      const eventEnd = event.end.split('T')[0];
      return dateStr >= eventStart && dateStr <= eventEnd;
    });
  };

  const isToday = (day) => {
    if (!day) return false;
    const today = new Date();
    return day === today.getDate() && 
           currentMonth.getMonth() === today.getMonth() && 
           currentMonth.getFullYear() === today.getFullYear();
  };

  const days = getDaysInMonth();
  const monthName = currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' });

  const priorityColors = {
    low: 'bg-green-500',
    medium: 'bg-yellow-500',
    high: 'bg-red-500'
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-3xl font-bold text-gray-800">{monthName}</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1))}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={() => setCurrentMonth(new Date())}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-500 text-white font-medium hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Today
            </button>
            <button
              onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1))}
              className="p-3 rounded-xl bg-gray-100 hover:bg-gray-200 transition-all duration-200"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
          </div>
        ) : (
          <div className="bg-white rounded-xl overflow-hidden border border-gray-200">
            <div className="grid grid-cols-7 bg-gray-50 border-b border-gray-200">
              {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                <div key={day} className="p-3 text-center font-semibold text-sm text-gray-600 border-r border-gray-200 last:border-r-0">
                  <div className="hidden md:block">{day}</div>
                  <div className="md:hidden">{day.slice(0, 3)}</div>
                </div>
              ))}
            </div>
            <div className="grid grid-cols-7">
              {days.map((day, idx) => {
                const dayEvents = getEventsForDay(day);
                const isTodayDate = isToday(day);
                return (
                  <div
                    key={idx}
                    className={`min-h-[120px] p-3 border-r border-b border-gray-200 last:border-r-0 transition-all duration-200 ${
                      !day ? 'bg-gray-50' : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    {day && (
                      <>
                        <div className={`text-sm font-semibold mb-2 inline-flex items-center justify-center w-8 h-8 rounded-full ${
                          isTodayDate 
                            ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white' 
                            : 'text-gray-700'
                        }`}>
                          {day}
                        </div>
                        <div className="space-y-1">
                          {dayEvents.slice(0, 3).map(event => (
                            <button
                              key={event.id}
                              onClick={() => setSelectedEvent(event)}
                              className={`w-full text-left text-xs px-2 py-1.5 rounded-lg truncate font-medium transition-all duration-200 hover:shadow-md transform hover:scale-105 ${
                                priorityColors[event.priority]
                              } text-white`}
                              title={event.title}
                            >
                              {event.title}
                            </button>
                          ))}
                          {dayEvents.length > 3 && (
                            <div className="text-xs text-gray-500 font-medium pl-2">
                              +{dayEvents.length - 3} more
                            </div>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Event Details Modal */}
      {selectedEvent && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeIn" onClick={() => setSelectedEvent(null)}>
          <div className="bg-white rounded-3xl p-8 w-full max-w-md transform transition-all duration-300 animate-slideUp shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">{selectedEvent.title}</h3>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                  selectedEvent.priority === 'high' ? 'bg-red-100 text-red-700' :
                  selectedEvent.priority === 'medium' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-green-100 text-green-700'
                }`}>
                  {selectedEvent.priority.charAt(0).toUpperCase() + selectedEvent.priority.slice(1)} Priority
                </span>
              </div>
              <button 
                onClick={() => setSelectedEvent(null)} 
                className="text-gray-400 hover:text-gray-600 p-2 hover:bg-gray-100 rounded-full transition-all duration-200"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Clock size={20} className="text-indigo-500" />
                <div>
                  <div className="text-sm font-medium">Start Date</div>
                  <div className="text-sm">{new Date(selectedEvent.start).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
              <div className="flex items-center gap-3 text-gray-600">
                <AlertCircle size={20} className="text-purple-500" />
                <div>
                  <div className="text-sm font-medium">End Date</div>
                  <div className="text-sm">{new Date(selectedEvent.end).toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</div>
                </div>
              </div>
              <div className="pt-4 border-t border-gray-200">
                <span className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-sm font-medium ${
                  selectedEvent.status === 'done' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {selectedEvent.status === 'done' ? '✓ Completed' : '⏳ In Progress'}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Main App with Modern Navigation
export default function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [activeTab, setActiveTab] = useState('todos');

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
  };

  if (!token) {
    return <AuthForm onLogin={setToken} />;
  }

  const tabs = [
    { id: 'todos', label: 'Todos', icon: List },
    { id: 'tasks', label: 'Tasks', icon: CheckSquare },
    { id: 'calendar', label: 'Calendar', icon: Calendar }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-xl">
                <CheckSquare className="text-white" size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  TaskFlow
                </h1>
                <p className="text-xs text-gray-500">Organize your life</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-xl transition-all duration-200"
            >
              <LogOut size={20} />
              <span className="font-medium">Logout</span>
            </button>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-2 mb-8 bg-white p-2 rounded-2xl shadow-sm inline-flex">
          {tabs.map(tab => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-medium flex items-center gap-2 rounded-xl transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-lg transform scale-105'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Icon size={20} />
                {tab.label}
              </button>
            );
          })}
        </div>

        <div>
          {activeTab === 'todos' && <TodoList token={token} />}
          {activeTab === 'tasks' && <TaskList token={token} />}
          {activeTab === 'calendar' && <CalendarView token={token} />}
        </div>
      </div>
    </div>
  );
}