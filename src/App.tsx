import { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, Scissors, Target, User, MessageCircle, 
  Camera, ChevronRight, Clock, MapPin, Plus, Minus 
} from 'lucide-react';

// --- COMPONENTE INTERACTIVO: ANTES Y DESPUÉS ---
const BeforeAfter = () => {
  const [sliderPos, setSliderPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = (e: any) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.pageX || (e.touches && e.touches[0].pageX)) - rect.left;
    const position = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPos(position);
  };

  return (
    <section className="py-32 bg-beauty-cream/30 px-8">
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-[10px] uppercase tracking-[0.4em] text-beauty-gold font-bold mb-4 italic">Resultados Reales</h2>
          <h3 className="text-5xl font-serif text-beauty-green italic">Transformaciones Visibles</h3>
        </div>

        <div 
          ref={containerRef}
          onMouseMove={handleMove}
          onTouchMove={handleMove}
          className="relative h-[600px] w-full rounded-[3rem] overflow-hidden shadow-[0_50px_100px_-20px_rgba(0,0,0,0.3)] cursor-col-resize select-none"
        >
          {/* Imagen Después */}
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=1200" 
              className="w-full h-full object-cover"
              alt="Después"
            />
            <div className="absolute bottom-10 right-10 bg-beauty-green/90 backdrop-blur-md text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest z-30">Después</div>
          </div>

          {/* Imagen Antes (Recortada por el slider) */}
          <div 
            className="absolute inset-0 overflow-hidden z-10" 
            style={{ width: `${sliderPos}%` }}
          >
            <img 
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=1200" 
              className="absolute h-full object-cover"
              style={{ width: `calc(100 * ${100 / sliderPos}vw)`, maxWidth: 'none', height: '600px' }}
              alt="Antes"
            />
            <div className="absolute bottom-10 left-10 bg-black/40 backdrop-blur-md text-white px-6 py-2 rounded-full text-[10px] font-bold uppercase tracking-widest">Antes</div>
          </div>

          {/* Línea Divisoria y Handle */}
          <div 
            className="absolute top-0 bottom-0 w-1 bg-white/50 backdrop-blur-sm z-20 shadow-[0_0_20px_rgba(0,0,0,0.5)]"
            style={{ left: `${sliderPos}%` }}
          >
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-beauty-gold/20">
              <div className="flex gap-1">
                <div className="w-1 h-4 bg-beauty-gold rounded-full" />
                <div className="w-1 h-4 bg-beauty-gold rounded-full" />
              </div>
            </div>
          </div>
        </div>
        <p className="text-center mt-10 text-gray-400 text-[10px] uppercase tracking-widest font-bold">Desliza para comparar el cambio</p>
      </div>
    </section>
  );
};

