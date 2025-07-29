
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Star, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useCart } from '@/contexts/CartContext';

const ProductCard = ({ product, index = 0 }) => {
  const { addToCart } = useCart();

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="group"
    >
      <Link to={`/product/${product.id}`}>
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover-lift">
          {/* Image */}
          <div className="relative aspect-[3/4] overflow-hidden">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300" />
            
            {/* Badge catégorie */}
            <div className="absolute top-3 left-3">
              <span className="bg-black text-white text-xs px-2 py-1 rounded-full capitalize">
                {product.category}
              </span>
            </div>

            {/* Bouton ajout rapide */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <Button
                size="sm"
                onClick={handleAddToCart}
                className="bg-white text-black hover:bg-gray-100 shadow-lg"
              >
                <ShoppingBag className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Contenu */}
          <div className="p-4 space-y-3">
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-black transition-colors">
                {product.name}
              </h3>
              <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                {product.description}
              </p>
            </div>

            {/* Rating */}
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${
                      i < Math.floor(product.rating)
                        ? 'text-yellow-400 fill-current'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-sm text-gray-600">
                ({product.reviews})
              </span>
            </div>

            {/* Prix */}
            <div className="flex items-center justify-between">
              <span className="text-xl font-bold text-black block">
      ${product.price.toFixed(2)}
    </span>
    <span className="text-sm text-gray-500">
      {(product.price * 2700).toLocaleString('fr-CD')} FC
    </span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-gray-300"
                    style={{
                      backgroundColor: color.toLowerCase() === 'blanc' ? '#ffffff' :
                                     color.toLowerCase() === 'noir' ? '#000000' :
                                     color.toLowerCase() === 'gris' ? '#808080' :
                                     color.toLowerCase() === 'bleu' ? '#0066cc' :
                                     color.toLowerCase() === 'rouge' ? '#cc0000' :
                                     color.toLowerCase() === 'rose' ? '#ff69b4' :
                                     '#cccccc'
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
