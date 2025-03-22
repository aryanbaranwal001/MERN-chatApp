# This is a Basic Chat App


- I have followed the following video, 

    https://www.youtube.com/watch?v=ntKkVrQqBYY&t=181s

- Although not exactly and the changes I have made are listed below


### The Changes between the followed Video code and My code
- I have used mongoDB community edition app with compass whereas, video used atlas.
- Changed the backend server port to 3001 from 5000 from the starting itself.
- In src/lib/utils.js, in res.cookie, expires takes in date rather than just milliseconds, and hence updated that.
- if I send multiple requests in auth/api/signup one after another (not changing the email), following errors comes up, instead of what should come.

error occured in signup controller:: Cannot set headers after they are sent to the client
node:_http_outgoing:699
    throw new ERR_HTTP_HEADERS_SENT('set');
          ^
Error [ERR_HTTP_HEADERS_SENT]: Cannot set headers after they are sent to the client
    at ServerResponse.setHeader (node:_http_outgoing:699:11)
    at ServerResponse.header (/home/eren/vscodeprojects/MERN-chatApp/backEnd/node_modules/express/lib/response.js:794:10)
    at ServerResponse.send (/home/eren/vscodeprojects/MERN-chatApp/backEnd/node_modules/express/lib/response.js:174:12)
    at ServerResponse.json (/home/eren/vscodeprojects/MERN-chatApp/backEnd/node_modules/express/lib/response.js:278:15)
    at signup (file:///home/eren/vscodeprojects/MERN-chatApp/backEnd/src/controllers/auth.controllers.js:50:21) {
    }

- added return statements for each res.status(xx).xx statements.