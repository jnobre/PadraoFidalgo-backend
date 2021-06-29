module.exports = {
    success: {
        s0: {
            code: "ProdutoCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "ProdutoUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "ProdutoFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "ProdutoDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoProdutos",
            type: "success"
        },
        s6: {
            http: 200,
            code: "Activated",
            type: "success"
        }
    },
    error: {
        e0: {
            http: 404,
            code: "ProdutoNotFound",
            type: "error"
        }
    }
}