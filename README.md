
<a name="readme-top"></a>

<!-- PROJECT LOGO -->
## DockerX | Safe and Secure Bike Storage Solution

## About

This is the application for integration with hardware smart lock system.
With this map based user navigation system, user is able to:
 - Find different types of bike storage system in town, select it reserve or lock storage of choice for a specific fee.
 - Application focused on daily commuters, but there is toogle function for Google Maps roads and labels to make map more informative for tourists.
 - For everyone by default map will list: bike stores, services, drinking fountains, for users to make it easier to navigate.
 
This application is all in one go to for people who ride bikes and e-scooters. 

## Built With

#### Development tools <br>
![developer](https://skillicons.dev/icons?i=react,redux,nodejs,express,docker&perline=5)
#### Cloud Services
![cloud](https://skillicons.dev/icons?i=aws&perline=3) <br>
#### Database
![cloud](https://skillicons.dev/icons?i=mysql,&perline=3) <br>

<!-- HOW TO USE LOCALLY -->
## How to Setup
 - Setup Mysql Workbench, setup Mysql server
 - If you want to add docking station:
 -  cd admin & npm i & update local ip address & server port in App.jsx 25/26 lines. & npm start
 -  Setup server:
 -   cd .. & cd server & npm i & npm run dev
 -    Insert your database server info to according fields inside server/database/pool.js
 -    ... Further structure will be updated ...

<!-- ROADMAP -->
## Roadmap
- [x] Map based navigation with Google Maps
- [x] Find local bike stations in your area
- [ ] list public places of user choice
    - [ ] Google Maps labels and roads
    - [ ] Custom places (bike stores, services, drinking fountains) from database
- [ ] OAuth 2.0 user authentication system
- [ ] Payment system with Stripe
- [ ] Navigation choice of route system provider (Waze, Google Maps, Apple Maps)
- [ ] Deploy API service to AWS BeanStalk
- [ ] Setup mySQL database on AWS
- [ ] Deploy front-end on AWS S3 Bucket
    - [ ] Nested Feature

See the [open issues](https://github.com/DuudeXXI/dockerx_application/issues) for a full list of proposed features (and known issues).

<!-- CONTACT -->
## Contact

[![linkedin][linkedin-shield]][linkedin-url]<br>



[linkedin-shield]: https://skillicons.dev/icons?i=linkedin,&perline=3
[linkedin-url]: https://linkedin.com/in/vaidas-buslavicius
