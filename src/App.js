//INMPORT YOUR DEPENDENCIES HERE
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

//IMPORT YOUR CONTAINER HERE
import Login from "./containers/login/Login.js"
import PublicRoutes from "./routes/PublicRoutes.js"
import Dashboard from "./containers/dashboard/Dashboard.js"
import Layout from "./components/layout/index.js"
import Admin from "./containers/admin/Admin.js"
import Session from "./containers/session/Session.js"
import Register from "./containers/register/Register.js"

function App({props}) {
  return (
    <Router>
      <Routes>
          {/* Routes which are accessible without login */}
      <Route element={<PublicRoutes />}>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register/>}/>
      </Route>

       <Route element={<Layout {...props} />}>
       <Route path="/" element={<Login />} />
       <Route path="/admin" element={<Admin/>}/>
       <Route path="/dashboard" element={<Dashboard/>}/>
       <Route path="/session" element={<Session/>}/>
       </Route>


       </Routes>
    </Router>
  );
}

export default App;
