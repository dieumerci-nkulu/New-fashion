import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Filter, Grid, List } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ProductCard from '@/components/ProductCard';
import { products, getProductsByCategory, searchProducts } from '@/data/products';

const ProductsPage = () => {
  const [searchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [viewMode, setViewMode] = useState('grid');

  const category = searchParams.get('category');
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    let result = products;
    let currentCategory = category || 'all';

    if (category) {
      result = getProductsByCategory(category);
      currentCategory = category;
    } else if (searchQuery) {
      result = searchProducts(searchQuery);
      currentCategory = 'all';
    } else {
      result = getProductsByCategory(selectedCategory);
      currentCategory = selectedCategory;
    }

    setSelectedCategory(currentCategory);

    // Tri
    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'rating':
          return b.rating - a.rating;
        case 'name':
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredProducts(result);
  }, [category, searchQuery, selectedCategory, sortBy]);

  const categories = [
    { value: 'all', label: 'Tous les produits' },
    { value: 'homme', label: 'Homme' },
    { value: 'femme', label: 'Femme' },
    { value: 'enfant', label: 'Enfant' },
  ];

  const sortOptions = [
    { value: 'name', label: 'Nom A-Z' },
    { value: 'price-asc', label: 'Prix croissant' },
    { value: 'price-desc', label: 'Prix décroissant' },
    { value: 'rating', label: 'Mieux notés' },
  ];

  const getPageTitle = () => {
    if (searchQuery) {
      return `Recherche: ${searchQuery} - New Fashion`;
    }
    if (selectedCategory && selectedCategory !== 'all') {
      const catLabel = categories.find(c => c.value === selectedCategory)?.label || selectedCategory;
      return `Collection ${catLabel} - New Fashion`;
    }
    return 'Tous les produits - New Fashion';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>{getPageTitle()}</title>
        <meta name="description" content="Découvrez notre collection complète de vêtements tendance pour homme, femme et enfant. Filtrez par catégorie et trouvez votre style." />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* En-tête */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4 capitalize">
            {searchQuery ? `Résultats pour "${searchQuery}"` : selectedCategory !== 'all' ? `Collection ${selectedCategory}` : 'Tous les produits'}
          </h1>
          <p className="text-gray-600">
            {filteredProducts.length} produit{filteredProducts.length > 1 ? 's' : ''} trouvé{filteredProducts.length > 1 ? 's' : ''}
          </p>
        </motion.div>

        {/* Filtres et tri */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0">
            {/* Catégories */}
            <div className="flex flex-wrap gap-2">
              {categories.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  className="capitalize"
                >
                  {cat.label}
                </Button>
              ))}
            </div>

            {/* Tri et vue */}
            <div className="flex items-center space-x-4">
              {/* Tri */}
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>

              {/* Mode d'affichage */}
              <div className="flex border border-gray-300 rounded-md overflow-hidden">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-none"
                >
                  <Grid className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-none"
                >
                  <List className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Grille de produits */}
        {filteredProducts.length > 0 ? (
          <div className={`grid gap-6 ${
            viewMode === 'grid' 
              ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
              : 'grid-cols-1'
          }`}>
            {filteredProducts.map((product, index) => (
              <ProductCard 
                key={product.id} 
                product={product} 
                index={index}
              />
            ))}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="text-center py-16"
          >
            <div className="space-y-4">
              <Filter className="w-16 h-16 text-gray-400 mx-auto" />
              <h3 className="text-xl font-semibold text-gray-900">
                Aucun produit trouvé
              </h3>
              <p className="text-gray-600">
                Essayez de modifier vos filtres ou votre recherche
              </p>
              <Button
                onClick={() => {
                  setSelectedCategory('all');
                  setSortBy('name');
                }}
                variant="outline"
              >
                Réinitialiser les filtres
              </Button>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;