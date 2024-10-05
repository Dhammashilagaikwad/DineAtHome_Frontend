import React, { useState } from "react";
import "../styles/MenuPage.css"; // Add custom styles here

const initialMenu = [
  {
    dishId: "1",
    name: "Pasta Carbonara",
    description: "Creamy pasta with pancetta and parmesan.",
    price: 15,
    chefName: "Chef Alex",
    category: "Main Course",
    image: "https://th.bing.com/th/id/R.aebe0c3009fb6f4cc319414d6aca1454?rik=3s4%2buzrIZj6UWQ&riu=http%3a%2f%2fpluspng.com%2fimg-png%2fspaghetti-png-hd-spaghetti-png-clipart-1000.png&ehk=uSnAkx8GutKAlqb87VQ02GN9RmaoZtBpypyLR2RSp10%3d&risl=&pid=ImgRaw&r=0", // Replace with actual image URLs
  },
  {
    dishId: "2",
    name: "Chocolate Cake",
    description: "Rich chocolate cake with fudge icing.",
    price: 8,
    chefName: "Chef Maria",
    category: "Dessert",
    image: "https://example.com/cake.jpg",
  },
  {
    dishId: "3",
    name: "Greek Salad",
    description: "Fresh salad with feta, olives, and tomatoes.",
    price: 10,
    chefName: "Chef Liam",
    category: "Salad",
    image: "https://example.com/salad.jpg",
  },
  // Add more dishes
];

const MenuPage = () => {
  const [menu, setMenu] = useState(initialMenu);
  const [sortOption, setSortOption] = useState("");

  const handleSort = (option) => {
    let sortedMenu;
    switch (option) {
      case "price-low-to-high":
        sortedMenu = [...menu].sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        sortedMenu = [...menu].sort((a, b) => b.price - a.price);
        break;
      case "main-course":
        sortedMenu = initialMenu.filter((item) => item.category === "Main Course");
        break;
      case "dessert":
        sortedMenu = initialMenu.filter((item) => item.category === "Dessert");
        break;
      case "salad":
        sortedMenu = initialMenu.filter((item) => item.category === "Salad");
        break;
      case "bread":
        sortedMenu = initialMenu.filter((item) => item.category === "Bread");
        break;
      default:
        sortedMenu = initialMenu;
    }
    setMenu(sortedMenu);
    setSortOption(option);
  };

  return (
    <div className="menu-page-container">
      <div className="menu-list-container">
        {menu.map((dish) => (
          <div key={dish.dishId} className="menu-card">
            <img src={dish.image} alt={dish.name} className="dish-image" />
            <h3>{dish.name}</h3>
            <p>{dish.description}</p>
            <p>Price: ${dish.price}</p>
            <p>Chef: {dish.chefName}</p>
            <button className="add-to-cart-btn">Add to Cart</button>
          </div>
        ))}
      </div>

      <div className="sort-options">
        <h3>Sort By</h3>
        <button onClick={() => handleSort("price-low-to-high")}>Price Low to High</button>
        <button onClick={() => handleSort("price-high-to-low")}>Price High to Low</button>
        <h3>Categories</h3>
        <button onClick={() => handleSort("main-course")}>Main Course</button>
        <button onClick={() => handleSort("dessert")}>Dessert</button>
        <button onClick={() => handleSort("salad")}>Salad</button>
        <button onClick={() => handleSort("bread")}>Bread</button>
      </div>
    </div>
  );
};

export default MenuPage;
