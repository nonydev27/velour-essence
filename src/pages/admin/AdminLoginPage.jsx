import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';
import { useAdminLogin } from '../../hooks/useAdmin';
import { useAuthStore } from '../../store/authStore';
import { useToast } from '../../components/ui/Toast';

const schema = z.object({
  email: z.email('Enter a valid email'),
  password: z.string().min(1, 'Password required'),
});

export default function AdminLoginPage() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated);
  const toast = useToast();
  const { mutate: login, isPending } = useAdminLogin();
  const [showPass, setShowPass] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm({ resolver: zodResolver(schema) });

  useEffect(() => {
    if (isAuthenticated) navigate('/admin/dashboard', { replace: true });
  }, [isAuthenticated]);

  function onSubmit(data) {
    login(data, {
      onSuccess: () => navigate('/admin/dashboard'),
      onError: (err) => toast(err.response?.data?.message || 'Login failed', 'error'),
    });
  }

  return (
    <div
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-charcoal"
    >
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490750967868-88df5691cc1b?w=1200&q=60')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal/80 to-burgundy-dark/60" />

      {/* Card */}
      <div className="relative z-10 w-full max-w-sm mx-4 bg-white rounded-2xl p-8 shadow-2xl">
        {/* Logo */}
        <div className="text-center mb-6">
          <div className="flex flex-col items-center leading-none mb-4">
            <span className="font-serif text-2xl font-semibold text-charcoal">Velour</span>
            <span className="text-[9px] font-medium text-warm-gray uppercase tracking-[0.25em]">Essence</span>
          </div>
          <h1 className="text-lg font-serif text-charcoal">Admin Login</h1>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-warm-gray">Email</label>
            <input
              type="email"
              placeholder="admin@velour.com"
              className={`w-full px-3 py-2.5 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-charcoal ${errors.email ? 'border-error' : 'border-border'}`}
              {...register('email')}
            />
            {errors.email && <p className="text-xs text-error">{errors.email.message}</p>}
          </div>

          <div className="flex flex-col gap-1">
            <label className="text-xs font-medium text-warm-gray">Password</label>
            <div className="relative">
              <input
                type={showPass ? 'text' : 'password'}
                placeholder="••••••••"
                className={`w-full px-3 py-2.5 pr-10 border rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-charcoal ${errors.password ? 'border-error' : 'border-border'}`}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPass((s) => !s)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-warm-gray hover:text-charcoal"
              >
                {showPass ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {errors.password && <p className="text-xs text-error">{errors.password.message}</p>}
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-warm-gray cursor-pointer">
              <input type="checkbox" className="rounded accent-charcoal" />
              Remember me
            </label>
            <button type="button" className="text-warm-gray hover:text-charcoal hover:underline">
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className="w-full py-2.5 rounded-lg bg-charcoal text-white font-medium text-sm hover:bg-burgundy transition-colors disabled:opacity-60 mt-1"
          >
            {isPending ? 'Signing in…' : 'Login'}
          </button>
        </form>

        <p className="text-center text-[10px] text-warm-gray mt-6">
          &copy; {new Date().getFullYear()} Velour Essence. All rights reserved.
        </p>
      </div>
    </div>
  );
}
