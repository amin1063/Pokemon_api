import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';

const CustomModal = ({ isOpen, onRequestClose, selectedPokemon }) => {
  const [pokemonDetails, setPokemonDetails] = useState(null);

  useEffect(() => {
    const fetchPokemonDetails = async () => {
      if (selectedPokemon) {
        try {
          const response = await fetch(selectedPokemon.url);
          const data = await response.json();
          setPokemonDetails(data);
        } catch (error) {
          console.error('Error fetching Pokemon details:', error);
        }
      }
    };

    fetchPokemonDetails();
  }, [selectedPokemon]);

  useEffect(() => {
    const handleBodyScroll = () => {
      document.body.style.overflow = isOpen ? 'hidden' : 'visible';
    };

    handleBodyScroll();

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose} className="modal-dialog modal-dialog-centered">
      {pokemonDetails && (
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{pokemonDetails.name}</h5>
            <button type="button" className="btn-close" aria-label="Close" onClick={onRequestClose}></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-6">
                <img
                  src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${pokemonDetails.id}.svg`}
                  className="img-fluid"
                  alt={pokemonDetails.name}
                />
              </div>
              <div className="col-md-6">
                <p>ID: {pokemonDetails.id}</p>
                <div className="stat-bar">
                  <p>HP: {pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat}</p>
                  <div className="progress">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat}%`,
                      }}
                      aria-valuenow={pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {pokemonDetails.stats.find(stat => stat.stat.name === 'hp').base_stat}%
                    </div>
                  </div>
                </div>
                <div className="stat-bar">
                  <p>Attack: {pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat}</p>
                  <div
                    className="progress"
                    style={{ width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat}%` }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat}%`,
                      }}
                      aria-valuenow={pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {pokemonDetails.stats.find(stat => stat.stat.name === 'attack').base_stat}%
                    </div>
                  </div>
                </div>
                <div className="stat-bar">
                  <p>Defense: {pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat}</p>
                  <div
                    className="progress"
                    style={{ width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat}%` }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat}%`,
                      }}
                      aria-valuenow={pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {pokemonDetails.stats.find(stat => stat.stat.name === 'defense').base_stat}%
                    </div>
                  </div>
                </div>
                <div className="stat-bar">
                  <p>Special Attack: {pokemonDetails.stats.find(stat => stat.stat.name === 'special-attack').base_stat}</p>
                  <div
                    className="progress"
                    style={{
                      width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'special-attack').base_stat}%`,
                    }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'special-attack').base_stat}%`,
                      }}
                      aria-valuenow={pokemonDetails.stats.find(stat => stat.stat.name === 'special-attack').base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {pokemonDetails.stats.find(stat => stat.stat.name === 'special-attack').base_stat}%
                    </div>
                  </div>
                </div>
                <div className="stat-bar">
                  <p>Special Defense: {pokemonDetails.stats.find(stat => stat.stat.name === 'special-defense').base_stat}</p>
                  <div
                    className="progress"
                    style={{
                      width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'special-defense').base_stat}%`,
                    }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'special-defense').base_stat}%`,
                      }}
                      aria-valuenow={pokemonDetails.stats.find(stat => stat.stat.name === 'special-defense').base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {pokemonDetails.stats.find(stat => stat.stat.name === 'special-defense').base_stat}%
                    </div>
                  </div>
                </div>
                <div className="stat-bar">
                  <p>Speed: {pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat}</p>
                  <div
                    className="progress"
                    style={{ width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat}%` }}
                  >
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{
                        width: `${pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat}%`,
                      }}
                      aria-valuenow={pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat}
                      aria-valuemin="0"
                      aria-valuemax="100"
                    >
                      {pokemonDetails.stats.find(stat => stat.stat.name === 'speed').base_stat}%
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-secondary" onClick={onRequestClose}>
              Close
            </button>
          </div>
        </div>
      )}
    </Modal>
  );
};

export default CustomModal;
