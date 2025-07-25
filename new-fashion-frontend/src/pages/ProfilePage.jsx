
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { User, Package, Settings, LogOut, Calendar, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';

const ProfilePage = () => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Charger les commandes depuis localStorage
    const savedOrders = JSON.parse(localStorage.getItem('newFashionOrders') || '[]');
    setOrders(savedOrders.reverse()); // Plus récentes en premier

    // Afficher message de confirmation si on vient de passer commande
    if (location.state?.orderConfirmed) {
      toast({
        title: "Commande confirmée !",
        description: "Votre commande a été passée avec succès",
      });
    }}, [location.state]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'shipped':
        return 'bg-purple-100 text-purple-800';
      case 'delivered':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmée';
      case 'processing':
        return 'En préparation';
      case 'shipped':
        return 'Expédiée';
      case 'delivered':
        return 'Livrée';
      default:
        return status;
    }
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Accès non autorisé</h2>
          <p className="text-gray-600">Veuillez vous connecter pour accéder à votre profil</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Mon Profil - New Fashion</title>
        <meta name="description" content="Gérez votre profil et vos commandes New Fashion" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold text-black mb-2">
                Mon Profil
              </h1>
              <p className="text-gray-600">
                Bienvenue {user.name} !
              </p>
            </div>
            <Button variant="outline" onClick={logout}>
              <LogOut className="w-4 h-4 mr-2" />
              Déconnexion
            </Button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-16 h-16 bg-black text-white rounded-full flex items-center justify-center">
                    <User className="w-8 h-8" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-black">{user.name}</h3>
                    <p className="text-sm text-gray-600">{user.email}</p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span>Membre depuis {new Date(user.createdAt).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-3 text-sm text-gray-600">
                    <Package className="w-4 h-4" />
                    <span>{orders.length} commande{orders.length > 1 ? 's' : ''}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Contenu principal */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            <Tabs defaultValue="orders" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="orders">Mes Commandes</TabsTrigger>
                <TabsTrigger value="profile">Informations</TabsTrigger>
              </TabsList>

              {/* Commandes */}
              <TabsContent value="orders" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Package className="w-5 h-5" />
                      <span>Mes Commandes</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {orders.length > 0 ? (
                      <div className="space-y-4">
                        {orders.map((order) => (
                          <div
                            key={order.id}
                            className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                          >
                            <div className="flex items-center justify-between mb-3">
                              <div className="flex items-center space-x-4">
                                <span className="font-semibold text-black">
                                  Commande #{order.id}
                                </span>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {getStatusText(order.status)}
                                </span>
                              </div>
                              <div className="text-right">
                                <div className="font-semibold text-black">
                                  {order.total.toFixed(2)} €
                                </div>
                                <div className="text-sm text-gray-600">
                                  {new Date(order.date).toLocaleDateString()}
                                </div>
                              </div>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                              {order.items.slice(0, 3).map((item) => (
                                <div key={item.cartId} className="flex items-center space-x-3">
                                  <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                                    <img
                                      src={item.image}
                                      alt={item.name}
                                      className="w-full h-full object-cover"
                                    />
                                  </div>
                                  <div className="flex-1 min-w-0">
                                    <p className="text-sm font-medium text-black truncate">
                                      {item.name}
                                    </p>
                                    <p className="text-xs text-gray-600">
                                      Qté: {item.quantity}
                                    </p>
                                  </div>
                                </div>
                              ))}
                              {order.items.length > 3 && (
                                <div className="flex items-center justify-center text-sm text-gray-600">
                                  +{order.items.length - 3} autre{order.items.length - 3 > 1 ? 's' : ''}
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-8">
                        <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          Aucune commande
                        </h3>
                        <p className="text-gray-600">
                          Vous n'avez pas encore passé de commande
                        </p>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </TabsContent>

              {/* Profil */}
              <TabsContent value="profile" className="space-y-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Settings className="w-5 h-5" />
                      <span>Informations personnelles</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Nom complet</label>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                          <User className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{user.name}</span>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700">Email</label>
                        <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-md">
                          <Mail className="w-4 h-4 text-gray-400" />
                          <span className="text-gray-900">{user.email}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-4">
                      <Button
                        onClick={() => {
                          toast({
                            title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀",
                          });
                        }}
                        variant="outline"
                      >
                        Modifier mes informations
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Préférences</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-black">Notifications email</h4>
                        <p className="text-sm text-gray-600">
                          Recevoir des emails sur les nouvelles collections
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀",
                          });
                        }}
                      >
                        Gérer
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div>
                        <h4 className="font-medium text-black">Recommandations</h4>
                        <p className="text-sm text-gray-600">
                          Personnaliser les suggestions de produits
                        </p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          toast({
                            title: "🚧 Cette fonctionnalité n'est pas encore implémentée—mais ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀",
                          });
                        }}
                      >
                        Configurer
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
