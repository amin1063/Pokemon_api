import React, { useEffect, useState } from 'react';

const Navbar = ({ onTypeFilter, setSearchItem, searchItem }) => {
  const [pokemonTypes, setPokemonTypes] = useState([]);
  const [selectedType, setSelectedType] = useState(null);

  useEffect(() => {
    const fetchPokemonTypes = async () => {
      try {
        const response = await fetch('https://pokeapi.co/api/v2/type/');
        const data = await response.json();
        setPokemonTypes(data.results);
      } catch (error) {
        console.error('Error fetching Pokemon types:', error);
      }
    };

    fetchPokemonTypes();
  }, []);

  const handleTypeClick = (type) => {
    // Pass the selected type to the parent component for filtering
    onTypeFilter(type);
    // Set the selected type in the state
    setSelectedType(type);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSearchItem(e.target[0].value);
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-danger">
      <div className="container-fluid align-items-center">
        <div className="position-relative align-items-center" style={{ left: '50%', transform: 'translateX(-50%)' }}>
          <form className="form-inline" onSubmit={handleSubmit}>
            <input
              className="form-control mr-sm-2"
              type="text"
              value={searchItem}
              onChange={(e) => setSearchItem(e.target.value)}
              placeholder="Search"
              style={{ width: '100%' }}
            />
          </form>
        </div>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <div className="nav-item dropdown ml-auto">
            <button className="nav-link dropdown-toggle" id="basic-nav-dropdown" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              {selectedType ? selectedType : 'Type'}
            </button>
            <div className="dropdown-menu dropdown-menu-right" aria-labelledby="basic-nav-dropdown">
              {pokemonTypes.map((type, index) => (
                <a
                  key={index}
                  className="dropdown-item"
                  href={`#type/${type.name}`}
                  onClick={() => handleTypeClick(type.name)}
                >
                  {type.name}
                </a>
              ))}
              <div className="dropdown-divider"></div>
              
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
