import Navbar from './Navbar';
import Footer from './Footer';
import CartDrawer from '../cart/CartDrawer';
import WhatsAppChat from '../ui/WhatsAppChat';

export default function PageWrapper({ children }) {
  return (
    <div className="min-h-screen bg-cream flex flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
      <CartDrawer />
      <WhatsAppChat />
    </div>
  );
}
