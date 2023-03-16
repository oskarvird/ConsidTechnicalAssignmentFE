import { Route, Routes } from "react-router-dom";
import MasterLayout from "./Layouts/MasterLayout";
import EditEmployee from "./Pages/EditEmployee/EditEmployee";
import Home from "./Pages/Home/Home";
import NewEmployee from "./Pages/NewEmployee/NewEmployee";

function App() {
  return (
    <Routes>
      <Route element={<MasterLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<NewEmployee />} />
        <Route path="/employee/:id" element={<EditEmployee />} />
      </Route>
    </Routes>
  );
}

export default App;
