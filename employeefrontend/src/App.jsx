import { Route, Routes } from "react-router-dom";
import "./App.css";
import MasterLayout from "./Layouts/MasterLayout";
import EditEmployee from "./Pages/EditEmployee/EditEmployee";

import Home from "./Pages/Home/Home";
import NewEmployee from "./Pages/NewEmployee/NewEmployee";

function App() {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="/create" element={<NewEmployee />}></Route>
        <Route path="/employee/:id" element={<EditEmployee />}></Route>
      </Route>
    </Routes>
  );
}

export default App;
