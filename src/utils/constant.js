import { MdHistory } from "react-icons/md";
import { MdRestaurantMenu } from "react-icons/md";
import { CiShop } from "react-icons/ci";
import { MdDeliveryDining } from "react-icons/md";

export const CHEFS_SIDEBAR = [
  {
    id: 1,
    name: "Orders",
    icon: <MdDeliveryDining />,
    link: "/home-shefs/dashboard",
  },
  {
    id: 2,
    name: "Menu",
    icon: <MdRestaurantMenu />,
    link: "/home-shefs/dashboard/menu",
  },
  {
    id: 3,
    name: "Shop",
    icon: <CiShop />,
    link: "/home-shefs/dashboard/cart",
  },
  {
    id: 4,
    name: "History",
    icon: <MdHistory />,
    link: "/home-shefs/dashboard/history",
  },
];

export const CHEFS_FAQ = [
  {
    question: "What is DineAtHome?",
    answer:
      "DineAtHome is an online marketplace that allows you to order home-cooked meals and freshly baked treats from our registered KitchenStars and BakeStars.",
  },
  {
    question: "How does DineAtHome work?",
    answer:
      "You can browse a variety of homemade meals and place an order directly from the app. Our KitchenStars prepare and deliver the food.",
  },
  {
    question: "How do I become a KitchenStar?",
    answer:
      "You can apply to become a KitchenStar by filling out the registration form on our website, and our team will get in touch with you.",
  },
  {
    question: "How does DineAtHome work?",
    answer:
      "You can browse a variety of homemade meals and place an order directly from the app. Our KitchenStars prepare and deliver the food.",
  },
  {
    question: "How do I become a KitchenStar?",
    answer:
      "You can apply to become a KitchenStar by filling out the registration form on our website, and our team will get in touch with you.",
  },
];
