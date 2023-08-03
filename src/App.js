
import './App.css';
import { Routes , BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import renderRoutes from './routes';
function App() {
  return (
   <Suspense fallback={<div>Loading...</div>}>
      <BrowserRouter>
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
   </Suspense>
  );
}

export default App;
 