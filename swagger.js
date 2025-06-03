const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Collections Api',
        description: 'Cars and Customers API'
    },
    host: 'cse-341-project-2-l64f.onrender.com',
    schemes: ['https']
};

const outputfile = './swagger.json';

// const endpointsFiles = ['./routes/index.js']; // added the cars and customers endpoints
const endpointsFiles = ['./routes/index.js', './routes/cars.js', './routes/customers.js'];

// this will generate swagger.json 
swaggerAutogen(outputfile, endpointsFiles, doc);