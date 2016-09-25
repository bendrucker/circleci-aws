# circleci-aws [![Build Status](https://travis-ci.org/bendrucker/circleci-aws.svg?branch=master)](https://travis-ci.org/bendrucker/circleci-aws)

> Configure CircleCI with AWS keys


## Install

```
$ npm install --save circleci-aws
```


## Usage

### API

```js
var circleCiAws = require('circleci-aws')

circleCiAws.set({
  access_key_id: 'beep',
  secret_access_key: 'boop',
  username: 'u',
  project: 'p',
  circle_token: 'c'
})
.then(() => circleCiAws.get({
  username: 'u',
  project: 'p',
  circle_token: 'c'
}))
.then(console.log)
//=> {access_key_id...}
.then(() => circleCiAws.remove({
  username: 'u',
  project: 'p',
  circle_token: 'c'
}))
.then(console.log)
//=> null
```

### CLI

```sh
# set
circleci-aws set --username u --project p --circle-token c --access-key-id beep --secret-access-key boop
# get
circleci-aws --username u --project p --circle-token c
# remove
circleci-aws remove --username u --project p --circle-token c
```


## API

#### `circleCiAws.get(data)` -> `promise`
#### `circleCiAws.set(data)` -> `promise`
#### `circleCiAws.remove(data)` -> `promise`

##### data

*Required*  
Type: `object`

An object that always must contain the `username`, `project`, and `circle_token` and will contain `access_key_id` and `secret_access_key` when setting new values.

The returned promise will resolve with the parsed response body from Circle. This will be `null` in all cases except when calling `get` with an existing keypair.


## License

MIT © [Ben Drucker](http://bendrucker.me)
