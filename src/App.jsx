import FormsFirebase from "./page/FormsFirebase";
import { AuthProvider } from "./context/AuthContext";


function App() {
  return (
    <div>
      <AuthProvider>
        <h1>Nails</h1>
        <FormsFirebase />
      </AuthProvider>
    </div>
  );
}

export default App;