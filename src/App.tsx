import { BrowserRouter as Router } from 'react-router-dom';
import UserRoutes from './routes/UserRoutes';
// react
function App() {
  return (
    <Router>
      <UserRoutes />
    </Router>
  );
}

export default App;
