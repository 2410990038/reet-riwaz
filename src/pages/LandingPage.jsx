// import { useState } from "react";
// import Navbar from "../components/Navbar";
// import HeroSection from "../components/HeroSection";
// import LoginModal from "../pages/LoginModal";

// export default function LandingPage() {
//   const [showLogin, setShowLogin] = useState(false);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLoginSuccess = () => {
//     setIsLoggedIn(true);
//     setShowLogin(false);
//   };

//   return (
//     <div>
//       <Navbar
//         onLoginClick={() => setShowLogin(true)}
//         isLoggedIn={isLoggedIn}
//       />
//       <HeroSection onStartShopping={() => setShowLogin(true)} />
//       {showLogin && (
//         <LoginModal
//           onClose={() => setShowLogin(false)}
//           onLoginSuccess={handleLoginSuccess}
//         />
//       )}
//     </div>
//   );
// }

import { useState } from "react";
import HeroSection from "../components/HeroSection";


// import LandingPage from "./src/Landing.png";


/*
  This component holds the "user database" in memory for demo purposes.
  - users: { [email]: { email, password } }
  - isLoggedIn and currentUser track session state.
*/


export default function LandingPage() {
  const [showLogin, setShowLogin] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  // Simple in-memory user store (object keyed by email)
  const [users, setUsers] = useState({
    // Example prefilled user:
    // "test@example.com": { email: "test@example.com", password: "password123" }
  });

  // Called by modal to attempt login. Returns an object { success, message, user? }
  const handleLogin = (email, password) => {
    const user = users[email?.toLowerCase()];
    if (!user) return { success: false, message: "No account found with this email." };
    if (user.password !== password) return { success: false, message: "Invalid password." };
    // success
    setIsLoggedIn(true);
    setCurrentUser(user);
    return { success: true };
  };

  // Called by modal to attempt signup. Returns { success, message }
  const handleSignup = (email, password) => {
    const key = email?.toLowerCase();
    if (users[key]) return { success: false, message: "An account with this email already exists." };

    // Create user
    setUsers((prev) => ({ ...prev, [key]: { email: key, password } }));
    return { success: true };
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const openLogin = () => setShowLogin(true);

  return (
    <div>
    
      <HeroSection onStartShopping={openLogin} isLoggedIn={isLoggedIn} />
      
      {/* {showLogin && (
        <LoginModal
          onClose={() => setShowLogin(false)}
          onLoginAttempt={handleLogin}
          onSignupAttempt={handleSignup}
          onLoginSuccess={() => {
            setShowLogin(false);
            // Landing page already reflects logged-in state via isLoggedIn/currentUser
          }}
        />
      )} */}
    </div>
  );
}

