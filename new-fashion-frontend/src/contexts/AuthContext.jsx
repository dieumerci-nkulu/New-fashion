
import React, { createContext, useContext, useState, useEffect } from 'react';
import { toast } from '@/components/ui/use-toast';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Vérifier si l'utilisateur est connecté au chargement
    const savedUser = localStorage.getItem('newFashionUser');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    try {
      // Simulation d'appel API
      const users = JSON.parse(localStorage.getItem('newFashionUsers') || '[]');
      const user = users.find(u => u.email === email && u.password === password);
      
      if (user) {
        const userWithoutPassword = { ...user };
        delete userWithoutPassword.password;
        setUser(userWithoutPassword);
        localStorage.setItem('newFashionUser', JSON.stringify(userWithoutPassword));
        toast({
          title: "Connexion réussie",
          description: `Bienvenue ${user.name} !`,
        });
        return { success: true };
      } else {
        toast({
          title: "Erreur de connexion",
          description: "Email ou mot de passe incorrect",
          variant: "destructive",
        });
        return { success: false, error: "Identifiants incorrects" };
      }
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de la connexion",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const register = async (userData) => {
    try {
      // Simulation d'appel API
      const users = JSON.parse(localStorage.getItem('newFashionUsers') || '[]');
      
      // Vérifier si l'email existe déjà
      if (users.find(u => u.email === userData.email)) {
        toast({
          title: "Erreur d'inscription",
          description: "Cet email est déjà utilisé",
          variant: "destructive",
        });
        return { success: false, error: "Email déjà utilisé" };
      }

      const newUser = {
        id: Date.now().toString(),
        ...userData,
        createdAt: new Date().toISOString(),
      };

      users.push(newUser);
      localStorage.setItem('newFashionUsers', JSON.stringify(users));

      const userWithoutPassword = { ...newUser };
      delete userWithoutPassword.password;
      setUser(userWithoutPassword);
      localStorage.setItem('newFashionUser', JSON.stringify(userWithoutPassword));

      toast({
        title: "Inscription réussie",
        description: `Bienvenue ${newUser.name} !`,
      });
      return { success: true };
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors de l'inscription",
        variant: "destructive",
      });
      return { success: false, error: error.message };
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('newFashionUser');
    toast({
      title: "Déconnexion",
      description: "À bientôt !",
    });
  };

  const value = {
    user,
    login,
    register,
    logout,
    loading,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
