import React, { useState, useEffect } from 'react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);

  // Sample items
  const items = [
    'Pizza',
    'Burger',
    'Pasta',
    'Sandwich',
    'Fries',
    'Ice Cream',
    'Salad',
    'Sushi',
    // Add more items as needed
  ];

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems([]);
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery]);

  return (
    <div style={{ padding: '20px',top:"2rem" }}>
      <input
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
      />
      {filteredItems.length > 0 && (
        <div style={{ border: '1px solid #ccc', marginTop: '10px', maxHeight: '200px', overflowY: 'auto' }}>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {filteredItems.map((item, index) => (
              <li key={index} style={{ padding: '10px', cursor: 'pointer' }}>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
