'use client';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import RouteGuard from '../components/RouteGuard';
import BackgroundAnimation from '@/components/ui/BackgroundAnimation';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todo');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTodos(data);
      } else {
        setTodos([]);
        setError('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]);
      setError('Failed to fetch todos');
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  // Add todo
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/todo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content,
          userId: 'default-user-id', 
          userName: 'Anonymous' 
        }),
      });
      
      if (response.ok) {
        setContent('');
        await fetchTodos();
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to add todo');
      }
    } catch (error) {
      console.error('Error adding todo:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  // Delete todo
  const handleDelete = async (id) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (response.ok) {
        await fetchTodos();
      } else {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo');
    }
  };

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[#121212] p-4">
        <BackgroundAnimation />
        <div className="max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold text-white mb-8">Share Your Thoughts</h1>
          
          {/* Error Display */}
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}
          
          {/* Input Form */}
          <form onSubmit={handleSubmit} className="mb-8">
            <div className="bg-[#1E1E1E]/95 backdrop-blur-sm rounded-lg p-4">
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="What's on your mind?"
                className="w-full bg-transparent text-white placeholder-gray-400 outline-none resize-none"
                rows="3"
              />
              <div className="flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-full transition-colors disabled:opacity-50"
                >
                  {loading ? 'Posting...' : 'Post'}
                </button>
              </div>
            </div>
          </form>

          {/* Todos List */}
          <div className="space-y-4">
            {Array.isArray(todos) && todos.length > 0 ? (
              todos.map((todo) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-[#1E1E1E]/95 backdrop-blur-sm rounded-lg p-4"
                >
                  <div className="flex justify-between items-start">
                    <p className="text-white">{todo.content}</p>
                    <button
                      onClick={() => handleDelete(todo._id)}
                      className="text-gray-400 hover:text-red-500"
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">
                    {new Date(todo.createdAt).toLocaleDateString()}
                  </p>
                </motion.div>
              ))
            ) : (
              <p className="text-gray-400 text-center">No thoughts shared yet. Be the first!</p>
            )}
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
