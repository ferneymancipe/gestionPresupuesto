import React, { useState, useEffect } from 'react';
import Pregunta from './components/Pregunta';
import Formulario from './components/Formulario';
import Listado from './components/Listado';
import ControlPresupuesto from './components/ControlPresupuesto';

function App() {

   //Definir el presupuesto
   const [presupuesto, guardaPresupuesto] = useState(0);
   const [restante, guardaRestante] = useState(0);
   const [mostrarpregunta, actualizarPregunta] = useState(true);
   const [gastos, guardarGastos] = useState([]);
   const [gasto, guardarGasto] = useState({});
   const [crearGasto, guardarCrearGasto] = useState(false);

   //useEffect que actualiza el restante

   useEffect(() => {
      if (crearGasto) {
         //Agrega el nuevo presupuesto
         guardarGastos([
            ...gastos,
            gasto
         ]);

         //Resta del presupuesto actual
         const presupuestoRestante = restante - gasto.cantidad;
         guardaRestante(presupuestoRestante);

         //Resetear a false
         guardarCrearGasto(false);
      }
   }, [gasto, crearGasto, gastos, restante])
   

   return (
      <div className="container">
         <h1>Gasto Semanal</h1>

         <div className="contenido-principal contenido">
            {mostrarpregunta
               ?
               (
                  <Pregunta 
                     guardaPresupuesto={guardaPresupuesto}
                     guardaRestante={guardaRestante}
                     actualizarPregunta={actualizarPregunta}
                  />
               ) 
               :
               (
                  <div className="row">
                     <div className="one-half column">
                        <Formulario 
                           guardarGasto={guardarGasto}
                           guardarCrearGasto={guardarCrearGasto}
                        />
                     </div>
                     
                     <div className="one-half column">
                        <Listado 
                           gastos={gastos}
                        />
                        <ControlPresupuesto 
                           presupuesto={presupuesto}
                           restante={restante}
                        />
                     </div>
                  </div>
               )
            }
         </div>
      </div>
   );
}

export default App;
