### About
The frontend code is structured in a way that most redux based projects are structured. That is, I was following this guideline when I was making the folders: https://redux.js.org/faq/codestructure.


I divided the project in as many small components (both stateful and stateless components), in the way it made logical sense to me.

If any code was copied, it is stated in the source file with link to where it was taken from.


### Starting the project
Requirements: NPM and Node
You may run the following commands in the project directory to start the app:
```shell
> npm install
> npm run dev
```
When the server and client is ready, the url to access the app will be printed to terminal.
If this for some reason doesn't work, the app can be accessed at `http://localhost:8080`.
### Redux
Before starting the project, I spent a chunk of time reading up on redux and how to use it and apply it to my project.
After a couple weeks, I had to restart my project, as I had implemented it so horribly that it was just hard to work with. The second time around, I had learned from my mistakes, allowing me to set it up a bit better.

I used the following tutorials to learn about redux and some bits of react:
- https://redux.js.org/basics/usagewithreact
- https://egghead.io/courses/getting-started-with-redux
- https://egghead.io/courses/building-react-applications-with-idiomatic-redux
- https://hackernoon.com/react-stateless-functional-components-nine-wins-you-might-have-overlooked-997b0d933dbc
- https://reacttraining.com/

I decided to have two reducers, one for handling game state and one for authorization. It has worked very well for my setup, although I am sure it can be improved upon. A reducer is pretty much the thing that changed the state, when it sees something that it's allowed to interfere with. 

As for my actions, I've added all my API calls there. One action for calling authentication api, and one for my game api. The methods in there are all setup as returning dispatch, because I want to use it with thunk. Also, by having it this way, I can share the same code across several components by importing these dispatchers into the mapped component dispatchers.

For authentication, I ended up reading a bit here:
- http://jasonwatmore.com/post/2017/09/16/react-redux-user-registration-and-login-tutorial-example

I didn't exactly apply much of the things I read there, but it did give me some inspiration on how I wanted to handle login and logout (on the redux side of things).

### Logic
For the server I decided to mock a database in memory, just using arrays.
I'm not entirely happy with how the backend ended up, but it works as expected. 
All score validation, checking if an answer was correct or not, and such things where the user can cheat is implemented server side (so no client foolery).

As for websockets, everyone joining a room is put into a specific room.
The socket is then used to notify others that the room has changed, by sending a string, which on the frontend side is used to trigger a dispatch, which then in turn triggers a reducer, updating the state of the room. While in a room, the communication on syncing rooms doesn't happen over socket, but over http requests. All the socket does is tell the client to refetch something, and thanks to those dispatches, it works out just fine.

When the room owner is ready to start the game, they may do so when there is at least two players (including the host). Once a game is started, nothing is sent over http requests anymore - and instead, the sockets are used at full-ish capability. 

As for the game, I decided that I didn't want the players waiting for others to finish a question to move on. When a player clicks on a answer, the answer is sent over the websocket to the server, which then runs the game logic for scoring the player and giving the player object back with the updated state. This state is then sent to one of the redux reducers with dispatch. 

This way, the user is always in sync. And to keep the other clients also in sync, the game room gets a message emitted with a payload containing the new state of the room. This way, everyone is in sync and everyone knows when someone has finished the game, where in the game they are and what their scores are. 

When someone finishes the game, the player is shown who has not finished yet - and when everyone has finished, the leaderboard is shown.

Then, when everyone has left the room - the room is deleted. 


### Sources not mentioned in code

I took one of the quiz from here:  https://www.skptricks.com/2018/07/react-js-quiz-react-js-interview.html

As extra npm modules, I added the following:
- [PropTypes] - I added this to have runtime checking of the react properties. It has been helpful in catching mistakes, where I was passing some wrong values as well as catching errors when certain required items were missing.
- [axios] - I went with axios for doing async http requests, since I didn't see the point with using `fetch`. It makes doing requests with payloads so much easier, and it complements redux very well (in my opinion).
- [redux] - For handling state across multiple components. It just makes syncing up things so seamless. It's definitely a must have for react projects.
- [react-redux] -  A bunch of binders that simplifies connecting redux
- [redux-thunk] - So far, it's my favorite middleware for redux. Lifesaver for asynchronous calls, and allowed me to simplify and reuse my actions everywhere.

### Known issues
In interest of time, I haven't had the possibility to fix these issues.
However, I am aware that these are there - and would fix them if I had more time.

- Handling multiple tabs - in the current iteration of the SPA, a player is able to join the game with the same user id multiple times. Some mechanism should be added, so the user can't join in the first place (even if they can only finish the quiz once, and not with both tabs). 
- WebSocket randomly disconnects at times. (Possibly due to socket inactivity, might just need to up the timeout interval)
 
 [PropTypes]: <https://www.npmjs.com/package/prop-types>
 [axios]: <https://www.npmjs.com/package/axios>
 [redux]: <https://www.npmjs.com/package/redux>
 [react-redux]: <https://www.npmjs.com/package/react-redux>
 [redux-thunk]: <https://www.npmjs.com/package/redux-thunk>