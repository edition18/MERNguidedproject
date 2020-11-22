This project is a guided project with the udemy course MERN Stack Front to Back

1. Enabling of user account creation
2. Enabled people to add/edit profiles
   1. People may add socials
   2. Add their github
   3. Work and Educational information
3. Pseudo-community function where people can post items and comment

DEPLOYED TO:

- https://limitless-forest-89085.herokuapp.com/dashboard

- added node_modules/ to .gitignore

  - so git will ignore node_modules when uploading to repo

- used npm init to start of with some base properties of the projects

### installed the following dependencies

    express-validator => validate express for fields that need to be there

    bcryptjs => encryption

    config => for global variables

    gravatar => for global avatars

    jsonwebtoken => token for validation

    mongoose => for interacting with mongo

    request => for interacting with another api (for github later)

### DEV DEPENDENCIES

    nodemon => for development use

    concurrently => allow us to run backend and react with 1 command

    uuid => create unique ids

    react-client-app => react client
