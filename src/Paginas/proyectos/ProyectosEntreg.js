import React, { useState, useEffect } from "react";
import SidebarContainer from "../../Componentes/SidebarContainer";
import Footer from "../../Componentes/Footer";
import Navbar from "../../Componentes/Navbar";
import ContentHeader from "../../Componentes/ContentHeader";
import swal from "sweetalert";
import { Link } from "react-router-dom";
import APIInvoke from "../../Utils/APIInvoke";

const ProyectosEntreg = () => {
  // eslint-disable-next-line no-unused-vars
  const [deliveredProductos, setDeliveredProductos] = useState([]);
  const [pendingProductos, setPendingProductos] = useState([]);

  useEffect(() => {
    obtenerProductos();
  }, []);

  const obtenerProductos = async () => {
    const response = await APIInvoke.invokeGET("/productos");
    const delivered = response.filter(producto => producto.delivered);
    const pending = response.filter(producto => !producto.delivered);
    setDeliveredProductos(delivered);
    setPendingProductos(pending);
  };

  const [entregado, setEntregado] = useState(false);

  const marcarComoEntregado = () => {
    setEntregado(true);
    mostrarMensaje("entregado");
  };

  const mostrarMensaje = (tipo) => {
    let mensaje = "El producto ha sido entregado ";
    if (tipo === "entregado") {
      mensaje = "El producto ha sido entregado correctamente.";
    }

    swal({
      title: "Información",
      text: mensaje,
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
  };

  return (
    <div className="wrapper">
      <Navbar></Navbar>
      <SidebarContainer></SidebarContainer>
      <div className="content-wrapper">
        <ContentHeader
          titulo={"Listado de Productos Entregados"}
          breadCrumb1={"INICIO"}
          breadCrumb2={"PRODUCTOS"}
          ruta1={"/home"}
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
            <h2>Productos Entregados</h2>

            <table className="table table-bordered">
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
                {pendingProductos.map((producto) => (
                  <tr key={producto.id}>
                    <td>{producto.id}</td>
                    <td>{producto.nombre}</td>
                    <td>{producto.precio}</td>
                    <td>{producto.categoria}</td>
                    <td>{producto.region}</td>
                    <td>
                      &nbsp;&nbsp;
                      {entregado ? (
                        <button className="btn btn-sm btn-success">
                          ENTREGADOS
                        </button>
                      ) : (
                        <button
                          onClick={marcarComoEntregado}
                          className="btn btn-sm btn-danger"
                        >
                          ENTREGAR
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ProyectosEntreg;
