
import { Router } from './Router'
import { useAuth } from './context/AuthContext';
import { Login } from './pages/Login';

function App() {

  const { isAuthenticated } = useAuth();

  return isAuthenticated ? (
    <Router />
  ) : (
    <Login />
  )
}

export default App
