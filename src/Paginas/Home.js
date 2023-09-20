import React from 'react';
import Navbar from '../Componentes/Navbar';
import SidebarContainer from '../Componentes/SidebarContainer';
import ContentHeader from '../Componentes/ContentHeader';
import Footer from '../Componentes/Footer';
import { Link } from "react-router-dom";


const Home= () => {
    return(
        <div className="wrapper">
            <Navbar></Navbar>
            <SidebarContainer></SidebarContainer>
            <div className="content-wrapper">


                <ContentHeader
                    titulo={"DASHBOARD"}
                    breadCrumb1={"INICIO"}
                    breadCrumb2={"DASHBOARD"}
                    ruta1={"/home"}
                />
                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-lg-3 col-6">
                                <div className="small-box bg-info">
                                    <div className="inner">
                                        <h3>PRODUCTOS</h3>
                                        <p>&nbsp;</p>
                                    </div>
                                    <div className="icon">
                                        <i className="fa fa-edit"/>
                                    </div>
                                    <Link to={"/proyectos-admin"} className="small-box-footer"> Ver Proyectos <i className="fas fa-arrow-circle-right"/></Link>
                                </div>
                            </div>
                        
                        </div>
                    </div>
                </section>
            </div>
            <Footer></Footer>
        </div>
    );
}
export default Home;
