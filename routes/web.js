const homeController = require('../app/http/controllers/homeController');
const authController = require('../app/http/controllers/authController');
const cartController = require('../app/http/controllers/customers/cartController');
const orderController = require('../app/http/controllers/customers/orderController');
const guest = require('../app/http/middleware/guest');
const auth = require('../app/http/middleware/auth');
const admin = require('../app/http/middleware/admin');
const adminOrderController = require('../app/http/controllers/admin/orderController');
const statusController = require('../app/http/controllers/admin/statusController');

function initRoutes(app) {
  app.get('/', homeController().index);

  //Login routes
  app.get('/login', guest, authController().login);
  app.post('/login', authController().postLogin);

  //Register routes
  app.get('/register', guest, authController().register);
  app.post('/register', authController().postRegister);

  //Logout route
  app.post('/logout', authController().logout);

  //Cart routes
  app.get('/cart', cartController().index);
  app.post('/update-cart', cartController().update);

  //Post login protected routes
  app.post('/orders', auth, orderController().store);
  app.get('/customer/orders', auth, orderController().index);
  app.get('/customer/orders/:id', auth, orderController().show);

  //Admin protected routes
  app.get('/admin/orders', admin, adminOrderController().index);
  app.post('/admin/order/status', admin, statusController().update);
}

module.exports = initRoutes;
