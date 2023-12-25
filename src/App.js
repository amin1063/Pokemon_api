// App.js
import Navbar from './component/Navbar';
import Card from './component/card/Card';
import { useState } from 'react';
function App() {
  const [searchItem, setSearchItem] = useState('');
  const [selectedType, setSelectedType] = useState('');

  const handleTypeFilter = (type) => {
    // Handle type filtering logic
    setSelectedType(type);
  };

  return (
    <div>
      <Navbar onTypeFilter={handleTypeFilter} setSearchItem={setSearchItem} searchItem={searchItem} />
      <Card selectedType={selectedType} searchItem={searchItem} />
    </div>
  );
}

export default App;
