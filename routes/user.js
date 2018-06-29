const express = require( 'express' ),
    router = express.Router(),
    bp = require( 'body-parser' ),
    path = require( 'path' ),
    controller = require( '../controllers/user' );

//Body Parser Required for these routes
router.use( bp.urlencoded( { extended: true } ) );
router.use( bp.json() );
//Static file server for these routes
router.use( express.static( path.join( __dirname + '/../public' ) ) );

function isLoggedIn( req, res, next ) {
    if ( req.isAuthenticated() ) {
        return next();
    }
    res.redirect( '/user/login' );

}

router.get( '/', controller.renderSettings );

router.get( '/login', controller.renderLogin );

router.post( '/login', controller.login );

router.get( '/logout', controller.logout );

router.get( '/register', controller.renderRegister );

router.post( '/register', controller.register );

router.put( '/info', isLoggedIn, controller.updateSettings );

module.exports = router;