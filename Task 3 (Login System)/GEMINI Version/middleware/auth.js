const requireAuth = (req, res, next) => {
    if (req.session && req.session.user) {
        next(); // User is authenticated, proceed to the route
    } else {
        res.status(401).send('Unauthorized: Please log in first.');
    }
};

module.exports = requireAuth;