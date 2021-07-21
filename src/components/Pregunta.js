import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import Error from './Error';

const Pregunta  = ({ guardaPresupuesto, guardaRestante, actualizarPregunta }) => {

   //Definir el State
   const [cantidad, guardarCantidad] = useState(0);
   const [error, guardarError] = useState(false);

   // Funcion que lee el presupuesto
   const definirPresupuesto = e => {
      guardarCantidad(parseInt(e.target.value, 10))
   }

   const agregarPresupuesto = e => {
      e.preventDefault();

      //Valdiar
      if (cantidad < 1 || isNaN(cantidad)) {
         guardarError(true);
         return;
      }

      //Si se pasa la validacion
      guardarError(false);

      guardaPresupuesto(cantidad);
      guardaRestante(cantidad);
      actualizarPregunta(false);

   }

   return (
      <Fragment>
         <h2>Coloca tu presupuesto</h2>
         
         {error ? <Error mensaje="El presupuesto es incorrecto"/> : null}

         <form
            onSubmit={agregarPresupuesto}
         >
            <input 
               type="number"
               className="u-full-width"
               placeholder="Coloca tu presupuesto"
               onChange={definirPresupuesto}
            />

            <input 
               type="submit"
               className="button-primary u-full-width"
               value="Definir Presupuesto"
            />
         </form>
      </Fragment>
   );
}

Pregunta.propTypes = {
   guardaPresupuesto: PropTypes.func.isRequired,
   guardaRestante: PropTypes.func.isRequired,
   actualizarPregunta: PropTypes.func.isRequired
}

export default Pregunta;