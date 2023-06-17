import React from 'react'
// import Navbar from '../components/Navbar'
import Sidebar from './../components/Sidebar';
import Nav from '../components/Nav';
import Nav2 from '../components/Nav2';


const Layout = ({children}) => {
  return (
    <React.Fragment>
        <Nav/>
        <div className="columns mt-6" style={{minHeight: "100vh"}}>
        <div className="column is-2"><Sidebar/></div>
        <div className="column has-background-light">
            <main>{children}</main>
        </div>
        </div>
        
    </React.Fragment>
  )
}

export default Layout