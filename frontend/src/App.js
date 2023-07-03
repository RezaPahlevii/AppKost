import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Login from "./components/Login";
import Dashboard from "./pages/Dashboard";
import Users from './pages/Users';
import RumahKost from './pages/RumahKost';
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddRumahKost from './pages/AddRumahKost';
import EditRumahKost from './pages/EditRumahKost';
import HomePage from "./pages/HomePage";
import DetailKost from "./pages/DetailKost";
import ListKost from './pages/ListKost';
import PusatBantuan from "./pages/PusatBantuan";
import TentangKami from "./pages/TentangKami";
import PencariKost from './pages/PencariKost';
import EditFooter from './pages/EditFooter';
import EditBanner from './pages/EditBanner';
import EditProfilPemilik from './pages/EditProfilPemilik';
import LoginRegister from './pages/LoginRegister';
import Maps from './pages/Maps';


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginRegister/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/users" element={<Users/>}/>
        <Route path="/users/add" element={<AddUser/>}/>
        <Route path="/users/edit/:id" element={<EditUser/>}/>
        <Route path="/rumah-kost" element={<RumahKost/>}/>
        <Route path="/rumah-kost/add" element={<AddRumahKost/>}/>
        <Route path="/rumah-kost/edit/:id" element={<EditRumahKost/>}/>
        <Route path="/footer-edit" element={<EditFooter/>}/>
        <Route path="/banner-edit" element={<EditBanner/>}/>
        <Route path="/pencari-kost" element={<PencariKost/>}/>
        <Route path="/edit-profil-pemilik" element={<EditProfilPemilik/>}/>
      </Routes>
      <Routes>
        <Route path="/" element={<HomePage/>}/>
        <Route path="/maps" element={<Maps/>}/>
        <Route path="/detail-kost" element={<DetailKost/>}/>
        <Route path="/kost-list" element={<ListKost/>}/>
        <Route path="/pusat-bantuan" element={<PusatBantuan/>}/>
        <Route path="/tentang-kami" element={<TentangKami/>}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;