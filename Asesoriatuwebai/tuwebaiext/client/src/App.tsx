import { Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Corporativos from './pages/corporativos';
import UXUI from './pages/uxui';
import Ecommerce from './pages/ecommerce';
import Consulta from './pages/consulta';
import NotFound from './pages/not-found';
// Importaciones de páginas de servicios
import ConsultoriaEstrategica from './pages/consultoria-estrategica';
import DesarrolloWebProfesional from './pages/desarrollo-web-profesional';
import MarketingDigitalYSeo from './pages/marketing-digital-y-seo';
import ConversionCRO from './pages/conversion-cro';
import AutomatizacionMarketing from './pages/automatizacion-marketing';
// Páginas legales
import PoliticaPrivacidad from './pages/politica-privacidad';
import TerminosCondiciones from './pages/terminos-condiciones';
// Componentes UI
import Footer from './components/ui/footer';
import Chatbot from './components/ui/chatbot';
import { Toaster } from "@/components/ui/toaster";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/corporativos" element={<Corporativos />} />
        <Route path="/uxui" element={<UXUI />} />
        <Route path="/ecommerce" element={<Ecommerce />} />
        <Route path="/consulta" element={<Consulta />} />
        <Route path="/consultoria-estrategica" element={<ConsultoriaEstrategica />} />
        <Route path="/desarrollo-web-profesional" element={<DesarrolloWebProfesional />} />
        <Route path="/marketing-digital-y-seo" element={<MarketingDigitalYSeo />} />
        <Route path="/conversion-cro" element={<ConversionCRO />} />
        <Route path="/automatizacion-marketing" element={<AutomatizacionMarketing />} />
        <Route path="/politica-privacidad" element={<PoliticaPrivacidad />} />
        <Route path="/terminos-condiciones" element={<TerminosCondiciones />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
      <Chatbot />
      <Toaster />
    </>
  );
}

export default App;
