'use client';
import { useState } from 'react';
import { signInWithPopup } from 'firebase/auth';
import { auth, googleProvider } from '@/firebase';
import { useRouter } from 'next/navigation';
import { FaGoogle } from 'react-icons/fa';
import { HiCalendar, HiSparkles } from 'react-icons/hi';
import BackgroundAnimation from '@/components/ui/BackgroundAnimation';
import { motion } from 'framer-motion';

function SignIn() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const signInWithGoogle = async () => {
    try {
      setLoading(true);
      await signInWithPopup(auth, googleProvider);
      router.push('/home');
    } catch (error) {
      console.error('Error signing in with Google:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#0f172a]">
      <BackgroundAnimation />
      
      <motion.div 
        className="relative z-10 bg-white/10 backdrop-blur-lg p-8 rounded-2xl shadow-xl w-full max-w-md border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="text-center mb-8">
          <div className="flex justify-center items-center gap-2 mb-3">
            <HiCalendar className="text-4xl text-purple-400" />
            <HiSparkles className="text-3xl text-purple-300 animate-pulse" />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2 bg-gradient-to-r from-purple-400 to-pink-400 text-transparent bg-clip-text">
            Welcome to Eventify
          </h1>
          <p className="text-gray-300">Your journey to amazing events begins here</p>
        </div>

        <motion.button
          className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg px-6 py-3.5 text-white hover:from-purple-600 hover:to-pink-600 transition-all duration-200 ease-in-out transform hover:scale-[1.02] disabled:opacity-70"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={signInWithGoogle}
          disabled={loading}
        >
          <FaGoogle className="text-xl" />
          <span className="font-medium">
            {loading ? 'Signing in...' : 'Continue with Google'}
          </span>
        </motion.button>

        <div className="relative my-8">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-white/10"></div>
          </div>
          <div className="relative flex justify-center text-sm">
            <span className="px-2 text-gray-400 bg-[#0f172a]/50 backdrop-blur-sm rounded">
              Secure Sign-in
            </span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-sm text-gray-400">
            By continuing, you agree to our{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
              Terms of Service
            </a>{' '}
            and{' '}
            <a href="#" className="text-purple-400 hover:text-purple-300 hover:underline transition-colors">
              Privacy Policy
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default SignIn;