import "./index.css";
import Header from './components/Header'
import Mapa from './pages/Mapa'
import Footer from './components/Footer'
import 'bootstrap/dist/css/bootstrap.min.css';
import { MapaProvider } from './context/MapaProvider';


function App() {

  return (
    <>
      <Header />
      <MapaProvider>
        <Mapa />
      </MapaProvider>
      <Footer />
    </>
  )
}

export default App
