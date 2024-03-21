import "./App.css";
import { Routes, BrowserRouter } from "react-router-dom";
import { Suspense } from "react";
import renderRoutes from "./routes";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { createBrowserHistory } from "history";
import ModalTrailer from "pages/HOC-Modal";
import { WebsocketProvider, socket } from "contexts/WebsocketContext";
import Loader from "Loader";
import { Helmet, HelmetProvider } from "react-helmet-async";

export const history = createBrowserHistory();

function App() {
  return (
      <Suspense fallback={<Loader value={50} />}>
        <BrowserRouter history={history}>
          <ModalTrailer />
          <WebsocketProvider value={socket}>
            <Routes>{renderRoutes()}</Routes>
          </WebsocketProvider>
        </BrowserRouter>
      </Suspense>
  );
}

export default App;
