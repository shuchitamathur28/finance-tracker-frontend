import './App.css';
import AuthProvider from "./context/AuthContext";
import { Route, Routes } from "react-router-dom";
import { Login, Signup, Dashboard } from "./pages";
// import Home from "./pages/Home";
// import Navbar  from "./components/Navbar";
import Header  from "./components/Header";
import Transactions from './pages/Transactions';

function App() {
  return (
    <>
      <AuthProvider>
        <Header />
        <main>
          <div className="flex flex-col md:flex-row">
            {/* <Navbar /> */}
            <Routes>
              {/* <Route path="/" element={<Home />} /> */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/transactions" element={<Transactions />} />
              {/* <Route path="/dashboard" element={<PrivateRoute element={<Dashboard />} />} /> */}
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Routes>
          </div>
        </main>
      </AuthProvider>
    </>
  )
}

export default App
