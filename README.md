# Commoji - A Discord Clone
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

## Wiki
* [Feature List](https://github.com/Geoffst3r/python-group-project/wiki/feature-list)
* [Frontend Routes](https://github.com/Geoffst3r/python-group-project/wiki/Front-End-Routes)
* [API Routes](https://github.com/Geoffst3r/python-group-project/wiki/API-routes)
* [Redux Store](https://github.com/Geoffst3r/python-group-project/wiki/Redux-State)

## Technical Implementation


![Splash Page](https://github.com/Geoffst3r/python-group-project/blob/main/images/NewSplashPageScreenShor.png)
On our splash page you can create a account and log into a account with a model that pops up when you click on the login or sighn in buttons. You can also use the Demo Now button to log in as a demo user.

***

![The Servers,Channels,and Messages Page](https://github.com/Geoffst3r/python-group-project/blob/main/images/latest%20servers%20and%20channels%20page.png)
On our Servers,Channels,and Messages Page you can create a server,channel,message or edit a server,channel. You click on the green plus sighn to create a Server and the grey plus sighn to create a Channel. You can not create a server or channel with empty names and discriptions, but the url can be empty.

***

![Reactions Page](https://github.com/Geoffst3r/python-group-project/blob/main/images/Reactions.png)
On our reactions page you can open the reactions menu by pressing the plus button. From there you can select from the reactions and upon clicking one it will be added to a message and if you click your own reaction it will be deleated. You can also increase the number of reactions on a post either through the menu or clicking the reaction iself below the message.

***

## Future Features
- Private servers
- Friends
- DMs
- Emojis in the messages
