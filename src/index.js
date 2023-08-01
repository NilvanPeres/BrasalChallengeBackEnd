const server = require('./server'); 

const port = process.env.PORT || 5000;

const startServer = async () => {
  try {
    await server.listen(port);
    console.log(`Server listening on port ${port}`);
  } catch (error) {
    console.error(error);
  }
}

startServer();