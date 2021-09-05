const { ASTRA_KEYSPACE, ASTRA_TABLE }= require('../config/constant');
const { client, types } = require('../config/db')

// @desc    Get all transactions
// @route   GET /api/v1/transactions
// @access  Public
exports.getTransactions = async (req, res, next) => {
  try {

    let getQuery = `SELECT * FROM expense.transaction;`
    const transactions = await client.execute(getQuery)

    console.log(transactions)
    return res.status(200).json({
      success: true,
      count: transactions.rowLength,
      data: transactions.rows
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}

// @desc    Add transaction
// @route   POST /api/v1/transactions
// @access  Public
exports.addTransaction = async (req, res, next) => {
  try {
    const { description, amount } = req.body;
    const descId = types.Uuid.random()
    const data = JSON.stringify({
      descId, 
      description, 
      amount
    })

    
    let createQuery = `INSERT INTO ${ASTRA_KEYSPACE}.${ASTRA_TABLE}(descId, description, amount) VALUES(?,?,?)`; 
    const transaction = await client.execute(createQuery, [descId, description, amount], { prepare: true })
    
    console.log(transaction)
    return res.status(201).json({
      success: true,
      data: transaction
    }); 

  } catch (err) {
     
    if(err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    } else {
      return res.status(500).json({
        success: false,
        error: 'Internal Server Error...'
      });
    }
  }
}





// @desc    Delete transaction
// @route   DELETE /api/v1/transactions/:id
// @access  Public
exports.deleteTransaction = async (req, res, next) => {
  try {
            let deleteQuery = `DELETE FROM ${ASTRA_KEYSPACE}.${ASTRA_TABLE} WHERE descId=?;`; 
            var transaction = await client.execute(deleteQuery, [req.params.descId], { prepare: true })
                

            if(!transaction) {
                res.status(404).json({
                  message: 'No transaction found'
                 })
            }

            return res.status(200).json({
              success: true, 
              data: {}
            })

  } catch (err) {
    return res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
}