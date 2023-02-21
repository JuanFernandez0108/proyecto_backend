const express = require("express");
const exphbs  = require('express-handlebars');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);
const { productos } = require('./data/products.json');
const { carrito } = require('./data/cart.json');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
  })
);
app.set('view engine', 'handlebars');

app.get('/', (req, res) => {
  res.render('home', { productos });
});

app.get('/realtime', (req, res) => {
  res.render('realtime', { productos });
});

app.get('/productos', (req, res) => {
  res.render('productos', { productos });
});


app.get('/carrito', (req, res) => {
  res.render('carrito', { carrito });
});

app.post('/carrito', (req, res) => {
  const producto = productos.find((producto) => producto.id == req.body.id);
  if (producto) {
    carrito.push(producto);
    io.sockets.emit('carrito', carrito);
    res.redirect('/carrito');
  } else {
    res.status(404).send('Producto no encontrado');
  }
});

io.on('connection', (socket) => {
  console.log('Un cliente se ha conectado');
  socket.emit('productos', productos);
  socket.emit('carrito', carrito);
  socket.on('update', (data) => {
    productos.push(data);
    io.sockets.emit('productos', productos);
  });
  socket.on('delete', (data) => {
    productos = productos.filter((producto) => producto.id != data);
    io.sockets.emit('productos', productos);
  });
});

const port = 8080;
server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
