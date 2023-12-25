import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import CustomModal from '../CustomModal/CustomModal';
import './card.css'; // Import the custom CSS file

const Card = ({ onTypeFilter, searchItem }) => {
  const [pokemonData, setPokemonData] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const containerRef = useRef(null);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        let url = `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`;

        if (selectedType) {
          const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
          const pokemonsOfType = response.data.pokemon.map((pokemon) => pokemon.pokemon);
          setPokemonData((prevData) => [...prevData, ...pokemonsOfType]);
        } else {
          const response = await axios.get(url);
          setPokemonData((prevData) => [...prevData, ...response.data.results]);
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching Pokemon data:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, [offset, selectedType]);

  useEffect(() => {
    const handleScroll = () => {
      const container = containerRef.current;
      if (container && container.scrollTop + container.clientHeight >= container.scrollHeight - 10 && !loading) {
        setOffset((prevOffset) => prevOffset + 20);
      }
    };

    const container = containerRef.current;
    container.addEventListener('scroll', handleScroll);

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, [loading]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const handleCardClick = async (pokemon) => {
    try {
      const response = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
      const types = response.data.types.map((type) => type.type.name);

      setSelectedPokemon({ ...pokemon, types });
      setModalIsOpen(true);
    } catch (error) {
      console.error('Error fetching Pokemon details:', error);
    }
  };

  const handleCloseModal = () => {
    setModalIsOpen(false);
  };

  useEffect(() => {
    if (selectedType) {
      const fetchDataByType = async () => {
        try {
          const response = await axios.get(`https://pokeapi.co/api/v2/type/${selectedType}`);
          const pokemonsOfType = response.data.pokemon.map((pokemon) => pokemon.pokemon);
          setPokemonData(pokemonsOfType);
        } catch (error) {
          console.error('Error fetching Pokemon data by type:', error);
        }
      };

      fetchDataByType();
    }
  }, [selectedType]);

  
  return (
    <div className="card-container" ref={containerRef}>
      {/* Render Pokemon Cards */}
      <div className="card-grid bg-dark">
        {pokemonData.map((pokemon) => (
          <div
            key={pokemon.name}
            className="card"
            onClick={() => handleCardClick(pokemon)}
            style={{
              borderRadius: '30px',
              border: '2px solid black',
              background: getRandomColor(),
            }}
          >
            <div className="card-content">
              <div className="card-info">
                <div className="card-body">
                  <h5 className="card-title text-light">{pokemon.name}</h5>
                  {selectedPokemon && selectedPokemon.name === pokemon.name && (
                    <div>
                      <h6>Types:</h6>
                      <ul>
                        {selectedPokemon.types.map((type, index) => (
                          <li key={index} style={{ color: 'white' }}>
                            {type}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
              <div className="card-image">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemon.url.split('/')[6]}.svg`}
                  alt={pokemon.name}
                />
              </div>
            </div>
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {/* Pokemon Modal */}
      <CustomModal isOpen={modalIsOpen} onRequestClose={handleCloseModal} selectedPokemon={selectedPokemon} />
    </div>
  );
};

export default Card;