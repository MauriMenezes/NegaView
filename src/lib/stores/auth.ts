// src/lib/stores/auth.ts
import { writable, derived } from 'svelte/store';
import type { User, AuthState } from '$lib/types/user';

function createAuthStore() {
  const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: true
  };

  const { subscribe, set, update } = writable<AuthState>(initialState);

  return {
    subscribe,
    
    async init() {
      // Verifica se há token salvo
      const token = localStorage.getItem('token');
      
      if (token) {
        try {
          const user = await this.validateToken(token);
          set({
            user,
            isAuthenticated: true,
            isLoading: false
          });
        } catch (error) {
          localStorage.removeItem('token');
          set({
            user: null,
            isAuthenticated: false,
            isLoading: false
          });
        }
      } else {
        update(state => ({ ...state, isLoading: false }));
      }
    },

    async login(email: string, password: string) {
      update(state => ({ ...state, isLoading: true }));
      
      try {
        // Simulação de API (substitua por sua API real)
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
          throw new Error('Credenciais inválidas');
        }

        const { token, user } = await response.json();
        
        localStorage.setItem('token', token);
        
        set({
          user,
          isAuthenticated: true,
          isLoading: false
        });

        return { success: true };
      } catch (error) {
        update(state => ({ ...state, isLoading: false }));
        return {
          success: false,
          error: error instanceof Error ? error.message : 'Erro ao fazer login'
        };
      }
    },

    async logout() {
      localStorage.removeItem('token');
      set({
        user: null,
        isAuthenticated: false,
        isLoading: false
      });
    },

    async validateToken(token: string): Promise<User> {
      const response = await fetch('/api/auth/validate', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Token inválido');
      }

      return response.json();
    }
  };
}

export const authStore = createAuthStore();

// Derived stores úteis
export const isAuthenticated = derived(
  authStore,
  $auth => $auth.isAuthenticated
);

export const currentUser = derived(
  authStore,
  $auth => $auth.user
);