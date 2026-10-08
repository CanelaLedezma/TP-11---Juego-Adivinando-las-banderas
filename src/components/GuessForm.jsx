
import { useState } from "react";

// Componente donde el jugador escribe su respuesta
function GuessForm() {

  // Guardo lo que el usuario escribe en el input
  const [guess, setGuess] = useState("");

  // Se ejecuta cuando el jugador envía su respuesta
  function handleSubmit(event) {
    event.preventDefault();

    // Por ahora muestro la respuesta en la consola
    console.log("Respuesta del jugador:", guess);
  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Campo para escribir el país */}
      <input
        type="text"
        placeholder="Escribí el país"
        value={guess}
        onChange={(event) => setGuess(event.target.value)}
      />

      {/* Envía el formulario */}
      <button type="submit">Adivinar</button>
    </form>
  );
}

export default GuessForm;
