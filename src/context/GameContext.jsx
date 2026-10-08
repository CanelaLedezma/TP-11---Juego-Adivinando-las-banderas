
import { createContext, useContext, useState, useEffect } from "react";

// Creo el contexto para compartir los datos del juego
const GameContext = createContext();

export function GameProvider({ children }) {

  // Guardo los países que recibo de la API
  const [countries, setCountries] = useState([]);

  // Guardo el país que hay que adivinar
  const [currentCountry, setCurrentCountry] = useState(null);

  // Guardo el puntaje del jugador
  const [score, setScore] = useState(0);

  // Selecciono un país al azar
  function nextCountry(countryList = countries) {
    if (countryList.length === 0) return;

    const randomIndex = Math.floor(Math.random() * countryList.length);
    setCurrentCountry(countryList[randomIndex]);
  }

  // Compruebo si la respuesta del jugador es correcta
  function checkGuess(guess) {
    if (!currentCountry || !guess.trim()) return;

    // Comparo sin distinguir mayúsculas ni espacios
    const answer = guess.trim().toLowerCase();
    const correctCountry = currentCountry.name.trim().toLowerCase();

    if (answer === correctCountry) {

      // Si acierta, sumo 10 puntos y cambio de bandera
      setScore((previousScore) => previousScore + 10);
      nextCountry();

      return true;
    } else {

      // Si falla, resto 1 punto
      setScore((previousScore) => previousScore - 1);

      return false;
    }
  }

  // Pido los países a la API al iniciar la aplicación
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((response) => response.json())
      .then((result) => {

        // Verifico que la respuesta contenga países
        if (result.error === false && Array.isArray(result.data)) {
          setCountries(result.data);
          nextCountry(result.data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener países:", error);
      });
  }, []);

  // Comparto los estados y funciones del juego
  return (
    <GameContext.Provider value={{
      countries,
      currentCountry,
      score,
      nextCountry,
      checkGuess
    }}>
      {children}
    </GameContext.Provider>
  );
}

// Hook para acceder a los datos del juego
export function useGame() {
  return useContext(GameContext);
}
