
import './App.css';
import { Routes, BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import renderRoutes from './routes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingComponent from './GlobalSetting/Loading/LoadingComponent'
import Modal from 'pages/HOC-Modal';
function App() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <BrowserRouter>
        <Modal />
        <Routes>{renderRoutes()}</Routes>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
