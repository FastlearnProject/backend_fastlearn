export const completo = (req, res, status = 200, mensaje = "") =>{
    res.status(status).json({
        error:false,
        status: status,
        body: mensaje
    })
}

export const incompleto = (req, res, status = 500, mensaje = "") =>{
    res.status(status).json({
        error:true,
        status: status,
        body: mensaje
    })
}