// --- COMPONENTE: PREGUNTAS FRECUENTES (FAQ) ---
const FAQ = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    { q: "¿La depilación láser es dolorosa?", a: "Nuestra tecnología Soprano Titanium™ cuenta con un sistema de enfriamiento avanzado que hace que el tratamiento sea prácticamente indoloro y muy confortable incluso en zonas sensibles." },
    { q: "¿Cuántas sesiones necesito?", a: "Depende de la zona y el tipo de piel, pero generalmente se recomiendan entre 6 a 8 sesiones para obtener resultados definitivos y duraderos." },
    { q: "¿Es seguro realizarse tratamientos en verano?", a: "Sí, contamos con protocolos específicos y tecnología que permite tratar pieles incluso en temporadas de sol, siempre siguiendo nuestras recomendaciones de cuidado post-sesión." },
    { q: "¿Tienen paquetes promocionales?", a: "Contamos con membresías exclusivas y paquetes personalizados que ofrecen descuentos significativos al combinar múltiples áreas o tratamientos." }
  ];

  return (
    <section className="py-32 bg-white px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-20">
          <h2 className="text-beauty-gold uppercase tracking-[0.4em] text-[10px] font-bold italic mb-4">Resolviendo Dudas</h2>
          <h3 className="text-5xl font-serif text-beauty-green italic">Preguntas Frecuentes</h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <div key={i} className="border-b border-gray-100 last:border-0">
              <button 
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                className="w-full py-8 flex justify-between items-center text-left group transition-all"
              >
                <span className={`text-xs font-bold uppercase tracking-[0.2em] transition-colors ${openIndex === i ? 'text-beauty-gold' : 'text-beauty-green group-hover:text-beauty-gold'}`}>
                  {faq.q}
                </span>
                {openIndex === i ? (
                  <Minus size={18} className="text-beauty-gold" />
                ) : (
                  <Plus size={18} className="text-beauty-green" />
                )}
              </button>
              <AnimatePresence>
                {openIndex === i && (
                  <motion.div 
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: "easeInOut" }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-gray-500 text-sm leading-relaxed max-w-2xl font-light">
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const App = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const servicios = [
    { n: "Depilación Láser", i: <Sparkles />, d: "Tecnología de última generación para una piel suave." },
    { n: "Bótox & Ácidos", i: <Scissors />, d: "Rejuvenecimiento facial con resultados naturales." },
    { n: "Criolipólisis", i: <Target />, d: "Eliminación de grasa localizada sin cirugía." },
    { n: "Faciales", i: <User />, d: "Limpieza profunda y nutrición para tu rostro." }
  ];

  return (
    <div className="min-h-screen font-sans selection:bg-beauty-gold selection:text-white bg-beauty-cream">
      {/* Barra de progreso */}
      <motion.div className="fixed top-0 left-0 right-0 h-1 bg-beauty-gold z-[60] origin-left" style={{ scaleX }} />

      {/* --- NAVBAR --- */}
      <nav className={`fixed w-full z-50 transition-all duration-500 px-8 ${
        isScrolled ? 'py-3 bg-white/80 backdrop-blur-lg shadow-lg' : 'py-6 bg-transparent'
      }`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-beauty-green rounded-full flex items-center justify-center text-beauty-gold shadow-inner group cursor-pointer">
              <span className="font-serif font-bold text-2xl group-hover:scale-110 transition-transform">B</span>
            </div>
            <div className="flex flex-col">
              <span className="font-bold tracking-[0.3em] text-beauty-green leading-none text-sm">BEAUTY<span className="text-beauty-gold">TIME</span></span>
              <span className="text-[8px] uppercase tracking-[0.2em] text-gray-400 font-bold">Clínica Estética</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-10 text-[10px] uppercase tracking-[0.2em] font-bold text-beauty-green">
            <a href="#servicios" className="hover:text-beauty-gold transition-colors">Tratamientos</a>
            <a href="#antes-despues" className="hover:text-beauty-gold transition-colors">Resultados</a>
            <a href="https://instagram.com" className="text-beauty-gold hover:scale-110 transition-transform"><Camera size={18} /></a>
            <button className="bg-beauty-green text-white px-8 py-3 rounded-full hover:bg-beauty-gold transition-all duration-300 shadow-xl">
              Cita Online
            </button>
          </div>
        </div>
      </nav>

      {/* --- HERO --- */}
      <section className="relative pt-40 pb-24 px-8 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <div className="flex items-center gap-2 mb-8 text-beauty-gold">
              <MapPin size={14} />
              <span className="text-[10px] uppercase tracking-[0.4em] font-bold">Sede Miraflores, Lima</span>
            </div>
            <h1 className="text-7xl md:text-8xl font-serif text-beauty-green leading-[0.85] mb-8">
              Tu belleza <br />
              <span className="italic text-beauty-gold font-normal">en equilibrio</span>
            </h1>
            <p className="text-gray-500 text-lg max-w-sm leading-relaxed mb-10 border-l-2 border-beauty-gold/30 pl-6">
              Expertos en medicina estética que priorizan la naturalidad y salud de tu piel.
            </p>
            <div className="flex flex-wrap gap-5">
              <button className="group bg-beauty-green text-white px-10 py-5 rounded-2xl font-bold flex items-center gap-3 hover:bg-opacity-95 transition-all shadow-2xl">
                Explorar Tratamientos <ChevronRight className="group-hover:translate-x-2 transition-transform" />
              </button>
              <div className="flex items-center gap-4 text-beauty-green">
                <div className="p-4 bg-white rounded-2xl shadow-sm"><Clock size={20} /></div>
                <div>
                  <p className="text-[10px] font-bold uppercase opacity-50 tracking-widest">Atención</p>
                  <p className="text-xs font-bold tracking-wider italic">9:00 AM - 8:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div className="relative" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 border-2 border-beauty-gold/20 rounded-full -z-10" />
            <div className="relative rounded-[4rem] overflow-hidden shadow-2xl border-[12px] border-white/50">
              <img 
                src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=1200" 
                className="w-full h-[550px] object-cover"
                alt="Clínica"
              />
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- SERVICIOS --- */}
      <section id="servicios" className="bg-white py-32 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-6">
            <div className="space-y-4">
              <h2 className="text-beauty-gold uppercase tracking-[0.4em] text-[10px] font-bold italic border-b border-beauty-gold/30 inline-block pb-2">Procedimientos</h2>
              <h3 className="text-5xl font-serif text-beauty-green italic">Excelencia Estética</h3>
            </div>
            <p className="text-gray-400 text-sm max-w-xs text-right font-light">Tecnología médica avanzada aplicada al cuidado de tu imagen personal.</p>
          </div>
          <div className="grid md:grid-cols-4 gap-8">
            {servicios.map((s, idx) => (
              <motion.div 
                key={idx}
                whileHover={{ y: -15 }}
                className="group p-10 rounded-[3rem] bg-beauty-cream/50 border border-transparent hover:border-beauty-gold/10 hover:bg-white transition-all duration-500 shadow-sm hover:shadow-2xl"
              >
                <div className="w-16 h-16 bg-white rounded-2xl shadow-inner flex items-center justify-center text-beauty-gold mb-8 group-hover:scale-110 transition-transform">
                  {s.i}
                </div>
                <h4 className="text-beauty-green font-bold text-xs uppercase tracking-[0.2em] mb-4">{s.n}</h4>
                <p className="text-gray-400 text-xs leading-relaxed mb-6 font-light">{s.d}</p>
                <div className="flex items-center gap-2 text-[10px] font-bold text-beauty-gold opacity-0 group-hover:opacity-100 transition-opacity">
                  VER MÁS <ChevronRight size={12} />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* --- ANTES Y DESPUÉS --- */}
      <div id="antes-despues">
        <BeforeAfter />
      </div>

      {/* --- FAQ --- */}
      <FAQ />

      {/* --- WHATSAPP FLOTANTE --- */}
      <motion.a 
        href="https://wa.link/clinicaesteticabeautytime"
        target="_blank"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-10 right-10 bg-[#128C7E] text-white pl-8 pr-6 py-5 rounded-[2rem] shadow-[0_20px_50px_rgba(18,140,126,0.4)] z-50 flex items-center gap-4 group backdrop-blur-md"
      >
        <div className="flex flex-col items-end">
          <span className="text-[9px] uppercase font-bold opacity-70 tracking-widest leading-none mb-1">Contacto Directo</span>
          <span className="text-sm font-bold">WhatsApp Online</span>
        </div>
        <div className="bg-white/20 p-2 rounded-xl">
          <MessageCircle size={24} />
        </div>
      </motion.a>
    </div>
  );
};

export default App;