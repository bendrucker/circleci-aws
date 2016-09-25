#!/usr/bin/env node

'use strict'

const meow = require('meow')
const snake = require('snakecase-keys')
const circle = require('./')

const cli = meow(`
  Usage
    get     circleci-aws
    set     circleci-aws set --access-key-id <id> --secret-access-key <secret>
    remove  circleci-aws remove

  Options
    --username      Project's username (required)
    --project       Project repository name (required)
    --circle-token  CircleCI API token (required)
`)

const run = circle[cli.input[0] || 'get']

run(snake(cli.flags))
  .then(JSON.stringify)
  .then(console.log)
