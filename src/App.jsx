import Header from './components/Header'
import Mapa from './pages/Mapa'
import Footer from './components/Footer'
import "./index.css";
import { MapaProvider } from './context/MapaProvider';
import Filtros from './components/Filtros';


function App() {

  return (
    <>
      <Header />
      <MapaProvider>
        <Filtros/>
        <Mapa />
      </MapaProvider>
      <Footer />
    </>
  )
}

export default App
