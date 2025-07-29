
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ShoppingBag, User, Search, Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, logout } = useAuth();
  const { getTotalItems } = useCart();
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="text-2xl font-bold gradient-text"
            >
              New Fashion
            </motion.div>
          </Link>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center space-x-8">
  <Link
    to="/products"
    className="text-gray-700 hover:text-black transition-colors font-medium"
  >
    Tous les produits
  </Link>
  <Link
    to="/products?category=homme"
    className="text-gray-700 hover:text-black transition-colors font-medium"
  >
    Homme
  </Link>
  <Link
    to="/products?category=femme"
    className="text-gray-700 hover:text-black transition-colors font-medium"
  >
    Femme
  </Link>
  <Link
    to="/products?category=enfant"
    className="text-gray-700 hover:text-black transition-colors font-medium"
  >
    Enfant
  </Link>
  <Link
    to="/products?category=accessoire"
    className="text-gray-700 hover:text-black transition-colors font-medium"
  >
    Accessoires
  </Link>
</nav>


          {/* Barre de recherche */}
          <form onSubmit={handleSearch} className="hidden md:flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Rechercher..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            </div>
          </form>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            {/* Panier */}
            <Link to="/cart" className="relative">
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ShoppingBag className="w-6 h-6 text-gray-700" />
                {getTotalItems() > 0 && (
                  <span className="absolute -top-1 -right-1 bg-black text-white text-xs rounded-full w-5 h-5 flex items-center justify-center cart-badge">
                    {getTotalItems()}
                  </span>
                )}
              </motion.div>
            </Link>

            {/* Utilisateur */}
            {user ? (
              <div className="hidden md:flex items-center space-x-2">
                <Link to="/profile">
                  <Button variant="ghost" size="sm">
                    <User className="w-4 h-4 mr-2" />
                    {user.name}
                  </Button>
                </Link>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Déconnexion
                </Button>
              </div>
            ) : (
              <Link to="/auth" className="hidden md:block">
                <Button variant="outline" size="sm">
                  <User className="w-4 h-4 mr-2" />
                  Connexion
                </Button>
              </Link>
            )}

            {/* Menu mobile */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 text-gray-700" />
              ) : (
                <Menu className="w-6 h-6 text-gray-700" />
              )}
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden py-4 border-t border-gray-200"
          >
            <div className="space-y-4">
              {/* Recherche mobile */}
              <form onSubmit={handleSearch} className="px-2">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                </div>
              </form>

              {/* Navigation mobile */}
              <nav className="space-y-2">
                <Link
                  to="/products"
                  className="block px-2 py-2 text-gray-700 hover:text-black transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Tous les produits
                </Link>
                <Link
                  to="/products?category=homme"
                  className="block px-2 py-2 text-gray-700 hover:text-black transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Homme
                </Link>
                <Link
                  to="/products?category=femme"
                  className="block px-2 py-2 text-gray-700 hover:text-black transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Femme
                </Link>
                <Link
                  to="/products?category=enfant"
                  className="block px-2 py-2 text-gray-700 hover:text-black transition-colors font-medium"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Enfant
                </Link>
              </nav>

              {/* Actions mobile */}
              <div className="px-2 pt-4 border-t border-gray-200">
                {user ? (
                  <div className="space-y-2">
                    <Link to="/profile" onClick={() => setIsMenuOpen(false)}>
                      <Button variant="ghost" className="w-full justify-start">
                        <User className="w-4 h-4 mr-2" />
                        {user.name}
                      </Button>
                    </Link>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                    >
                      Déconnexion
                    </Button>
                  </div>
                ) : (
                  <Link to="/auth" onClick={() => setIsMenuOpen(false)}>
                    <Button variant="outline" className="w-full justify-start">
                      <User className="w-4 h-4 mr-2" />
                      Connexion
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </header>
  );
};

export default Header;
