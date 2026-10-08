
import { useState } from "react";
import { useGame } from "../context/GameContext";

function GuessForm() {

  // Guardo lo que escribe el jugador
  const [guess, setGuess] = useState("");

  // Obtengo la función del contexto
  const { checkGuess } = useGame();

  // Se ejecuta cuando el jugador envía la respuesta
  function handleSubmit(event) {
    event.preventDefault();

    // Evito enviar respuestas vacías
    if (!guess.trim()) return;

    // Compruebo la respuesta con la lógica del contexto
    const isCorrect = checkGuess(guess);

    if (isCorrect) {
      console.log("¡Respuesta correcta!");
    } else {
      console.log("Respuesta incorrecta");
    }

    // Limpio el campo después de responder
    setGuess("");
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo donde el jugador escribe el país */}
      <input
        type="text"
        placeholder="Escribí el país"
        value={guess}
        onChange={(event) => setGuess(event.target.value)}
      />

      {/* Botón para comprobar la respuesta */}
      <button type="submit">Adivinar</button>
    </form>
  );
}

export default GuessForm;
