import type { User } from '../types/authTypes';

export const loginMock = async (email: string, password: string): Promise<User> => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (email === 'admin@ucb.edu.bo' && password === '123456') {
        resolve({
          id: '1',
          name: 'Admin Staff',
          role: 'admin',
          token: 'fake-jwt-token-123',
        });
      } else {
        reject(new Error('Credenciales incorrectas. Intenta con admin@ucb.edu.bo y 123456'));
      }
    }, 1000);
  });
};
