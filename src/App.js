//INMPORT YOUR DEPENDENCIES HERE
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//IMPORT YOUR CONTAINER HERE
import Login from "./containers/login/Login.js"
import PublicRoutes from "./routes/PublicRoutes.js"
import Dashboard from "./containers/dashboard/Dashboard.js"
import Layout from "./components/layout/index.js"

function App({props}) {
  return (
    <Router>
      <Routes>
          {/* Routes which are accessible without login */}
      <Route element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
      </Route>

       <Route element={<Layout {...props} />}>
       <Route path="/" element={<Dashboard />} />
       </Route>

       </Routes>
    </Router>
  );
}

export default App;
