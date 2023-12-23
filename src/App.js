
import './App.css';
import { Routes, BrowserRouter } from 'react-router-dom';
import { Suspense } from 'react';
import renderRoutes from './routes';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LoadingComponent from './GlobalSetting/Loading/LoadingComponent'
import { createBrowserHistory } from 'history';
import ModalTrailer from 'pages/HOC-Modal';
import { WebsocketProvider, socket } from 'contexts/WebsocketContext';

export const history = createBrowserHistory();

function App() {
  return (
    <Suspense fallback={<LoadingComponent />}>
      <BrowserRouter history={history}>
        <ModalTrailer />
        <WebsocketProvider value={socket}>

        <Routes >{renderRoutes()}</Routes>
        </WebsocketProvider>
      </BrowserRouter>
    </Suspense>
  );
}

export default App;
