const router = require('express').Router();

const knex = require('../data/dbConfig');

router.get('/', (req, res) => {
    knex
      .select('*')
      .from('accounts')
      .then(accounts => {
          res.status(200).json(accounts);
      })
      .catch(() => res.status(500).json({ error: 'Failed to retrieve the accounts' }));
});

router.get('/:id', (req, res) => {
    knex('accounts') // same as above (.select + .from)
      .where({ id: req.params.id })
      .first()
      .then(account => {
        if (account) {
          res.status(200).json(account);
        } else {
          res.status(404).json({ message: 'Failed to retrieve the account' });
        }
      });
  });

  router.post('/', (req, res) => {
      knex('accounts')
        .insert(req.body)
        .then(data => {
            knex('accounts').where({ id: data[0] })
            .then(account => {
                res.status(201).json(account);
            })
            .catch(() => res.status(500).json({ error: 'Failed to add the account' }));
        })
        .catch(() => res.status(500).json({ error: 'Failed to add the account. Make sure to include name and budget.' }));
  });

  router.put('/:id', (req, res) => {
      knex('accounts')
        .where({ id: req.params.id })
        .update(req.body)
        .then(account => {
            res.status(200).json(account);
        })
        .catch(() => res.status(500).json({ error: 'Failed to update the account' }));
    });

    router.delete('/:id', (req, res) => {
        knex('accounts')
          .where({ id: req.params.id })
          .del()
          .then(deletedAccounts => {
              res.status(200).json({ message: `${deletedAccounts} record(s) deleted` });
          })
          .catch(() => res.status(500).json({ error: 'Failed to delete the account' }));
    })

module.exports = router;