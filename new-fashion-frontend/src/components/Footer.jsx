
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* À propos */}
          <div className="space-y-4">
            <span className="text-2xl font-bold">New Fashion</span>
            <p className="text-gray-300 text-sm leading-relaxed">
              Votre boutique de mode en ligne, proposant des vêtements tendance 
              pour toute la famille avec des recommandations personnalisées.
            </p>
            <div className="flex space-x-4">
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.1 }}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Navigation</span>
            <div className="space-y-2">
              <Link
                to="/products"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Tous les produits
              </Link>
              <Link
                to="/products?category=homme"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Homme
              </Link>
              <Link
                to="/products?category=femme"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Femme
              </Link>
              <Link
                to="/products?category=enfant"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Enfant
                </Link>
              <Link
                to="/products?category=enfant"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Accessoire
              </Link>
            </div>
          </div>

          {/* Service client */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Service Client</span>
            <div className="space-y-2">
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                FAQ
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Livraison & Retours
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Guide des tailles
              </a>
              <a
                href="#"
                className="block text-gray-300 hover:text-white transition-colors text-sm"
              >
                Nous contacter
              </a>
            </div>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <span className="text-lg font-semibold">Contact</span>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">contact@newfashion.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">+243 80 886 58 86</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-4 h-4 text-gray-400" />
                <span className="text-gray-300 text-sm">Lubumbashi, RDC</span>
              </div>
            </div>
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-400 text-sm">
              © 2024 New Fashion. Tous droits réservés.
            </p>
            <div className="flex space-x-6">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Mentions légales
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                Politique de confidentialité
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors text-sm"
              >
                CGV
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
