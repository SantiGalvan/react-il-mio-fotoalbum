import { Route, Routes } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import Home from "./pages/Home";
import PhotosIndex from "./pages/PhotosPages/PhotosIndex";

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

      </Route>

    </Routes>
  )
}

export default App;