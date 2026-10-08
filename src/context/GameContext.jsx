
import { createContext, useContext, useState, useEffect } from "react";

// Creo el contexto para compartir los datos del juego
const GameContext = createContext();

export function GameProvider({ children }) {

  // Lista de países que llega desde la API
  const [countries, setCountries] = useState([]);

  // País que el jugador tiene que adivinar
  const [currentCountry, setCurrentCountry] = useState(null);

  // Puntaje actual del jugador
  const [score, setScore] = useState(0);

  // Elijo un país al azar de una lista
  function nextCountry(countryList = countries) {
    if (countryList.length === 0) return;

    // Genero una posición aleatoria de la lista
    const randomIndex = Math.floor(Math.random() * countryList.length);

    // Guardo el país que está en esa posición
    setCurrentCountry(countryList[randomIndex]);
  }

  // Traigo los países cuando se inicia la aplicación
  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/flag/images")
      .then((response) => response.json())
      .then((result) => {

        // Compruebo que la API devolvió una lista válida
        if (result.error === false && Array.isArray(result.data)) {
          setCountries(result.data);

          // Elijo el primer país apenas recibo la lista
          nextCountry(result.data);

          console.log("Países obtenidos:", result.data);
        }
      })
      .catch((error) => {
        console.error("Error al obtener países:", error);
      });
  }, []);

  // Comparto los datos y funciones del juego
  return (
    <GameContext.Provider value={{
      countries,
      currentCountry,
      score,
      nextCountry
    }}>
      {children}
    </GameContext.Provider>
  );
}

// Hook para usar el contexto desde otros componentes
export function useGame() {
  return useContext(GameContext);
}
