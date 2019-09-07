# Tiny Polling

[![Coverage Status](https://coveralls.io/repos/github/dericgw/tiny-polling/badge.svg?branch=master)](https://coveralls.io/github/dericgw/tiny-polling?branch=master)

🎯A very tiny (~370B) solution for polling that is offline aware

## Features
- It's small, of course
- Polls any function you pass to it at the specific interval you pass to it
- Online/Offline aware so it stops polling when offline and starts back when online
- Written in TypeScript so you get good autocompletion

## Installation
`npm i tiny-polling` or `yarn add tiny-polling`

## Example
Tiny Polling is a function that takes two parameters and returns two methods - that's it. Here it is:

```js
import { Polling } from 'tiny-polling';
import updateState from '../src/update-state'; // This could be any type of state updater like Redux, etc.

function updatePosts() {
  const posts = async () => await axios.get('/posts');
  updateState(posts);
}

// The first param is the function to poll
// The second param is the interval in seconds at which it will poll
const poll = Polling(updatePosts, 30);
poll.start(); // Starts the polling

function onExit() {
  poll.stop(); // Stop the polling
}

// Or, maybe you need to pass a callback to Polling because you have a function that takes arguments
function doSomething(params) {
  // Does something with the params
}

// Notice the second parameter is missing? The default interval is 10 seconds
const anotherPoll = Polling(() => {
  const params = { foo: false, bar: true };
  doSomething(params);
});
```

> NOTE: The callback will not be called as soon as `start()` is invoked. It will start after the
> initial interval has passed, so you may need to fire your method the first time.

## Params
| Name | Type | Required | Default | Description |
|---------------------|------------|----------|---------|---------------------------------------------------------------------------|
| `callback` | `function` | true |  | This is the callback or function that is called at the specific interval. |
| `intervalInSeconds` | `number` | false | 10 | This is the interval at which the `callback` will be called. |

## Contributing
If you find a bug, submit an issue with enough information to reproduce the bug. If you have a fix, please do not 
hesitate to submit a PR. If you feel that the API needs to be modified, open an issue so that we can discuss it first.

### Running the dev environment
1. Clone the repo - `git clone https://github.com/dericgw/tiny-polling.git` && `cd tiny-polling`
2. Install the dependencies - `yarn`
3. Run the dev server - `yarn start` (Use tests for verification)

### Testing
This package is only one JS file and it is tested pretty good. Make sure that none of the tests are breaking if changes
are made. Also, if you add new functionality and it *warrants* testing, please add tests. If you need help with this, I
will gladly help.

## Issues
If you find an issue, head over to the [Issues](https://github.com/dericgw/tiny-polling/issues) section and let me 
know about it. If you want to be super cool, you can submit a PR that fixes the issue.

## License (MIT)
[Check it out here.](./LICENSE.md)
