'use strict'

const assert = require('assert')
const got = require('got')

const url = 'https://circleci.com/api/v1.1/project/github/{username}/{project}/settings?circle-token={token}'

module.exports = {
  get: Circle(get),
  set: Circle(set),
  remove: Circle(remove)
}

function get (data) {
  return got(createUrl(data), { json: true }).then((response) => response.body.aws.keypair)
}

function set (data) {
  assert(data.access_key_id, 'access_key_id is required')
  assert(data.secret_access_key, 'secret_access_key is required')

  return got.put(createUrl(data), {
    body: {
      aws: {
        keypair: {
          access_key_id: data.access_key_id,
          secret_access_key: data.secret_access_key
        }
      }
    },
    headers: {
      'content-type': 'application/json'
    },
    json: true
  })
    .then(() => null)
}

function remove (data) {
  return got.put(createUrl(data), {
    body: JSON.stringify({
      aws: {
        keypair: null
      }
    }),
    headers: {
      'content-type': 'application/json'
    },
    json: true
  })
    .then(() => null)
}

function Circle (fn) {
  return function circle (data) {
    assert(data, 'data is required')
    assert(data.username, 'username is required')
    assert(data.project, 'project is required')
    assert(data.circle_token, 'circle_token is required')

    return fn.apply(null, arguments)
  }
}

function createUrl (data) {
  return url
    .replace('{username}', data.username)
    .replace('{project}', data.project)
    .replace('{token}', data.circle_token)
}
