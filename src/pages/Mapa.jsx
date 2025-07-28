import SvgMapa from "../components/SvgMapa";
import TablaInfo from "../components/TablaInfo";
import Filtros from "../components/Filtros";

const Mapa = () => (
  <div className="container mx-auto p-4">
    <div className="informacion bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-3xl md:text-4xl font-extrabold text-center text-blue-600 mb-6">
        Bienvenidos al Mapa de Red y Derivación Médica del Servicio de Salud Maule
      </h2>

      <p className="text-gray-700 leading-relaxed mb-4">
        Enfrentamos el desafío de optimizar la gestión de derivaciones médicas en la Región del Maule. Nuestra plataforma digital interactiva te permite visualizar fácilmente la disponibilidad actualizada de especialidades médicas en los centros hospitalarios de la región.
      </p>

      <p className="text-gray-700 leading-relaxed mb-4">
        Consulta rápidamente qué establecimientos cuentan con la especialidad que necesitas y toma decisiones informadas para derivar pacientes de manera eficiente, evitando retrasos y errores.
      </p>

      <ul className="list-disc list-inside text-gray-700 mb-4 space-y-2">
        <li>Un mapa interactivo y fácil de usar.</li>
        <li>Información actualizada directamente desde el Servicio de Salud Maule.</li>
        <li>Búsqueda intuitiva por especialidades y comunas.</li>
        <li>Base de datos dinámica y continuamente actualizada.</li>
        <li>Próximamente: sugerencias automáticas del centro más adecuado según criterios geográficos y de red.</li>
      </ul>
    </div>

    <div className="filtro mb-6">
      <Filtros />
    </div>

    <div className="svgContainer mapa mb-6">
      <SvgMapa />
    </div>

    <div className="map-container tabla">
      <TablaInfo />
    </div>
  </div>
);

export default Mapa;