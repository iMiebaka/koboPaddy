# KoboPaddy
 Welcome to the KoboPaddy. An investment platform to next level investor
 
[![Banner](dashboard.png)](https://kobopaddy.onrender.com)
 


## How does it work
KoboPaddy comes with several varities of invesment offer as well as a secured wallet to ensure funds a properly managed.
Technologies used are Django, Channels, React, Redux, React hook form, tailwind for styling and Docker.

## Setup
For the most part Docker will run the project, see next step below


## Execution

* Clone the repo
* Setup the env, expecially the email
* Spin up docker `docker compose up`

To run the test use the command below:
`ENV=test python manage.py test --keepdb`
Or throught docker using this (NB the container has to up):

`docker-compose exec api sh -c ENV=test python manage.py test --keepdb`

## To add investment (ADMIN)
* Go to the  <a href="http://localhost:8000/admin">admin dashboard</a> (Use the admin credential provided via email)
* Click add new investment
* Fill in the required information (plan, mini_investment etc)
* Click save

## Become an investor
All investor must have a have a valid account to use the platform. To fullfill this process, you have a to sign up with your fullname, email and password. Upon completion a validation link will be sent to your email. 
Also to note that investemnt plans will make use of available balance on the wallet.

#### Credit wallet
To credit wallet simply enter the value and wait for admin to confirm creditation.

#### Making investment
To make an investment, simply select the investment plan you wish to invest in and click on the invest

When response has been mad on you request, you will get both email and notification website.


## Extras
We added extras for GUI DB access.
To access pgdb admin, see credentials in the example env
* Go to the click <a href="http://localhost:5050">admin page link</a> 