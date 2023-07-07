import React, { useEffect } from 'react'
import Layout from '../pages/Layout'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getMe } from '../features/authSlice';

const PengaturanAkunPencari = () => {
    const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isError} = useSelector((state => state.auth));

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
        <Container className="mt-3">
            <h2>pengaturan-akun</h2>
        </Container>
    </Layout>
  )
}

export default PengaturanAkunPencari