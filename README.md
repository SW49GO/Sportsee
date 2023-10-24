
# <p align="center">Develop an analytics dashboard with React - SportSee</p>
SportSee is a startup dedicated to sports coaching. This Web app  presents a new version of the user profile page.This update will allow users to track their activity in more detail, including allowing them to monitor the number of sessions completed and the number of calories burned.

## 🛠️ Tech Stack :
- [React](https://reactjs.org/)
- HTML, CSS Modules, JavaScript
- [NodeJS (**version 12.18**)](https://nodejs.org/en/)
- [npm  (**frontend**)](https://www.npmjs.com)
- [yarn (**backend**)](https://yarnpkg.com) 


## 🛠️ Installation Backend :
1-Clone the following repository on your computer
git clone https://github.com/SW49GO/P9-front-end-dashboard

2-Install Dependencies   
```bash
yarn install
```
3-Run the backend (default port: 3000)
```bash
yarn dev
```
## 🛠️ Installation Frontend :
1-Clone the following repository on your computer
https://github.com/SW49GO/Sportsee

2-Install Dependencies   
```bash
npm install
```
3-Run the frontend (default port: 3001)
```bash
npm start
```

## 🧑🏻‍💻 Usage Default environment : (.env)
```js
REACT_APP_DATA_MOCKED = false
REACT_APP_USER_PROD = true
```
_⚠️Manually configurable_
<small>
- in folder sportsee/src/services/api.js for - data mocked or api

- in folder sportsee/src/context/Context.jsx for - mode users production or developer
</small>

## Useful end points :
_Default Users_:
- http://localhost:3001/user/12
- http://localhost:3001/user/18

_In Developer mode_:
- User Informations and Completion the daily goal : http://localhost:3001/user/${userId}
- Information on weight and calories burned and 
on the calories, proteins, carbohydrates and lipids of the day:  http://localhost:3000/user/${userId}/activity
- User's performance (energy, endurance, etc.) http://localhost:3000/user/${userId}/performance
- Information on average session duration: http://localhost:3000/user/${userId}/average-sessions
