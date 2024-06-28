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
import AuthSuperAdmin from "./middlewares/AuthSuperAdmin";
import PhotoCreate from "./pages/PhotosPages/PhotoCreate";
import PhotoShow from "./pages/PhotosPages/PhotoShow";
import PhotoEdit from "./pages/PhotosPages/PhotoEdit";
import CategoryCreate from "./pages/CategoriesPages/CategoryCreate";

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

          {/* Show */}
          <Route path=":slug" element={<PhotoShow />} />

        </Route>

        {/* Rotta Login */}
        <Route path="login" element={<Login />} />

        {/* Rotta Register */}
        <Route path="register" element={<Register />} />

      </Route>

      {/* Rotte private */}
      <Route path="/" element={<AuthPage><DefaultLayout /></AuthPage>}>

        {/* Rotte delle Foto */}
        <Route path="photos">

          <Route path=":slug">

            {/* Edit */}
            <Route path="edit" element={<PhotoEdit />} />

          </Route>

          {/* Create */}
          <Route path="create" element={<PhotoCreate />} />

        </Route>

        {/* Dashboard dell'utente */}
        <Route path="/dashboard" element={<Dashboard />} />

      </Route>

      {/* Rotte private degli Admin */}
      <Route path="/" element={
        <AuthPage>
          <AuthAdmin>
            <DefaultLayout />
          </AuthAdmin>
        </AuthPage>
      } >

        {/* Rotta delle categorie */}
        <Route path="categories" >

          {/* Index delle categorie */}
          <Route index element={<CategoriesIndex />} />

          {/* Create delle categorie */}
          <Route path="create" element={<CategoryCreate />} />

        </Route>

      </Route>

      {/* Rotte private del super Admin */}
      <Route path="/" element={<AuthPage><AuthSuperAdmin><DefaultLayout /></AuthSuperAdmin></AuthPage>} >

        {/* Rotta degli Users */}
        <Route path="users" element={<Users />} />

      </Route>


    </Routes>
  )
}

export default App;