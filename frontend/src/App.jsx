import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import PhotosIndex from "./pages/PhotosPages/PhotosIndex";
import Login from "./pages/Auth/Login";
import AuthPage from "./middlewares/AuthPage";
import Dashboard from "./pages/Auth/Dashboard";
import Register from "./pages/Auth/Register";
import AuthAdmin from "./middlewares/AuthAdmin";
import CategoriesIndex from "./pages/CategoriesPages/CategoriesIndex";
import Users from "./pages/Auth/Users";

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

      {/* Rotte private degli Admin */}
      <Route path="/" element={<AuthAdmin><DefaultLayout /></AuthAdmin>} >

        {/* Rotta delle categorie */}
        <Route path="categories" element={<CategoriesIndex />} />

      </Route>

      {/* Rotte private del super Admin */}
      <Route path="/" element={<AuthAdmin><DefaultLayout /></AuthAdmin>} >

        {/* Rotta degli Users */}
        <Route path="users" element={<Users />} />

      </Route>


    </Routes>
  )
}

export default App;