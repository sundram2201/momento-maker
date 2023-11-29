// import { BrowserRouter } from "react-router-dom";
// import { RouterProvider } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Router from "./Router";
function App() {
  return (
    <div className='App'>
      <Toaster />
      <Router />
    </div>
  );
}

export default App;
