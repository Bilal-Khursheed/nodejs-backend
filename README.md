# nodejs-backend
technologies: 
    1: nodejs
    2: mysql 
    
    
working: 
    1: use passport auth for user validation 
    2: use sequelize for mysql connection and communication (create models, migrations and seeds for the database updates and for adding bulk data to the database
    3: use a new architecture of the project like app/models (all  the models with models, routes, controllers, and middlewares in it) ,  config file contain the express file which 
    handle all the working like accessing routes, listing on the port etc
    
    in this project i have created three routes 
            1: signup (usee to add the user to the database
            2: login ( when a user ask to login with their creditientails backend compare with database and using passport save the user status 
            3: home ( after login the home route will only be accessable using passport we have checked is the user is already logined in or not
