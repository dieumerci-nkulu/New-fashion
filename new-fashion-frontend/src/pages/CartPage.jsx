
import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';

const CartPage = () => {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Helmet>
          <title>Panier - New Fashion</title>
          <meta name="description" content="Votre panier d'achat New Fashion" />
        </Helmet>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center space-y-6"
          >
            <ShoppingBag className="w-24 h-24 text-gray-400 mx-auto" />
            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-black">Votre panier est vide</h1>
              <p className="text-gray-600">
                Découvrez notre collection et ajoutez vos articles préférés
              </p>
            </div>
            <Link to="/products">
              <Button size="lg">
                <ArrowLeft className="w-5 h-5 mr-2" />
                Continuer mes achats
              </Button>
            </Link>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{`Panier (${getTotalItems()}) - New Fashion`}</title>
        <meta name="description" content="Votre panier d'achat New Fashion" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-3xl lg:text-4xl font-bold text-black">
              Mon Panier
            </h1>
            <Link to="/products">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Continuer mes achats
              </Button>
            </Link>
          </div>
          <p className="text-gray-600">
            {getTotalItems()} article{getTotalItems() > 1 ? 's' : ''} dans votre panier
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Articles du panier */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item, index) => (
              <motion.div
                key={item.cartId}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row gap-4">
                      {/* Image */}
                      <div className="w-full sm:w-32 h-40 sm:h-32 rounded-lg overflow-hidden bg-gray-100 flex-shrink-0">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover"
                        />
                      </div>

                      {/* Informations */}
                      <div className="flex-1 space-y-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <Link
                              to={`/product/${item.id}`}
                              className="text-lg font-semibold text-black hover:underline"
                            >
                              {item.name}
                            </Link>
                            <p className="text-sm text-gray-600 capitalize">
                              {item.category} • Taille: {item.size}
                            </p>
                          </div>
                          <button
                            onClick={() => removeFromCart(item.cartId)}
                            className="text-gray-400 hover:text-red-500 transition-colors p-1"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>

                        <div className="flex items-center justify-between">
                          {/* Quantité */}
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                              className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="w-8 text-center font-medium">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                              className="w-8 h-8 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>

                          {/* Prix */}
                          <div className="text-right">
                            <div className="text-lg font-bold text-black">
                              {(item.price * item.quantity).toFixed(2)} €
                            </div>
                            {item.quantity > 1 && (
                              <div className="text-sm text-gray-600">
                                {item.price.toFixed(2)} € l'unité
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Résumé de commande */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-8">
              <CardContent className="p-6 space-y-6">
                <h2 className="text-xl font-bold text-black">
                  Résumé de commande
                </h2>

                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Sous-total</span>
                    <span className="font-medium">{getTotalPrice().toFixed(2)} €</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Livraison</span>
                    <span className="font-medium">
                      {getTotalPrice() >= 50 ? 'Gratuite' : '4.99 €'}
                    </span>
                  </div>
                  {getTotalPrice() < 50 && (
                    <div className="text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
                      Ajoutez {(50 - getTotalPrice()).toFixed(2)} € pour bénéficier de la livraison gratuite
                    </div>
                  )}
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold text-black">Total</span>
                    <span className="text-xl font-bold text-black">
                      {(getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 4.99)).toFixed(2)} €
                    </span>
                  </div>
                </div>

                <Link to="/checkout" className="block">
                  <Button size="lg" className="w-full">
                    Passer la commande
                  </Button>
                </Link>

                <div className="text-center">
                  <Link
                    to="/products"
                    className="text-sm text-gray-600 hover:text-black transition-colors"
                  >
                    Continuer mes achats
                  </Link>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
