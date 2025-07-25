import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Truck, Shield, Headphones } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';

const HomePage = () => {
  const featuredProducts = products.slice(0, 6);

  return (
    <div className="min-h-screen">
      <Helmet>
        <title>New Fashion - Boutique de Vêtements Moderne</title>
        <meta name="description" content="Découvrez New Fashion, votre boutique en ligne de vêtements tendance pour homme, femme et enfant. Collections exclusives et recommandations personnalisées." />
      </Helmet>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-50 to-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-8"
            >
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold text-black leading-tight">
                  Mode & Style
                  <span className="block gradient-text">Nouvelle Génération</span>
                </h1>
                <p className="text-xl text-gray-600 leading-relaxed">
                  Découvrez notre collection exclusive de vêtements tendance avec 
                  des recommandations personnalisées basées sur vos goûts.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/products">
                  <Button size="lg" className="w-full sm:w-auto">
                    Découvrir la collection
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link to="/products?category=femme">
                  <Button variant="outline" size="lg" className="w-full sm:w-auto">
                    Nouveautés femme
                  </Button>
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">1000+</div>
                  <div className="text-sm text-gray-600">Produits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">50k+</div>
                  <div className="text-sm text-gray-600">Clients satisfaits</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-black">4.8</div>
                  <div className="text-sm text-gray-600">Note moyenne</div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative"
            >
              <div className="grid grid-cols-2 gap-4">
                <img  
                  alt="Femme portant une robe élégante noire"
                  className="rounded-lg shadow-lg hover-lift"
                 src="https://images.unsplash.com/photo-1675539853780-c57e483c6311" />
                <img  
                  alt="Homme en chemise blanche et jean"
                  className="rounded-lg shadow-lg hover-lift mt-8"
                 src="https://images.unsplash.com/photo-1675410745450-ef0f2620b7f6" />
              </div>
              <div className="absolute -bottom-4 -left-4 bg-white p-4 rounded-lg shadow-lg">
                <div className="flex items-center space-x-2">
                  <Star className="w-5 h-5 text-yellow-400 fill-current" />
                  <span className="font-semibold">4.8/5</span>
                  <span className="text-gray-600 text-sm">(2.5k avis)</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Nos Collections
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Explorez nos collections soigneusement sélectionnées pour toute la famille
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Homme",
                description: "Style moderne et élégant",
                link: "/products?category=homme",
                image: "Homme en costume moderne et élégant"
              },
              {
                title: "Femme",
                description: "Tendance et sophistication",
                link: "/products?category=femme",
                image: "Femme en tenue tendance et sophistiquée"
              },
              {
                title: "Enfant",
                description: "Confort et couleurs vives",
                link: "/products?category=enfant",
                image: "Enfants heureux en vêtements colorés"
              }
            ].map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="group"
              >
                <Link to={category.link}>
                  <div className="relative aspect-[4/5] rounded-lg overflow-hidden hover-lift">
                    <img  
                      alt={`Collection ${category.title.toLowerCase()}`}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                     src="https://images.unsplash.com/photo-1661358789654-b6ab2cb6e0a3" />
                    <div className="absolute inset-0 bg-black bg-opacity-20 group-hover:bg-opacity-30 transition-all duration-300" />
                    <div className="absolute bottom-6 left-6 text-white">
                      <h3 className="text-2xl font-bold mb-2">{category.title}</h3>
                      <p className="text-sm opacity-90">{category.description}</p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Produits vedettes */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Produits Vedettes
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Découvrez notre sélection de produits les plus populaires
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/products">
              <Button size="lg" variant="outline">
                Voir tous les produits
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Avantages */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl lg:text-4xl font-bold text-black mb-4">
              Pourquoi Choisir New Fashion ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Truck,
                title: "Livraison Gratuite",
                description: "Livraison gratuite dès 50€ d'achat partout en France"
              },
              {
                icon: Shield,
                title: "Paiement Sécurisé",
                description: "Vos données sont protégées avec le cryptage SSL"
              },
              {
                icon: Headphones,
                title: "Support 24/7",
                description: "Notre équipe est disponible pour vous aider"
              }
            ].map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center space-y-4"
              >
                <div className="w-16 h-16 bg-black rounded-full flex items-center justify-center mx-auto">
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;