import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import APIInvoke from "../../Utils/APIInvoke";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";

const ProyectosCrear = () => {
  const navigate = useNavigate();

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    precio: "",
    categoria: "",
    region: ""
  });

  const { id, nombre, precio, categoria, region } = producto;

  useEffect(() => {
    document.getElementById("id").focus();
  }, []);

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    })
  };
 
  const crearProducto = async () => {
    const data = {
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      categoria: producto.categoria,
      region: producto.region,
    }
      const response = await APIInvoke.invokePOST("/productos", data);
      const idProducto = response.id;

      if (idProducto === "") {
        const msg = " El Producto no fue creado correctamente";
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
      }else{
        navigate("/proyectos-admin")
        const msg = " El Producto fue creado correctamente";
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
        setProducto({
          id: "",
          nombre: "",
          precio: "",
          categoria: "",
          region: "",
        });
      }
    }
    const onSubmit = (e) => {
      e.preventDefault();
      crearProducto();
    }
    return (
      <div className="wrapper">
        <Navbar></Navbar>
        <SidebarContainer></SidebarContainer>
        <div className="content-wrapper">
          <ContentHeader
            titulo={"CREACIÓN DE NUEVOS PRODUCTOS"}
            breadCrumb1={"Inicio"}
            breadCrumb2={"CREACIÓN"}
            ruta1={"/proyectos-admin"}
          />
          <section className="content">
            <div className="card-header">
              <h3 className="card-title">
                <Link
                  to="/proyectos-admin"
                  type="button"
                  className="btn btn-block btn-primary btn-sm"
                >
                  VOLVER AL INICIO.
                </Link>
              </h3>
            </div>
            <div className="card-body">
              <form onSubmit={onSubmit}>
                <div className="card-body">
                  <div className="form-group">
                    <label htmlFor="id">ID:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="id"
                      name="id"
                      placeholder="Ingrese el ID del producto"
                      value={id}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="nombre">NOMBRE:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="nombre"
                      name="nombre"
                      placeholder="Ingrese el Nombre del producto"
                      value={nombre}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="precio">PRECIO:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="precio"
                      name="precio"
                      placeholder="Ingrese el Precio del producto"
                      value={precio}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="categoria">CATEGORÍA:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="categoria"
                      name="categoria"
                      placeholder="Ingrese la Categoría del producto"
                      value={categoria}
                      onChange={onChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="region">REGIÓN:</label>
                    <input
                      type="text"
                      className="form-control"
                      id="region"
                      name="region"
                      placeholder="Ingrese la Región del producto"
                      value={region}
                      onChange={onChange}
                      required
                    />
                  </div>
                </div>
                <div className="card-footer">
                  <button type="submit" className="btn btn-primary">
                    CREAR PRODUCTO
                  </button>
                </div>
              </form>
            </div>
          </section>
        </div>
       <Footer></Footer>
      </div>
    );
};

export default ProyectosCrear;