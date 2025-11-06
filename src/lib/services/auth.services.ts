import type { User, LoginCredentials } from '$lib/types/user';

const MOCK_USERS: Record<string, { password: string; user: User }> = {
  'admin@example.com': {
    password: 'admin123',
    user: {
      id: '1',
      email: 'admin@example.com',
      name: 'Admin User',
      role: 'admin',
      avatar: 'https://i.pravatar.cc/150?img=1'
    }
  },
  'user@example.com': {
    password: 'user123',
    user: {
      id: '2',
      email: 'user@example.com',
      name: 'Regular User',
      role: 'user',
      avatar: 'https://i.pravatar.cc/150?img=2'
    }
  }
};

export const authService = {
  async login(credentials: LoginCredentials): Promise<{ token: string; user: User }> {
    await new Promise(resolve => setTimeout(resolve, 1000));

    const mockUser = MOCK_USERS[credentials.email];

    if (!mockUser || mockUser.password !== credentials.password) {
      throw new Error('Email ou senha inválidos');
    }

    const token = btoa(`${credentials.email}:${Date.now()}`);

    return {
      token,
      user: mockUser.user
    };
  },

  async validateToken(token: string): Promise<User> {
    await new Promise(resolve => setTimeout(resolve, 500));

    try {
      const decoded = atob(token);
      const email = decoded.split(':')[0];
      const mockUser = MOCK_USERS[email];

      if (!mockUser) {
        throw new Error('Token inválido');
      }

      return mockUser.user;
    } catch {
      throw new Error('Token inválido');
    }
  },

  async logout(): Promise<void> {
    // Lógica de logout (se necessário)
    await new Promise(resolve => setTimeout(resolve, 300));
  }
};