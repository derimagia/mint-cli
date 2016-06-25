#!/usr/bin/env node

var prompt = require('prompt');
var peppermint = require('pepper-mint');

var properties = [
  {
    name: 'email',
    description: 'Email'.green,
    hidden: false
  },
  {
    name: 'password',
    description: 'Password',
    hidden: true
  }
];

prompt.message = '';
prompt.delimiter = '';
prompt.start();

prompt.get(properties, function(err, result) {
  if (err) {
    console.log(err);
    return 1;
  }

  getTransactions(result.email, result.password);
});

function getTransactions(user, pass) {
  peppermint(user, pass)
    .then(function(mint) {
      console.log("Logged in...");

      return mint.getAccounts();
    })
    .then(function(accounts) {
      accounts.forEach(function(account) {
        var amount = "$" + account.value.toString();
        if (account.value > 0) {
          amount = amount.green;
        } else if (account.value < 0) {
          amount = amount.red;
        } else {
          amount = amount.grey;
        }

        console.log(account.fiName, account.accountName, account.accountId, amount);
      });
    })
    .fail(function(err) {
      console.error("Boo :(".red, err);
    });
}



