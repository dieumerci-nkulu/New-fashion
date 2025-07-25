
export const products = [
  // Homme
  {
    id: 1,
    name: "T-shirt Premium Noir",
    price: 29.99,
    category: "homme",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500&h=600&fit=crop",
    description: "T-shirt en coton bio de qualité supérieure, coupe moderne et confortable.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Noir", "Blanc", "Gris"],
    tags: ["casual", "coton", "bio"],
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Jean Slim Fit",
    price: 79.99,
    category: "homme",
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=500&h=600&fit=crop",
    description: "Jean slim fit en denim stretch, parfait pour un look moderne et décontracté.",
    sizes: ["30", "32", "34", "36", "38"],
    colors: ["Bleu foncé", "Noir", "Bleu clair"],
    tags: ["denim", "slim", "stretch"],
    rating: 4.3,
    reviews: 89
  },
  {
    id: 3,
    name: "Chemise Blanche Classique",
    price: 59.99,
    category: "homme",
    image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=500&h=600&fit=crop",
    description: "Chemise blanche intemporelle, parfaite pour le bureau ou les occasions spéciales.",
    sizes: ["S", "M", "L", "XL", "XXL"],
    colors: ["Blanc", "Bleu clair", "Rose pâle"],
    tags: ["formel", "coton", "classique"],
    rating: 4.7,
    reviews: 156
  },
  {
    id: 4,
    name: "Sweat à Capuche Gris",
    price: 49.99,
    category: "homme",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=500&h=600&fit=crop",
    description: "Sweat à capuche confortable en molleton, idéal pour les journées décontractées.",
    sizes: ["S", "M", "L", "XL"],
    colors: ["Gris", "Noir", "Marine"],
    tags: ["casual", "molleton", "capuche"],
    rating: 4.4,
    reviews: 92
  },

  // Femme
  {
    id: 5,
    name: "Robe Noire Élégante",
    price: 89.99,
    category: "femme",
    image: "https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&h=600&fit=crop",
    description: "Robe noire sophistiquée, parfaite pour les soirées et événements spéciaux.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Noir", "Marine", "Bordeaux"],
    tags: ["élégant", "soirée", "polyester"],
    rating: 4.8,
    reviews: 203
  },
  {
    id: 6,
    name: "Blouse Blanche Fluide",
    price: 45.99,
    category: "femme",
    image: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500&h=600&fit=crop",
    description: "Blouse fluide et légère, idéale pour un look professionnel et féminin.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Blanc", "Crème", "Rose poudré"],
    tags: ["professionnel", "fluide", "viscose"],
    rating: 4.6,
    reviews: 134
  },
  {
    id: 7,
    name: "Jean Taille Haute",
    price: 69.99,
    category: "femme",
    image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?w=500&h=600&fit=crop",
    description: "Jean taille haute flatteuse, coupe moderne et confortable.",
    sizes: ["25", "26", "27", "28", "29", "30"],
    colors: ["Bleu foncé", "Noir", "Bleu délavé"],
    tags: ["taille haute", "denim", "moderne"],
    rating: 4.5,
    reviews: 167
  },
  {
    id: 8,
    name: "Pull en Cachemire",
    price: 129.99,
    category: "femme",
    image: "https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=500&h=600&fit=crop",
    description: "Pull luxueux en cachemire, douceur et élégance garanties.",
    sizes: ["XS", "S", "M", "L"],
    colors: ["Beige", "Gris", "Rose"],
    tags: ["luxe", "cachemire", "doux"],
    rating: 4.9,
    reviews: 78
  },

  // Enfant
  {
    id: 9,
    name: "T-shirt Coloré Enfant",
    price: 19.99,
    category: "enfant",
    image: "https://images.unsplash.com/photo-1503944583220-79d8926ad5e2?w=500&h=600&fit=crop",
    description: "T-shirt amusant et coloré pour enfants, en coton doux et résistant.",
    sizes: ["2-3 ans", "4-5 ans", "6-7 ans", "8-9 ans", "10-11 ans"],
    colors: ["Multicolore", "Bleu", "Rouge"],
    tags: ["enfant", "coloré", "coton"],
    rating: 4.7,
    reviews: 145
  },
  {
    id: 10,
    name: "Pantalon Confort Enfant",
    price: 34.99,
    category: "enfant",
    image: "https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?w=500&h=600&fit=crop",
    description: "Pantalon confortable pour enfants, parfait pour jouer et bouger.",
    sizes: ["2-3 ans", "4-5 ans", "6-7 ans", "8-9 ans"],
    colors: ["Marine", "Gris", "Kaki"],
    tags: ["confort", "jeu", "résistant"],
    rating: 4.4,
    reviews: 98
  },
  {
    id: 11,
    name: "Robe Princesse",
    price: 39.99,
    category: "enfant",
    image: "https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?w=500&h=600&fit=crop",
    description: "Robe de princesse pour petites filles, parfaite pour les occasions spéciales.",
    sizes: ["2-3 ans", "4-5 ans", "6-7 ans", "8-9 ans"],
    colors: ["Rose", "Violet", "Bleu ciel"],
    tags: ["princesse", "fête", "tulle"],
    rating: 4.8,
    reviews: 112
  },
  {
    id: 12,
    name: "Sweat Capuche Enfant",
    price: 29.99,
    category: "enfant",
    image: "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=500&h=600&fit=crop",
    description: "Sweat à capuche douillet pour enfants, idéal pour les journées fraîches.",
    sizes: ["2-3 ans", "4-5 ans", "6-7 ans", "8-9 ans", "10-11 ans"],
    colors: ["Gris", "Marine", "Rouge"],
    tags: ["capuche", "chaud", "molleton"],
    rating: 4.6,
    reviews: 87
  }
];

export const getProductById = (id) => {
  return products.find(product => product.id === parseInt(id));
};

export const getProductsByCategory = (category) => {
  if (category === 'all') return products;
  return products.filter(product => product.category === category);
};

export const getRecommendations = (productId, limit = 3) => {
  const currentProduct = getProductById(productId);
  if (!currentProduct) return [];

  // Filtrage collaboratif simple basé sur la catégorie et les tags
  const recommendations = products
    .filter(product => 
      product.id !== productId && 
      (product.category === currentProduct.category ||
       product.tags.some(tag => currentProduct.tags.includes(tag)))
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit);

  return recommendations;
};

export const searchProducts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return products.filter(product =>
    product.name.toLowerCase().includes(lowercaseQuery) ||
    product.description.toLowerCase().includes(lowercaseQuery) ||
    product.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};
