import React, { useState, useEffect } from 'react';

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredItems, setFilteredItems] = useState([]);
  const [items, setItems] = useState([]); // State to hold all items
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch('http://localhost:4000/api/shop/items'); // Ensure this endpoint is correct
        if (!response.ok) {
          throw new Error('Failed to fetch items');
        }
        const data = await response.json();
        setItems(data); // Set fetched items to state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredItems(items); // Show all items when search is empty
    } else {
      setFilteredItems(
        items.filter((item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }
  }, [searchQuery, items]);

  return (
    <div style={{ padding: '20px', top: '2rem' }}>
      <input
        type="text"
        placeholder="Search for food..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        style={{ width: '300px', padding: '10px', fontSize: '16px' }}
      />
      {loading && <p>Loading items...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {filteredItems.length > 0 && (
        <div style={{ border: '1px solid #ccc', marginTop: '10px', maxHeight: '200px', overflowY: 'auto' }}>
          <ul style={{ listStyleType: 'none', padding: '0' }}>
            {filteredItems.map((item) => (
              <li key={item.id} style={{ padding: '10px', cursor: 'pointer' }}>
                {item.name} {/* Adjust according to the structure of your item */}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchPage;
