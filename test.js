'use strict'

const test = require('blue-tape')
const circleAws = require('./')

const token = process.env.CIRCLE_TOKEN

test(function (t) {
  return circleAws.set({
    username: 'bendrucker',
    project: 'circleci-aws',
    circle_token: token,
    access_key_id: 'beep',
    secret_access_key: 'boop'
  })
    .then(() => get())
    .then(function (keypair) {
      t.ok(keypair.access_key_id.startsWith('xx'))
      t.ok(keypair.access_key_id.endsWith('ep'))

      t.ok(keypair.secret_access_key.startsWith('xx'))
      t.ok(keypair.secret_access_key.endsWith('op'))

      return circleAws.remove({
        username: 'bendrucker',
        project: 'circleci-aws',
        circle_token: token
      })
    })
    .then(() => get())
    .then(function (keypair) {
      t.equal(keypair, null)
    })
})

function get () {
  return circleAws.get({
    username: 'bendrucker',
    project: 'circleci-aws',
    circle_token: token
  })
}
