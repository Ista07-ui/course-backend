const app = require('./src/app');
const courseRoutes = require('./src/courseRoutes');

const port = parseInt(process.env.PORT) || 3000;

app.use('/course', courseRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});