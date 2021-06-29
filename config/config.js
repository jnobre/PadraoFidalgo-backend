module.exports = {
    mongodb: {
        uri: 'mongodb+srv://account:9w2pRBU8hRaSdFNP@clusterlazare.l1zue.mongodb.net/PadraoFidalgo?retryWrites=true&w=majority',
        collections: {
            encomenda: 'encomendas',
            question: 'questions',
            produto: 'produtos',
            user: 'users',
            user_levels: "user_levels"
        }
    },
    auth: {
        expiration_time: 15000,
        issuer: "PadraoFidalgo"
    },
    sanitize: {
        alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyzŠŒŽšœžŸ¥µÀÁÂÃÄÅÆÇÈÉÊËẼÌÍÎÏĨÐÑÒÓÔÕÖØÙÚÛÜÝßàáâãäåæçèéêëẽìíîïĩðñòóôõöøùúûüýÿ\\ ",
        numerical: "0123456789"
    },
    email: {
        service: "Gmail",
        auth: {
            user: "mailserverpw@gmail.com",
            pass: "ttxirdxzkafhcuel"
        }
    }
}