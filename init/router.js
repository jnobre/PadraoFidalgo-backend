module.exports = (app) => {

    app.use('/', require("../routes/home.routes"));
    app.use('/encomendas', require('../routes/encomenda.routes'));
    app.use('/auth', require('../routes/auth.routes'));
    app.use('/produtos', require('../routes/produto.routes'));
    app.use('/users/levels', require('../routes/userlevel.routes'));
    app.use('/users', require('../routes/user.routes'));
    app.use('/emails', require('../routes/email.routes'));
    
}