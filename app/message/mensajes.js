/**
 * @module msg
 */

/**
 * Envía una respuesta JSON con un estado de éxito.
 * 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @param {number} [status=200] - El código de estado HTTP.
 * @param {string} [mensaje=""] - El mensaje a incluir en la respuesta.
 */
 const completo = (req, res, status = 200, mensaje = "") =>{
    res.status(status).json({
        error:false,
        status: status,
        body: mensaje
    })
}

/**
 * Envía una respuesta JSON con un estado de error.
 * 
 * @param {Object} req - El objeto de la solicitud.
 * @param {Object} res - El objeto de la respuesta.
 * @param {number} [status=500] - El código de estado HTTP.
 * @param {string} [mensaje=""] - El mensaje a incluir en la respuesta.
 */
 const incompleto = (req, res, status = 500, mensaje = "") =>{
    res.status(status).json({
        error:true,
        status: status,
        body: mensaje
    })
}


export {completo, incompleto};