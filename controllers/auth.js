const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const Empresa = require('../models/empresa');
const { generarJWT } = require('../helpers/generar-jwt');

const login = async( req = request, res = response ) => {

    const { correo, password } = req.body;

    try {
        
        //Verificar si el correo existe
        const empresa = await Empresa.findOne( { correo } );

        if ( !empresa ) {
            return res.status(404).json({
                msg: 'Correo de la persona no existe en la base de datos 404'
            });
        }
    
        //Si el usuario esta activo (usuario.estado === false)
        if ( empresa.estado === false ) {
            return res.status(400).json({
                msg: 'La cuenta de la persona esta inactiva'
            });
        }
    
        //Verificar la password el usuario    //comporeSync, encripta ambas passwords y las compara
        const validarPassword = bcryptjs.compareSync( password, empresa.password );
        if ( !validarPassword ) {
            return res.status(400).json({
                msg: 'La password es incorrecta'
            });
        }

        //Generar JWT
        const token = await generarJWT( empresa.id );
    
        res.json({
            msg: 'Login Auth Funciona!',
            correo, password,
            token
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hable con el admin'
        })
    }


}


module.exports = {
    login
}