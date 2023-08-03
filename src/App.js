
import './App.css';
import { Routes , BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import renderRoutes from './routes';
import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";
import LoadingComponent from './GlobalSetting/Loading/LoadingComponent';
function App() {
  return (
   <Suspense fallback={<LoadingComponent />}>
      <BrowserRouter>
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
   </Suspense>
  );
}

export default App;
 