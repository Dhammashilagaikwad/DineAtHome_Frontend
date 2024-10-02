// // useLocation.js
// import { useState, useEffect } from 'react';

// const useLocation = () => {
//   const [location, setLocation] = useState(null);
//   const [error, setError] = useState(null);
//   const [permissionGranted, setPermissionGranted] = useState(false);

//   useEffect(() => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setLocation({
//             lat: position.coords.latitude,
//             lon: position.coords.longitude,
//           });
//           setPermissionGranted(true);
//         },
//         (error) => {
//           setError(error.message);
//           setPermissionGranted(false);
//         }
//       );
//     } else {
//       setError('Geolocation is not supported by this browser.');
//       setPermissionGranted(false);
//     }
//   }, []);

//   return { location, error, permissionGranted };
// };

// export default useLocation;
