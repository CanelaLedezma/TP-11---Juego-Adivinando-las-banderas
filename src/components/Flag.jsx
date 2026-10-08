
import { useGame } from "../context/GameContext";

// Componente que muestra la bandera del país actual
function Flag() {

  // Obtengo el país seleccionado desde Context
  const { currentCountry } = useGame();

  // Mientras no haya un país, muestro este mensaje
  if (!currentCountry) {
    return <p>Cargando bandera...</p>;
  }

  return (
    <div>
      {/* Muestro la imagen de la bandera */}
      <img
        src={currentCountry.flag}
        alt="Bandera para adivinar"
        width="250"
      />
    </div>
  );
}

export default Flag;
