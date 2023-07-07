import React, {useEffect} from 'react'
import Welcome from '../components/Welcome'
import Layout from './Layout'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';
import WelcomePencari from '../components/WelcomePencari';

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
    <Layout>
      {user && (user.role === "pemilik kost" ||user.role === "admin") &&(
        <Welcome/>
      )}
      {user && user.role === "pencari kost" &&(
      <WelcomePencari/>
      )}
    </Layout>
  )
}

export default Dashboard