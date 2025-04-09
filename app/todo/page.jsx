'use client';
import { useState, useEffect, useMemo, useCallback } from 'react';
import { motion } from 'framer-motion';
import RouteGuard from '../components/RouteGuard';
import BackgroundAnimation from '@/components/ui/BackgroundAnimation';
import { auth } from '@/firebase';
import WarningPopup from './components/WarningPopup';

export default function TodoPage() {
  const [todos, setTodos] = useState([]);
  const [content, setContent] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [lastFetchTime, setLastFetchTime] = useState(0);
  const CACHE_DURATION = 30000; // 30 seconds cache duration

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const fetchTodos = useCallback(async (forceRefresh = false) => {
    const now = Date.now();
    // Only fetch if cache is expired or force refresh is requested
    if (!forceRefresh && now - lastFetchTime < CACHE_DURATION) {
      return;
    }

    try {
      const response = await fetch('/api/todo');
      const data = await response.json();
      
      if (Array.isArray(data)) {
        setTodos(data);
        setLastFetchTime(now);
      } else {
        setTodos([]);
        setError('Invalid data format received');
      }
    } catch (error) {
      console.error('Error fetching todos:', error);
      setTodos([]);
      setError('Failed to fetch todos');
    }
  }, [lastFetchTime]);

  // Memoize the todos list to prevent unnecessary re-renders
  const memoizedTodos = useMemo(() => todos, [todos]);

  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const handleSubmit = useCallback(async (e) => {
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
          userId: user?.uid || 'anonymous',
          userName: user?.displayName || 'Anonymous'
        }),
      });
      
      if (response.ok) {
        setContent('');
        await fetchTodos(true); // Force refresh after adding new todo
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
  }, [content, user, fetchTodos]);

  const handleDelete = useCallback(async (id) => {
    try {
      const response = await fetch('/api/todo', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      });
      
      if (response.ok) {
        await fetchTodos(true); // Force refresh after deletion
      } else {
        throw new Error('Failed to delete todo');
      }
    } catch (error) {
      console.error('Error deleting todo:', error);
      setError('Failed to delete todo');
    }
  }, [fetchTodos]);

  return (
    <RouteGuard>
      <div className="min-h-screen bg-[#121212]">
        <BackgroundAnimation />
        <WarningPopup />
        
        {/* Header */}
        <div className="sticky top-0 bg-[#121212]/95 backdrop-blur-md z-20">
          <div className="max-w-2xl mx-auto px-4 py-3 border-b border-gray-800">
            <h1 className="text-xl font-bold text-white">Share your thoughts be respectful</h1>
          </div>
          
          {/* Input Bar */}
          <div className="px-4 py-3 border-b border-gray-800">
            <div className="max-w-2xl mx-auto">
              <form onSubmit={handleSubmit} className="flex items-start gap-3">
                <div className="w-10 h-10 rounded-full bg-purple-600 flex items-center justify-center">
                  <span className="text-white font-medium">
                    {user?.displayName?.charAt(0).toUpperCase() || 'A'}
                  </span>
                </div>
                <div className="flex-1">
                  <input
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="What's on your mind?"
                    className="w-full bg-transparent text-xl text-white placeholder-gray-500 outline-none mb-2"
                  />
                  <button
                    type="submit"
                    disabled={loading || !content.trim()}
                    className="ml-auto bg-purple-600 hover:bg-purple-700 text-white px-5 py-1.5 rounded-full transition-colors disabled:opacity-50 disabled:hover:bg-purple-600 text-sm font-semibold"
                  >
                    {loading ? 'Posting...' : 'Post'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="max-w-2xl mx-auto">
          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-500 p-3 m-4 rounded-lg">
              {error}
            </div>
          )}

          <div>
            {Array.isArray(todos) && todos.length > 0 ? (
              todos.map((todo) => (
                <motion.div
                  key={todo._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-4 border-b border-gray-800 hover:bg-[#1E1E1E] transition-colors"
                >
                  <div className="flex gap-3">
                    <div className="w-10 h-10 rounded-full bg-purple-600 flex-shrink-0 flex items-center justify-center">
                      <span className="text-white font-medium">
                        {todo.userName.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <p className="font-bold text-white">{todo.userName}</p>
                          <span className="text-gray-500">·</span>
                          <p className="text-gray-500 text-sm">
                            {new Date(todo.createdAt).toLocaleDateString(undefined, {
                              month: 'short',
                              day: 'numeric'
                            })}
                          </p>
                        </div>
                        <button
                          onClick={() => handleDelete(todo._id)}
                          className="text-gray-500 hover:text-red-500 p-1 hover:bg-red-500/10 rounded-full transition-colors"
                        >
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </button>
                      </div>
                      <p className="text-white mt-1">{todo.content}</p>
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="text-gray-400 text-lg">No tweets yet.</p>
                <p className="text-gray-500">Start the conversation!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </RouteGuard>
  );
}
