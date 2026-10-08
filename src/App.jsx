
import { useGame } from "./context/GameContext";
import Flag from "./components/Flag";

// Componente principal del juego
function App() {

  // Obtengo el puntaje desde Context
  const { score } = useGame();

  return (
    <div>
      <h1>🌎 Adivinando las banderas</h1>

      <p>¿A qué país pertenece esta bandera?</p>

      {/* Muestro la bandera sin revelar el país */}
      <Flag />

      <input
        type="text"
        placeholder="Escribí el país"
      />

      <button>Adivinar</button>

      {/* Muestro el puntaje actual */}
      <h2>Puntaje: {score}</h2>
    </div>
  );
}

export default App;
