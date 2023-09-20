import React, { useState, useEffect } from "react";
import ContentHeader from "../../Componentes/ContentHeader";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import SidebarContainer from "../../Componentes/SidebarContainer";
import { useNavigate, useParams } from "react-router-dom";
import APIInvoke from "../../Utils/APIInvoke";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const ProyectosEditar = () => {
  const navigate = useNavigate();
  const { idproducto } = useParams();

  const [producto, setProducto] = useState({
    id: "",
    nombre: "",
    precio: "",
    categoria: "",
    region: "",
  });

  useEffect(() => {
    obtenerProducto();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const obtenerProducto = async () => {
    const response = await APIInvoke.invokeGET(`/productos/${idproducto}`);
    if (response) {
      setProducto(response);
    }
  };

  const onChange = (e) => {
    setProducto({
      ...producto,
      [e.target.name]: e.target.value,
    });
  };

  const editarProducto = async (e) => {
    e.preventDefault();

    // Llamar directamente a la API sin try-catch, esto asume que las llamadas a la API siempre son exitosas.
    const response = await APIInvoke.invokePUT(`/productos/${idproducto}`, producto);

    if (response && response.id) {
      navigate("/proyectos-admin");

      const msg = "El Producto fue editado correctamente";
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
    }
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer />
      <div className="content-wrapper">
        <ContentHeader
          titulo={"EDICIÓN DE PRODUCTOS "}
          breadCrumb1={"INICIO"}
          breadCrumb2={"Edición"}
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
                VOLVER AL INICIO
              </Link>
            </h3>
          </div>
          <div className="card-body">
            <form onSubmit={editarProducto}>
              <div className="card-body">
                <div className="form-group">
                  <label htmlFor="id">ID:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="id"
                    name="id"
                    placeholder="ID del producto"
                    value={producto.id}
                    required // Para que el campo sea solo de lectura
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="nombre">NOMBRE:</label>
                  <input
                    type="text"
                    className="form-control"
                    id="nombre"
                    name="nombre"
                    placeholder="Nombre del producto"
                    value={producto.nombre}
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
                    placeholder="Precio del producto"
                    value={producto.precio}
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
                    placeholder="Categoría del producto"
                    value={producto.categoria}
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
                    placeholder="Región del producto"
                    value={producto.region}
                    onChange={onChange}
                    required
                  />
                </div>
              </div>
              <div className="card-footer">
                <button type="submit" className="btn btn-primary">
                  ACTUALIZAR PRODUCTOS
                </button>
              </div>
            </form>
          </div>
        </section>
      </div>
      <Footer />
    </div>
  );
};

export default ProyectosEditar;