import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import APIInvoke from '../../Utils/APIInvoke';
import swal from 'sweetalert';

const CrearCuenta= () => {

     const [usuario, setUsuario] =useState({ 
        nombre:'',
        apellido:'',
        email:'',
        password:'',
        confirmar:''
    });

    const {nombre, apellido, email, password, confirmar} = usuario;

    const onChange = (e) =>{
       setUsuario({
        ...usuario,
        [e.target.name]: e.target.value
       })
    }

    useEffect(() =>{
        document.getElementById("nombre").focus();

    }, [])

    const crearCuenta = async () =>{

        if (password !== confirmar){
            const msg = "LAS CONTASEÑAS SON DIFERENTES.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });
        } else if (password.length < 6){
        
            const msg = "LA CONTRASEÑA DEBE SER AL MENOS DE 6 CARACTERES.";
            swal({
                title: 'Error',
                text: msg,
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'Ok',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });

        } else {
            const data = {
                nombre: usuario.nombre,
                email: usuario.email,
                password: usuario.password
              }
              const response = await APIInvoke.invokePOST(`/api/usuarios`, data); 
              const mensaje = response.msg
             

              if (mensaje === 'EL USUARIO YA EXISTE'){
                const msg = "EL USUARIO YA EXISTE.";
                swal({
                    title: 'Error',
                    text: msg,
                    icon: 'error',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-danger',
                            closeModal: true
                        }
                    }
                });
              } else {
                const msg = "EL USUARIO FUE CREADO CORRECTAMENTE. ";
                swal({
                    title: 'Información',
                    text: msg,
                    icon: 'success',
                    buttons: {
                        confirm: {
                            text: 'Ok',
                            value: true,
                            visible: true,
                            className: 'btn btn-primary',
                            closeModal: true
                        }
                    }
                });

                setUsuario({
                    nombre:'',
                    apellido:'',
                    email:'',
                    password:'',
                    confirmar:''

                })

              }
        }

    }

    const onSubmit = (e) =>{
        e.preventDefault();
        crearCuenta();
     }
 

    return (
    <div className="hold-transition login-page">
        <div className="login-box">
            <div className="login-logo">
                <Link to={"#"}><b>Crear</b> Cuenta</Link>
            </div>
            <div className="card">
                    <div className="card-body login-card-body">
                        <p className="login-box-msg">Bienvenido, Ingrese sus credenciaes de acceso. </p>

                        <form onSubmit={onSubmit}>
                            <div className="input-group mb-3">
                              <input 
                                type="text"
                                className="form-control" 
                                placeholder="Nombre"
                                id="nombre"
                                name="nombre"
                                value={nombre}
                                onChange={onChange}
                                required
                                />

                            <div className="input-group-append">
                                <div className="input-group-text">
                                     <span className="fas fa-user"/>
                                    </div>
                                </div>
                            </div>

                        <div className="input-group mb-3">
                            <input 
                                type="text"
                                className="form-control" 
                                placeholder="Apellido"
                                id="apellido"
                                name="apellido"
                                value={apellido}
                                onChange={onChange}
                                required
                                />

                        <div className="input-group-append">
                                    <div className="input-group-text">
                                     <span className="fas fa-user"/>
                                    </div>
                                </div>
                                </div>
                                <div className="input-group mb-3">
                            <input 
                                type="email"
                                className="form-control" 
                                placeholder="Email"
                                id="email"
                                name="email"
                                value={email}
                                onChange={onChange}
                                required
                                />

                        <div className="input-group-append">
                                    <div className="input-group-text">
                                     <span className="fas fa-envelope"/>
                                    </div>
                                </div>
                                </div>
                                <div className="input-group mb-3">
                            <input 
                                type="password"
                                className="form-control"
                                placeholder="Contraseña"
                                id="password"
                                name="password"
                                value={password}
                                onChange={onChange}
                                required
                                
                                />
                                          
                            
                        <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                                </div>
                        <div className="input-group mb-3">
                            <input 
                                type="password"
                                className="form-control"
                                placeholder="Confirmacion de Contraseña"
                                id="confirmar"
                                name="confirmar"
                                value={confirmar}
                                onChange={onChange}
                                required
                                
                                />
                            
                            <div className="input-group-append">
                                <div className="input-group-text">
                                    <span className="fas fa-lock"></span>
                                    </div>
                                </div>
                            </div>
                          
                            
                        <div className="social-auth-links text-center mb-3">
                            <button type='submit'  className="btn btn-block btn-primary">
                              CREAR CUENTA
                            </button>
                            <Link to={"/"} className="btn btn-block btn-danger">
                                   REGRESAR AL LOGIN
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    </div>

   );
 }

 export default CrearCuenta;
  