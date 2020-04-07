module.exports = {
    reponseHandler : (res, status, data) => {
        return res.status(status).json({...data})
        }
}