import { useState, useEffect, createContext, useContext } from "react";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

/* Creando un objeto de contexto.*/

export const authContext = createContext();

/**
 * UseAuth() es una función que devuelve el objeto de contexto creado por el hook useContext().*/

export const useAuth = () => {
  const context = useContext(authContext);
  if (!context) {
    console.log("error creating auth context");
  }
  return context;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState("");

  /* Un hook que se llama cuando se monta el componente y cuando se actualiza el componente.*/

  useEffect(() => {
    const subscribed = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        console.log("no hay usuario suscrito");
        setUser("");
      } else {
        setUser(currentUser);
      }
    });
    return () => subscribed();
  }, []);

  /**
   * "registrarse" es una función que toma dos argumentos, "correo electrónico" y "contraseña", y luego llama al
   * "función createUserWithEmailAndPassword" con el objeto "auth" y el "correo electrónico" y la "contraseña"
   * argumentos.
   */

  const register = async (email, password) => {
    const response = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    console.log(response);
  };

  /**
   * "iniciar sesión" es una función que toma dos parámetros, "correo electrónico" y "contraseña", y devuelve una promesa de que
   * resuelve el resultado de llamar a "signInWithEmailAndPassword" con los parámetros "auth", "email",
   * y contraseña".
   */

  const login = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password);
    console.log(response);
  };

  /**
   * La función loginWithGoogle es una función asíncrona que devuelve el resultado de signInWithPopup
   * función, que toma los parámetros de autenticación y respuesta de Google.
   * Se está devolviendo el objeto de respuesta de Google.
   */

  const loginWithGoogle = async () => {
    const responseGoogle = new GoogleAuthProvider();
    return await signInWithPopup(auth, responseGoogle);
  };

  /**
   * La función de cierre de sesión es una función asincrónica que llama a la función cerrar sesión y registra el
   * respuesta a la consola.
   */

  const logout = async () => {
    const response = await signOut(auth);
    console.log(response);
  };
  return (
    <authContext.Provider
      value={{
        register,
        login,
        loginWithGoogle,
        logout,
        user,
      }}
    >
      {children}
    </authContext.Provider>
  );
}