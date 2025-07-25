
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { CreditCard, Truck, Shield, Check, Smartphone, UserCircle as CircleUser } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { toast } from '@/components/ui/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const paymentMethods = [
  { id: 'credit-card', name: 'Carte de crédit', icon: CreditCard },
  { id: 'paypal', name: 'PayPal', icon: CircleUser },
  { id: 'orange-money', name: 'Orange Money', icon: Smartphone },
  { id: 'airtel-money', name: 'Airtel Money', icon: Smartphone },
];

const CheckoutPage = () => {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  
  const [formData, setFormData] = useState({
    email: user?.email || '',
    firstName: user?.name?.split(' ')[0] || '',
    lastName: user?.name?.split(' ')[1] || '',
    address: '',
    city: '',
    postalCode: '',
    country: 'France',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: '',
  });

  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsProcessing(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 2000));

      const order = {
        id: Date.now().toString(),
        items: items,
        total: getTotalPrice() + (getTotalPrice() >= 50 ? 0 : 4.99),
        customerInfo: formData,
        paymentMethod: paymentMethod,
        status: 'confirmed',
        date: new Date().toISOString(),
      };

      const orders = JSON.parse(localStorage.getItem('newFashionOrders') || '[]');
      orders.push(order);
      localStorage.setItem('newFashionOrders', JSON.stringify(orders));

      clearCart();
      
      toast({
        title: "Commande confirmée !",
        description: `Votre commande #${order.id} a été passée avec succès`,
      });

      navigate('/profile', { state: { orderConfirmed: true } });
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Une erreur est survenue lors du traitement de votre commande",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  const subtotal = getTotalPrice();
  const shipping = subtotal >= 50 ? 0 : 4.99;
  const total = subtotal + shipping;

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit-card':
        return (
          <div className="space-y-4">
            <div>
              <Label htmlFor="cardName">Nom sur la carte</Label>
              <Input id="cardName" name="cardName" value={formData.cardName} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="cardNumber">Numéro de carte</Label>
              <Input id="cardNumber" name="cardNumber" placeholder="1234 5678 9012 3456" value={formData.cardNumber} onChange={handleInputChange} required />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="expiryDate">Date d'expiration</Label>
                <Input id="expiryDate" name="expiryDate" placeholder="MM/AA" value={formData.expiryDate} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="cvv">CVV</Label>
                <Input id="cvv" name="cvv" placeholder="123" value={formData.cvv} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="flex items-center space-x-2 text-sm text-gray-600 bg-gray-50 p-3 rounded-md">
              <Shield className="w-4 h-4" />
              <span>Vos informations de paiement sont sécurisées</span>
            </div>
          </div>
        );
      case 'paypal':
        return (
          <div className="text-center space-y-4 py-8">
            <p className="text-gray-600">Vous serez redirigé vers PayPal pour finaliser votre achat.</p>
            <Button size="lg" className="bg-[#003087] hover:bg-[#00296b] text-white">Payer avec PayPal</Button>
          </div>
        );
      case 'orange-money':
      case 'airtel-money':
        return (
          <div className="space-y-4">
             <p className="text-sm text-gray-600">
              Veuillez saisir votre numéro de téléphone pour recevoir les instructions de paiement.
            </p>
            <div>
              <Label htmlFor="mobile-money-phone">Numéro de téléphone</Label>
              <Input id="mobile-money-phone" type="tel" placeholder="+243 XXX XXX XXX" required />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Helmet>
        <title>Commande - New Fashion</title>
        <meta name="description" content="Finalisez votre commande New Fashion" />
      </Helmet>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1 className="text-3xl lg:text-4xl font-bold text-black mb-4">
            Finaliser ma commande
          </h1>
        </motion.div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2"><Truck className="w-5 h-5" /><span>Informations de livraison</span></CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><Label htmlFor="firstName">Prénom</Label><Input id="firstName" name="firstName" value={formData.firstName} onChange={handleInputChange} required /></div>
                      <div><Label htmlFor="lastName">Nom</Label><Input id="lastName" name="lastName" value={formData.lastName} onChange={handleInputChange} required /></div>
                    </div>
                    <div><Label htmlFor="email">Email</Label><Input id="email" name="email" type="email" value={formData.email} onChange={handleInputChange} required /></div>
                    <div><Label htmlFor="phone">Téléphone</Label><Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleInputChange} required /></div>
                    <div><Label htmlFor="address">Adresse</Label><Input id="address" name="address" value={formData.address} onChange={handleInputChange} required /></div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div><Label htmlFor="city">Ville</Label><Input id="city" name="city" value={formData.city} onChange={handleInputChange} required /></div>
                      <div><Label htmlFor="postalCode">Code postal</Label><Input id="postalCode" name="postalCode" value={formData.postalCode} onChange={handleInputChange} required /></div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2"><CreditCard className="w-5 h-5" /><span>Paiement</span></CardTitle>
                  </CardHeader>
                  <CardContent>
                    <Tabs value={paymentMethod} onValueChange={setPaymentMethod} className="w-full">
                      <TabsList className="grid w-full grid-cols-2 md:grid-cols-4">
                        {paymentMethods.map(method => (
                          <TabsTrigger key={method.id} value={method.id} className="flex items-center gap-2">
                            <method.icon className="w-4 h-4" />
                            {method.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                      <div className="pt-6">
                        {renderPaymentForm()}
                      </div>
                    </Tabs>
                  </CardContent>
                </Card>
              </motion.div>
            </div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="lg:col-span-1"
            >
              <Card className="sticky top-8">
                <CardHeader><CardTitle>Résumé de commande</CardTitle></CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3 max-h-60 overflow-y-auto">
                    {items.map((item) => (
                      <div key={item.cartId} className="flex items-center space-x-3">
                        <div className="w-12 h-12 rounded-md overflow-hidden bg-gray-100 flex-shrink-0">
                          <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-black truncate">{item.name}</p>
                          <p className="text-xs text-gray-600">Taille: {item.size} • Qté: {item.quantity}</p>
                        </div>
                        <div className="text-sm font-medium">{(item.price * item.quantity).toFixed(2)} €</div>
                      </div>
                    ))}
                  </div>
                  <div className="border-t border-gray-200 pt-4 space-y-2">
                    <div className="flex justify-between text-sm"><span className="text-gray-600">Sous-total</span><span>{subtotal.toFixed(2)} €</span></div>
                    <div className="flex justify-between text-sm"><span className="text-gray-600">Livraison</span><span>{shipping === 0 ? 'Gratuite' : `${shipping.toFixed(2)} €`}</span></div>
                    <div className="flex justify-between text-lg font-bold border-t border-gray-200 pt-2"><span>Total</span><span>{total.toFixed(2)} €</span></div>
                  </div>
                  <Button type="submit" size="lg" className="w-full" disabled={isProcessing}>
                    {isProcessing ? (
                      <div className="flex items-center space-x-2">
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Traitement...</span>
                      </div>
                    ) : (
                      <div className="flex items-center space-x-2">
                        <Check className="w-5 h-5" />
                        <span>Confirmer la commande - {total.toFixed(2)} €</span>
                      </div>
                    )}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CheckoutPage;
