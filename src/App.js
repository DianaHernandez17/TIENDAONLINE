import React, {Fragment} from 'react';
import {BrowserRouter as Router, Route, Routes} from 'react-router-dom'; //Componentes de ruteo
import Login from './Paginas/auth/login';
import CrearCuenta from './Paginas/auth/CrearCuenta';
import Home from './Paginas/Home';
import ProyectosAdmin from './Paginas/proyectos/ProyectosAdmin';
import ProyectosCrear from './Paginas/proyectos/ProyectosCrear';
import ProyectosEditar from './Paginas/proyectos/ProyectosEditar';
import ProyectosEntreg from './Paginas/proyectos/ProyectosEntreg';


function App() {
  return(
    <Fragment>
      <Router>
        <Routes>
        <Route path= "/" exact element={<Login/>}/>
        <Route path="/crear-cuenta" exact element={<CrearCuenta/>}/>
        <Route path="/home" exact element={<Home/>}/>
        <Route path="/proyectos-admin" exact element={<ProyectosAdmin/>}/>
        <Route path="/proyectos-crear" exact element={<ProyectosCrear/>}/>
        <Route path="/proyectos-entreg" exact element={<ProyectosEntreg/>}/>
        <Route path="/produtos/editar/:idproducto" exact element ={<ProyectosEditar />}/>
        </Routes>
      </Router>
    </Fragment>
  );
}

export default App;
