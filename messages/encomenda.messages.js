module.exports = {
    success: {
        s0: {
            code: "EncomendaCreated",
            http: 201,
            type: "success"
        },
        s1: {
            http: 200,
            code: "EncomendaUpdated",
            type: "success"
        },
        s2: {
            http: 200,
            code: "EncomendaFound",
            type: "success"
        },
        s3: {
            http: 200,
            code: "EncomendaDeleted",
            type: "success"
        },
        s4: {
            http: 200,
            code: "Deactivated",
            type: "success"
        },
        s5: {
            http: 204,
            code: "NoEncomendas",
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
            code: "EncomendaNotFound",
            type: "error"
        }
    }
}