# This is a Basic Chat App


- I have followed the following video, 

    https://www.youtube.com/watch?v=ntKkVrQqBYY&t=181s

- Although not exactly and the changes I have made are listed below


### The Changes between the followed Video code and My code
- I have used mongoDB community edition app with compass whereas, video used atlas.
- Changed the backend server port to 3001 from 5000 from the starting itself.
- In src/lib/utils.js, in res.cookie, expires takes in date rather than just milliseconds, and hence updated that.
- while exporting messages in message.controllers.js I have sorted them