import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/Layouts/MainLayout";
import routes from "./routes/routes-list";

function App() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          {routes.map((route, index) => (
            <Route key={index} path={route.href} element={route.component} />
          ))}
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default App;
