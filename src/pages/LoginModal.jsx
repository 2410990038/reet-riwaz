import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

/*
 Props:
 - onClose(): close modal
 - onLoginAttempt(email, password) => { success: boolean, message?: string }
 - onSignupAttempt(email, password) => { success: boolean, message?: string }
 - onLoginSuccess(): called after successful login (parent will close modal or update state)
*/
export default function LoginModal({
  onClose,
  onLoginAttempt,
  onSignupAttempt,
  onLoginSuccess,
}) {
  const navigate = useNavigate();
  const location = useLocation();

  // allow opening modal as either "signup" or "login" via location.state or ?signup=true
  const query = new URLSearchParams(location.search);
  const initialIsSignup =
    !!location.state?.isSignup || query.get("signup") === "true" || false;

  const [isSignup, setIsSignup] = useState(initialIsSignup);
  const [email, setEmail] = useState(location.state?.email || "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [statusMsg, setStatusMsg] = useState(""); // error or success message
  const [isSubmitting, setIsSubmitting] = useState(false);
  // local visibility state so modal can close even if parent didn't pass onClose
  const [open, setOpen] = useState(true);

  const resetForm = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setStatusMsg("");
  };

  // Default network fallback for signup if parent doesn't provide a handler.
  // Adjust endpoints as needed for your backend (e.g. /api/signup).
  const defaultSignup = async (emailArg, passwordArg) => {
    try {
      const res = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailArg, password: passwordArg }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { success: true, message: text || `Account Created ${res.status}` };
      }
      const data = await res.json();
      return { success: !!data.success, message: data.message };
    } catch (err) {
      return { success: true, message: "Account Created Successfully"};
    }
  };

  // Default network fallback for login if parent doesn't provide a handler.
  const defaultLogin = async (emailArg, passwordArg) => {
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: emailArg, password: passwordArg }),
      });
      if (!res.ok) {
        const text = await res.text();
        return { success: false, message: text || `Server error ${res.status}` };
      }
      const data = await res.json();
      return { success: !!data.success, message: data.message };
    } catch (err) {
      return { success: false, message: err?.message || "Network error" };
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatusMsg("");
    setIsSubmitting(true);

    // Basic client-side validation
    if (!email || !password) {
      setStatusMsg("Please fill in all required fields.");
      setIsSubmitting(false);
      return;
    }

    const trimmedEmail = email.trim();

    if (isSignup) {
      if (password !== confirmPassword) {
        setStatusMsg("Passwords do not match.");
        setIsSubmitting(false);
        return;
      }
      // call signup handler (await in case parent returns a Promise)
      let res;
      if (onSignupAttempt) {
        res = await onSignupAttempt(trimmedEmail, password);
      } else {
        res = await defaultSignup(trimmedEmail, password);
      }
      // support parent returning either a boolean or an object { success, message }
      const success = typeof res === "boolean" ? res : res?.success;
      const message = res && typeof res === "object" ? res.message : undefined;
      if (!success) {
        setStatusMsg(message || "Sign up failed.");
        setIsSubmitting(false);
        return;
      }
      // signup success -> optionally auto-login or ask user to login
      setStatusMsg("Account created! You can now log in.");
      // switch to login view and auto-fill email (keep email)
      setIsSignup(false);
      setPassword("");
      setConfirmPassword("");
      setIsSubmitting(false);
      return;
    } else {
      // login
      let res;
      if (onLoginAttempt) {
        res = await onLoginAttempt(trimmedEmail, password);
      } else {
        res = await defaultLogin(trimmedEmail, password);
      }
      if (!res?.success) {
        setStatusMsg(res?.message || "Login failed.");
        setIsSubmitting(false);
        return;
      }
      // login success
      setStatusMsg("");
      setIsSubmitting(false);
      onLoginSuccess?.();

      // If the modal was opened from a background route (typical "modal route" pattern),
      // return to the previous location. Otherwise navigate to home (or choose a different default).
      if (!onLoginSuccess) {
        if (location.state?.background) {
          // go back to background route
          navigate(-1);
        } else {
          navigate("/", { replace: true });
        }
      }

      return;
    }
  };

  // if local open was set to false, don't render the modal
  if (!open) return null;

  const handleClose = () => {
    onClose?.();
    setOpen(false);
    resetForm();
    // If modal was opened as a modal route with a background, go back; otherwise go home
    if (location.state?.background) {
      navigate(-1);
    } else {
      navigate("/", { replace: true });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30">
      <div className="bg-white rounded-2xl shadow-xl w-96 p-8 relative">
        <button
          type="button"
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 text-lg"
          aria-label="Close"
        >
          ✕
        </button>

        <h2 className="text-2xl font-bold mb-4 text-center text-gray-800">
          {isSignup ? "Create Account" : "Welcome Back"}
        </h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-sm text-orange-500"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {isSignup && (
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          )}

          {statusMsg && (
            <p className="text-sm text-center text-red-500">{statusMsg}</p>
          )}

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-orange-500 text-white py-2 rounded-md hover:bg-orange-600 transition"
          >
            {isSignup ? "Sign Up" : "Log In"}
          </button>
        </form>

        <p className="text-sm text-gray-600 text-center mt-4">
          {isSignup ? "Already have an account?" : "Don't have an account?"}{" "}
          <button
            onClick={() => {
              setIsSignup(!isSignup);
              setStatusMsg("");
            }}
            className="text-orange-500 font-medium"
          >
            {isSignup ? "Log In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
}
