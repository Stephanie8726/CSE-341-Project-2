const swaggerAutogen = require('swagger-autogen')();

const doc = {
    info: {
        title: 'Cars Api',
        description: 'Cars Api'
    },
    host: 'localhost:3000',
    schemas: ['https', 'http']
};

const outputfile = './swagger.json';
const endpointsFiles = ['./routes/index.js'];

// this will generate swagger.json 
swaggerAutogen(outputfile, endpointsFiles, doc);