# Kommoji - A Discord Clone
[Commoji](https://commoji.herokuapp.com)

[Wiki](https://github.com/Geoffst3r/python-group-project/wiki)

## At A Glance
Commoji is a full stack web application that allows only logged users to:
 - Post a server
 - The creator can Edit a posted server
 - The creator can Delete a posted server
 - Post an channel to a posted server
 - Edit an channel
 - Delete an channel
 - Post a message to a channel
 - Post a reaction to a message

## Application Architecture
Commoji is built with a REACT frontend and an Flask backend. PostgreSQL is also used as a database. And with socket.io to allow live chat.

## Frontend Technologies Used
Commoji uses REACT to generate the HTML elements, and then we use CSS to handling the styling of those elements.

## Backend Technologies Used
We used an Flask server to handle the backend communication. We used PostgreSQL to use and manipulate the database with sequelize.

![Splash Page](https://github.com/Geoffst3r/python-group-project/blob/main/images/Splash-Page.png)
On our splash page you can create a account and log into a account with a model that pops up when you click on the login or sighn in buttons. You can also use the Demo Now button to log in as a demo user.

***

![The Servers,Channels,and Messages Page](https://github.com/Geoffst3r/python-group-project/blob/main/images/Screenshot%202022-01-13%20192220.png)
On our Servers,Channels,and Messages Page you can create a server,channel,message or edit a server,channel. You click on the greed plus sighn to create a Server and the grey plus sighn to create a Channel. You can not create a server or channel with empty names and discriptions, but the url can be empty.

***

![Reactions Page]()
On our reactions page you can open the reactions menu by pressing the button. If you click on a reaction it will be added to a message.

***
