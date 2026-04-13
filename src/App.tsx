/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, 
  Instagram, 
  MapPin, 
  Clock, 
  Star, 
  Menu as MenuIcon, 
  X, 
  ChevronRight,
  UtensilsCrossed,
  ShoppingBag,
  ExternalLink
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Über uns', href: '#about' },
    { name: 'Speisekarte', href: '#menu' },
    { name: 'Bewertungen', href: '#testimonials' },
    { name: 'Kontakt', href: '#contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-md py-3 shadow-md' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex-shrink-0">
            <a href="#home" className="font-serif text-2xl font-bold tracking-tighter text-brand-primary">
              CASA HERDRINGEN
            </a>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-gray-800 hover:text-brand-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:029324955227"
                className="bg-brand-primary text-white px-5 py-2 rounded-full text-sm font-semibold hover:bg-red-800 transition-all shadow-lg hover:shadow-xl"
              >
                Jetzt anrufen
              </a>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-800 hover:text-brand-primary focus:outline-none"
            >
              {isOpen ? <X size={28} /> : <MenuIcon size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-gray-100 overflow-hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-gray-800 hover:text-brand-primary block px-3 py-4 text-base font-medium border-b border-gray-50"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="tel:029324955227"
                className="w-full text-center bg-brand-primary text-white block px-3 py-4 text-base font-bold mt-4"
              >
                02932 4955227
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const LiveStatus = () => {
  const [status, setStatus] = useState({ isOpen: false, text: '' });

  useEffect(() => {
    const checkStatus = () => {
      const now = new Date();
      const hour = now.getHours();
      const isOpen = hour >= 11 && hour < 22;
      
      if (isOpen) {
        setStatus({ isOpen: true, text: 'Geöffnet · Schließt um 22:00' });
      } else {
        setStatus({ isOpen: false, text: 'Geschlossen · Öffnet um 11:00' });
      }
    };

    checkStatus();
    const interval = setInterval(checkStatus, 60000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex items-center gap-2 font-medium text-sm">
      <span className={`relative flex h-3 w-3`}>
        <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${status.isOpen ? 'bg-green-400' : 'bg-red-400'} opacity-75`}></span>
        <span className={`relative inline-flex rounded-full h-3 w-3 ${status.isOpen ? 'bg-green-500' : 'bg-red-500'}`}></span>
      </span>
      <span className={status.isOpen ? 'text-green-700' : 'text-red-700'}>{status.text}</span>
    </div>
  );
};

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&q=80&w=2070" 
          alt="Frische italienische Pizza" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-3xl"
        >
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md px-4 py-2 rounded-full mb-6 border border-white/20">
            <Star className="text-yellow-400 fill-yellow-400" size={16} />
            <span className="text-sm font-semibold">4,7 Sterne bei 64 Rezensionen</span>
          </div>
          
          <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight tracking-tighter">
            Echte italienische <br />
            <span className="text-brand-accent italic">Leidenschaft.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-gray-200 mb-10 max-w-xl leading-relaxed">
            Willkommen bei Casa Herdringen. Wir bringen den Geschmack Italiens direkt nach Arnsberg. Frische Zutaten, traditionelle Rezepte und viel Liebe.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a 
              href="tel:029324955227" 
              className="bg-brand-primary hover:bg-red-800 text-white px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2 shadow-xl"
            >
              <Phone size={20} />
              02932 4955227
            </a>
            <a 
              href="#menu" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 px-8 py-4 rounded-full text-lg font-bold transition-all flex items-center justify-center gap-2"
            >
              Speisekarte ansehen
              <ChevronRight size={20} />
            </a>
          </div>
          
          <div className="mt-12">
            <LiveStatus />
          </div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 10, 0] }}
        transition={{ repeat: Infinity, duration: 2 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center p-1">
          <div className="w-1 h-2 bg-white/50 rounded-full"></div>
        </div>
      </motion.div>
    </section>
  );
};

const Features = () => {
  const features = [
    { icon: <UtensilsCrossed />, title: 'Speisen vor Ort', desc: 'Genießen Sie unsere gemütliche Atmosphäre in Herdringen.' },
    { icon: <ShoppingBag />, title: 'Zum Mitnehmen', desc: 'Alle Gerichte auch frisch verpackt für Zuhause.' },
    { icon: <ExternalLink />, title: 'Online bestellen', desc: 'Bequem von der Couch aus Ihre Lieblingspizza ordern.' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="text-center group"
            >
              <div className="w-16 h-16 bg-brand-cream text-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-brand-primary group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                {f.icon}
              </div>
              <h3 className="font-serif text-2xl font-bold mb-4">{f.title}</h3>
              <p className="text-gray-600 leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const MenuHighlights = () => {
  const highlights = [
    { name: 'Pizza Chicken', price: '12,50 €', desc: 'Zartes Hähnchenbrustfilet, frische Paprika und hausgemachte Tomatensoße.', img: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Pizza Gambas', price: '14,50 €', desc: 'Frische Gambas, Knoblauch, Petersilie und feinster Mozzarella.', img: 'https://images.unsplash.com/photo-1593504049359-74330189a345?auto=format&fit=crop&q=80&w=1000' },
    { name: 'Pizza Margherita', price: '8,50 €', desc: 'Der Klassiker: Fruchtige Tomatensoße, Mozzarella und frisches Basilikum.', img: 'https://images.unsplash.com/photo-1574071318508-1cdbad80ad38?auto=format&fit=crop&q=80&w=1000' },
  ];

  return (
    <section id="menu" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Unsere Highlights</h2>
          <div className="w-24 h-1 bg-brand-primary mx-auto mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Entdecken Sie unsere beliebtesten Kreationen. Von klassisch bis modern – bei uns ist für jeden Geschmack etwas dabei.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {highlights.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white rounded-3xl overflow-hidden shadow-xl border border-gray-100"
            >
              <div className="h-64 overflow-hidden">
                <img 
                  src={item.img} 
                  alt={item.name} 
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <h3 className="font-serif text-2xl font-bold">{item.name}</h3>
                  <span className="text-brand-primary font-bold text-xl">{item.price}</span>
                </div>
                <p className="text-gray-600 mb-6">{item.desc}</p>
                <button className="w-full border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white font-bold py-3 rounded-xl transition-all">
                  Jetzt bestellen
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <p className="text-gray-500 italic mb-8">Preiskategorie: 10–20 € pro Person</p>
          <a href="#" className="inline-flex items-center gap-2 text-brand-primary font-bold text-lg hover:underline">
            Vollständige Speisekarte herunterladen (PDF)
            <ChevronRight size={20} />
          </a>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { 
      name: 'Ugur Çobanoglu', 
      stars: 5, 
      text: 'Endlich wieder eine Pizzeria im Ort. Obwohl es sehr voll war, war der Service super nett. Die Pizza mit Chicken und die mit Gambas war sehr lecker!' 
    },
    { 
      name: 'Katrin Garner', 
      stars: 5, 
      text: 'Wir waren einmal vor Ort und haben einmal liefern lassen: beides war super. Die Pizza ist total gut und das Team und der Service freundlich. Die Preise sind auch fair!' 
    },
    { 
      name: 'Google Highlights', 
      stars: 5, 
      text: '"Ein sehr leckerer Teig und leckere Soße." | "Super Nettes Team! Das Essen schmeckt super, egal was man bestellt." | "Die einzige Pizza, die mein Sohn isst."' 
    },
  ];

  return (
    <section id="testimonials" className="py-24 bg-white overflow-hidden relative">
      {/* Decorative Elements */}
      <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 bg-brand-cream rounded-full blur-3xl opacity-50"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-4">Was unsere Gäste sagen</h2>
          <div className="flex justify-center gap-1 mb-4">
            {[...Array(5)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={24} />)}
          </div>
          <p className="text-gray-600">4,7 Sterne basierend auf 64 Google-Rezensionen</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((r, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-brand-cream/30 p-8 rounded-3xl border border-brand-cream relative"
            >
              <div className="absolute -top-4 left-8 text-brand-primary opacity-20">
                <span className="text-6xl font-serif">“</span>
              </div>
              <p className="text-gray-700 italic mb-8 leading-relaxed relative z-10">
                {r.text}
              </p>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-brand-primary/10 rounded-full flex items-center justify-center text-brand-primary font-bold">
                  {r.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold">{r.name}</h4>
                  <div className="flex gap-0.5">
                    {[...Array(r.stars)].map((_, i) => <Star key={i} className="text-yellow-400 fill-yellow-400" size={12} />)}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <section id="contact" className="py-24 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-[3rem] shadow-2xl overflow-hidden grid lg:grid-cols-2">
          {/* Info Side */}
          <div className="p-12 lg:p-20 bg-brand-primary text-white">
            <h2 className="font-serif text-4xl md:text-5xl font-bold mb-8">Besuchen Sie uns</h2>
            <p className="text-red-100 mb-12 text-lg">
              Wir freuen uns darauf, Sie in der Casa Herdringen begrüßen zu dürfen. Ob für einen gemütlichen Abend oder eine schnelle Pizza zum Mitnehmen.
            </p>

            <div className="space-y-8">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Adresse</h4>
                  <p className="text-red-100">Dungestraße 25, 59757 Arnsberg</p>
                  <p className="text-red-200 text-sm mt-1">Plus Code: CXF7+4P Arnsberg</p>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Telefon</h4>
                  <a href="tel:029324955227" className="text-red-100 text-2xl font-bold hover:underline">
                    02932 4955227
                  </a>
                </div>
              </div>

              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Clock size={24} />
                </div>
                <div>
                  <h4 className="font-bold text-xl mb-1">Öffnungszeiten</h4>
                  <p className="text-red-100">Montag – Sonntag</p>
                  <p className="text-red-100 font-bold">11:00 – 22:00 Uhr</p>
                </div>
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-white/10 flex gap-6">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:scale-110 transition-transform">
                <Instagram size={32} />
              </a>
              <div className="flex items-center gap-2 text-sm text-red-100">
                Folgen Sie uns für tägliche Specials!
              </div>
            </div>
          </div>

          {/* Map Side */}
          <div className="h-[400px] lg:h-auto relative">
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2489.284687635674!2d7.96224!3d51.416!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47b96f8c7b8c7b8d%3A0x7b8c7b8c7b8c7b8d!2sDungestra%C3%9Fe%2025%2C%2059757%20Arnsberg!5e0!3m2!1sde!2sde!4v1620000000000!5m2!1sde!2sde" 
              className="absolute inset-0 w-full h-full border-0 grayscale contrast-125 opacity-80"
              allowFullScreen={true} 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-r from-brand-primary/10 to-transparent"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <h3 className="font-serif text-2xl font-bold text-brand-accent mb-2">CASA HERDRINGEN</h3>
            <p className="text-gray-400 text-sm">Traditionelle italienische Küche in Arnsberg.</p>
          </div>
          
          <div className="flex gap-8 text-sm font-medium">
            <a href="#" className="hover:text-brand-accent transition-colors">Impressum</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Datenschutz</a>
            <a href="#" className="hover:text-brand-accent transition-colors">Allgemeine Geschäftsbedingungen</a>
          </div>

          <div className="flex gap-4">
            <a href="https://instagram.com" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-primary transition-all">
              <Instagram size={20} />
            </a>
            <a href="tel:029324955227" className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-primary transition-all">
              <Phone size={20} />
            </a>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-white/5 text-center text-gray-500 text-xs">
          &copy; {new Date().getFullYear()} Casa Herdringen. Alle Rechte vorbehalten. Design & Entwicklung mit Leidenschaft.
        </div>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <MenuHighlights />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
