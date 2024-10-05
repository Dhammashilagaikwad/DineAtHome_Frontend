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
