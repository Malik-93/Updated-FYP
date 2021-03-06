module.exports = {
    reponseHandler: (res, status, data) => {
        return res.status(status).json({ ...data })
    },
    couponGenerator: () => {
        var coupon = "";
        var possible = "abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++) {
            coupon += possible.charAt(Math.floor(Math.random() * possible.length));
        }
        return coupon;
    }
}