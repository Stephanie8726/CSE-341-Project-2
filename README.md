git rm --cached .env
git commit -m "Remove .env file from repository"

rtrl+shiftp => rest commend


##### PACKAGES INSTALLED #####
to start npm init (to create package json)

**express:              npm i express
**mongodb:              npm i mongobd
                        npm i dotenv
                        npm i body parser
                        npm i swagger-ui-express
                        npm i swagger-autogen
to handle API error:    npm --save http-errors 
add validation:         npm i --save express-validator
                        npm i --save passport
user object             npm i --save express-session 
                        npm i passport-github2
                        npm i cors



node swagger.js - will auto generate update swagger


###### Tutorial Videos #######
https://youtu.be/K00J87SofEc               --> Node and Express Tutorial
https://video.byui.edu/media/t/1_u8dzgu7e  --> Github Installation and Project Initialization
https://video.byui.edu/media/t/1_daxwlcz2  --> Push to GitHub and Start with Express
https://video.byui.edu/media/t/1_4dj3ierr  --> Install MongoDB and Import data
https://video.byui.edu/media/t/1_ujfu8vdx  --> Connect your node project to MongoDB
https://video.byui.edu/media/t/1_0juwmhcn  --> Add the Get and GetAll endpoints
https://video.byui.edu/media/t/1_r4st3h0l  --> Deploy and Test
https://video.byui.edu/media/t/1_ny7b9yty  --> Add the PUT, POST, and DELETE routes
https://video.byui.edu/media/t/1_7q9t1bof  --> Add Swagger API Documentation to your project
https://youtu.be/yNO-eA-8Fuo               --> Handling API Errors | RESTful API using NodeJS and MongoDB
https://video.byui.edu/media/t/1_al422bex  --> Add Login Functionality (OAuth)

https://youtu.be/PdFdd4N6LtI               --> Simplified Oauth 2.0 Tutorial - Example with Node.js
https://youtu.be/KRCh6mSSsb8               --> OAuth (Passport.js) Tutorial #12 - Saving User to MongoDB


### Published Link ###
https://cse-341-project-2-l64f.onrender.com
https://cse-341-project-2-l64f.onrender.com/cars
https://cse-341-project-2-l64f.onrender.com/api-docs/ --> swagger



######## Commit Changes #########
***Add and commit the resolved file
git add swagger.json

git add .
git commit -m "Resolved merge conflict in swagger.json"

****Push the changes to GitHub
git push origin main


git rm -r --cached node_modules
git rm --cached .env
git rm -r --cached dist


GITHUB COLLECTIONS
settings --> developer settings -- github apps --> fill out --> add collections