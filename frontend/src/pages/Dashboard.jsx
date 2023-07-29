import React, {useEffect} from 'react'
import Welcome from '../components/Welcome'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import WelcomePencari from '../components/WelcomePencari';
import Nav2 from "../components/Nav2";
import Sidebar from "../components/Sidebar2";

const Dashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));
  const {user} = useSelector((state) => state.auth)

  useEffect(()=>{
    dispatch(getMe());
  }, [dispatch]);
  
  useEffect(()=>{
    if(isError){
      navigate("/");
    }
  }, [isError, navigate]);

  return (
    <div className="custom-container">
      <Nav2 />
      <Sidebar  />
      <div className="mainContent">
      {user && (user.role === "pemilik kost" ||user.role === "admin") &&(
        <Welcome/>
      )}
      {user && user.role === "pencari kost" &&(
      <WelcomePencari/>
      )}
      </div>
    </div>
  )
}

export default Dashboard