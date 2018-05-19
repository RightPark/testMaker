module.exports = function() {
    'use strict';


    var  result,
        config = {

            local: {
                mysql: {
                    connectionLimit: 65,
                    acquireTimeout: 30000,
                    host: '127.0.0.1',
                    port: 3306,
                    user: 'root',
                    password: 'inbros1234',
                    database: 'interiorbrothers',
                    timezone: 'KST',
                    waitForConnections:true
                }
            },
            real: {
                mysql: {
                    connectionLimit: 65,
                    acquireTimeout: 30000,
                    host: '10.0.0.1',
                    port: 3306,
                    user: 'tc99038',
                    password: 'didwlsthf17!',
                    database: 'tc99038',
                    timezone: 'KST',
                    waitForConnections:true
                }
            }
        };
    return result;

};
