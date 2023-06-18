import React from 'react'
// import Navbar from '../components/Navbar'
import Sidebar from './../components/Sidebar2';
import Nav2 from '../components/Nav2';


const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Nav2/>
        <div className="columns mt-6" style={{minHeight: "100vh"}}>
       <Sidebar/>
        <div className="column has-background-light">
            <main>{children}</main>
        </div>
        </div>
        
    </React.Fragment>
  )
}

export default Layout