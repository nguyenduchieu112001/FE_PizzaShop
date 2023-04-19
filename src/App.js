import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import RouteConfig from "./helpers/RouteConfig";

function App() {
  return (
    <main className="App">
      <>
        <ToastContainer
          draggable={false}
          transition={Zoom}
          autoClose={4000}
          hideProgressBar={true}
        />
        <RouteConfig />
      </>
    </main>
  );
}

export default App;
