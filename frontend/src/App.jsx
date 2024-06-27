import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import PhotosIndex from "./pages/PhotosPages/PhotosIndex";
import Login from "./pages/Auth/Login";
import AuthPage from "./middlewares/AuthPage";
import Dashboard from "./pages/Auth/Dashboard";
import Register from "./pages/Auth/Register";

const App = () => {
  return (
    <Routes>

      {/* Rotte pubbliche */}
      <Route path="/" element={<DefaultLayout />} >

        {/* Home */}
        <Route index element={<Home />} />

        {/* Rotte delle Foto */}
        <Route path="photos">

          {/* Index */}
          <Route index element={<PhotosIndex />} />

        </Route>

        {/* Rotta Login */}
        <Route path="login" element={<Login />} />

        {/* Rotta Register */}
        <Route path="register" element={<Register />} />

      </Route>

      {/* Rotte private */}
      <Route path="/" element={<AuthPage><DefaultLayout /></AuthPage>}>

        {/* Dashboard dell'utente */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Route>

    </Routes>
  )
}

export default App;