
import { useGame } from "./context/GameContext";
import Flag from "./components/Flag";
import GuessForm from "./components/GuessForm";

// Pantalla principal del juego
function App() {

  // Obtengo el puntaje desde el contexto
 const { currentCountry, score } = useGame();

  return (
    <div>
      <h1>🌎 Adivinando las banderas</h1>

      <p>¿A qué país pertenece esta bandera?</p>

      {/* Bandera que hay que adivinar */}
      <Flag />
<p>Respuesta de prueba: {currentCountry?.name}</p>
      {/* Formulario para escribir la respuesta */}
      <GuessForm />

      <h2>Puntaje: {score}</h2>
    </div>
  );
}

export default App;
