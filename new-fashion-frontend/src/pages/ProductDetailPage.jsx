import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, Heart, Share2, ArrowLeft, Truck, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ProductCard from '@/components/ProductCard';
import { useCart } from '@/contexts/CartContext';
import { getProductById, getRecommendations } from '@/data/products';
import { toast } from '@/components/ui/use-toast';

const ProductDetailPage = () => {
  const { id } = useParams();
  const product = getProductById(parseInt(id));
  const recommendations = getRecommendations(parseInt(id));
  const { addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Helmet>
          <title>Produit non trouvé - New Fashion</title>
          <meta name="description" content="Le produit que vous recherchez n'a pas été trouvé." />
        </Helmet>
        <div className="text-center space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Produit non trouvé</h2>
          <Link to="/products">
            <Button>Retour aux produits</Button>
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    if (!selectedSize) {
      toast({
        title: "Taille requise",
        description: "Veuillez sélectionner une taille",
        variant: "destructive",
      });
      return;
    }

    addToCart(product, selectedSize, quantity);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: product.name,
        text: product.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      toast({
        title: "Lien copié",
        description: "Le lien du produit a été copié dans le presse-papiers",
      });
    }
  };

  const handleWishlist = () => {
    toast({
      title: "🚧 Cette fonctionnalité n'est pas encore implémentée—but ne vous inquiétez pas ! Vous pouvez la demander dans votre prochaine requête ! 🚀",
    });
  };

  return (
    <div className="min-h-screen bg-white">
      <Helmet>
        <title>{product.name} - New Fashion</title>
        <meta name="description" content={product.description} />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center space-x-2 text-sm text-gray-600 mb-8"
        >
          <Link to="/" className="hover:text-black transition-colors">
            Accueil
          </Link>
          <span>/</span>
          <Link to="/products" className="hover:text-black transition-colors">
            Produits
          </Link>
          <span>/</span>
          <Link 
            to={`/products?category=${product.category}`} 
            className="hover:text-black transition-colors capitalize"
          >
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-black">{product.name}</span>
        </motion.div>

        {/* Bouton retour */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Link to="/products">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour aux produits
            </Button>
          </Link>
        </motion.div>

        {/* Contenu principal */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Images */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <div className="aspect-[3/4] rounded-lg overflow-hidden bg-gray-100">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Informations produit */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-6"
          >
            {/* En-tête */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="bg-gray-100 text-gray-800 text-sm px-3 py-1 rounded-full capitalize">
                  {product.category}
                </span>
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="sm" onClick={handleWishlist}>
                    <Heart className="w-5 h-5" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={handleShare}>
                    <Share2 className="w-5 h-5" />
                  </Button>
                </div>
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-black">
                {product.name}
              </h1>

              <div className="flex items-center space-x-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">
                  {product.rating} ({product.reviews} avis)
                </span>
              </div>

              <div className="text-3xl font-bold text-black">
                {product.price.toFixed(2)} €
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="font-semibold text-black">Description</h3>
              <p className="text-gray-600 leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Couleurs */}
            <div className="space-y-3">
              <h3 className="font-semibold text-black">Couleur</h3>
              <div className="flex flex-wrap gap-2">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                      selectedColor === color
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Tailles */}
            <div className="space-y-3">
              <h3 className="font-semibold text-black">Taille</h3>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 border rounded-md text-sm transition-colors ${
                      selectedSize === size
                        ? 'border-black bg-black text-white'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantité */}
            <div className="space-y-3">
              <h3 className="font-semibold text-black">Quantité</h3>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="w-12 text-center font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 border border-gray-300 rounded-md flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="space-y-4">
              <Button
                size="lg"
                className="w-full"
                onClick={handleAddToCart}
              >
                <ShoppingBag className="w-5 h-5 mr-2" />
                Ajouter au panier - {(product.price * quantity).toFixed(2)} €
              </Button>
            </div>

            {/* Informations livraison */}
            <div className="space-y-4 pt-6 border-t border-gray-200">
              <div className="flex items-center space-x-3">
                <Truck className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Livraison gratuite dès 50€ d'achat
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <RotateCcw className="w-5 h-5 text-gray-600" />
                <span className="text-sm text-gray-600">
                  Retours gratuits sous 30 jours
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Recommandations */}
        {recommendations.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl lg:text-3xl font-bold text-black mb-4">
                Produits Similaires
              </h2>
              <p className="text-gray-600">
                Découvrez d'autres produits qui pourraient vous plaire
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {recommendations.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>
          </motion.section>
        )}
      </div>
    </div>
  );
};

export default ProductDetailPage;