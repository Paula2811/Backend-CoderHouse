exports.login = function (req,res,next) {
    const admin = false;
    try{
        if(admin){
            next();
        }else{
            res.status(401).json({ error: 'No tienes permiso para acceder a este recurso'})
        }
    } catch(error){
        res.status(500).json({ error: 'Error del servidor'})
    }
}

