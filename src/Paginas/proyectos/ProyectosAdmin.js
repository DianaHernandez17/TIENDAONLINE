import React, { useState, useEffect } from "react";
import SidebarContainer from "../../Componentes/SidebarContainer";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import ContentHeader from "../../Componentes/ContentHeader";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import APIInvoke from "../../Utils/APIInvoke";

const ProyectosAdmin = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const response = await APIInvoke.invokeGET("/productos");
    setProductos(response);
  };
  useEffect(() => {
    obtenerProductos();
  }, []);

  const eliminarProducto = async (e, id) => {
    e.preventDefault();
    const response = await APIInvoke.invokeDELETE(`/productos/${id}`);
    if (response) {
      const msg = "El Producto fue eliminado correctamente.";
      swal({
        title: "Información",
        text: msg,
        icon: "success",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-primary",
            closeModal: true,
          },
        },
      });
      obtenerProductos();
    } else {
      const msg = " El Producto no fue eliminado correctamente";
      swal({
        title: "Error",
        text: msg,
        icon: "error",
        buttons: {
          confirm: {
            text: "Ok",
            value: true,
            visible: true,
            className: "btn btn-danger",
            closeModal: true,
          },
        },
      });
    }
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de Productos Típicos Colombianos"}
          breadCrumb1={"INICIO"}
          breadCrumb2={"PRODUCTOS"}
          ruta1={"/home"}
        />
    <section className="content">
        <div className="card">
            <div className="card-header">
                <h3 className="card-title"><Link to={"/proyectos-crear"} className="btn btn-block btn-primary btn-sm"> CREAR NUEVOS PRODUCTOS </Link></h3>
                    
        </div>
            <div className="card-body">
                <table className="table table- bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>NOMBRE</th>
                    <th>PRECIO</th>
                    <th>CATEGORÍA</th>
                    <th>REGIÓN</th>
                    <th>OPCIONES</th>
                  </tr>
                </thead>
                <tbody>
                  {productos.map((producto) => (
                    <tr key={producto.id}>
                      <td>{producto.id}</td>
                      <td>{producto.nombre}</td>
                      <td>{producto.precio}</td>
                      <td>{producto.categoria}</td>
                      <td>{producto.region}</td>
                      <td>
                
                      <Link to={"/proyectos-entreg"} 
                        className="btn btn-sm btn-success">Ver</Link>&nbsp;&nbsp;
                      
                      <Link to={`/produtos/editar/${producto.id}`} 
                        className="btn btn-sm btn-primary">Editar</Link>&nbsp;&nbsp;
                        <button onClick={(e)=> eliminarProducto(e,producto.id )} className="btn btn-sm btn-danger">Eliminar</button>&nbsp;&nbsp;
                        
                      </td>
                     
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProyectosAdmin;
