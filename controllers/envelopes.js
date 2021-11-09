const pool = require('../config/db');

const envelopesController = {
    getEnvelopes: async(req,res) =>{
        try{
            const allEnvelopes = await pool.query('SELECT * FROM envelopes ORDER BY id');
            if(allEnvelopes.row < 1){
                return res.status(404).send({
                    message:"There are no envelopes"
                });
            }
            res.status(200).send({
                status:"Success",
                message: 'Envelopes information retrieved!',
                data: allEnvelopes.rows,
            });
        }catch(err){
            console.log(err.message);
        }
    },
    getEnvelopesById: async(req,res) =>{
        try{
            const {envelopeId} = req.params;
            const anEnvelope = await pool.query('SELECT * FROM envelopes WHERE id = $1', [envelopeId]);
            if(anEnvelope.row < 1){
                return res.status(404).send({
                    message: "There is no envelope with this id"
                });
            };
            res.status(200).send({
                status: 'Success',
                message: 'Envelope information retrieved!',
                data: anEnvelope.rows[0]
            });
        }catch(err){
            console.log(err.message)
        }
    },
    addEnvelopes: async(req,res) =>{
        try {
            const { title, budget } = req.body;
            const newEnvelope = await pool.query('INSERT INTO envelopes (title, budget) VALUES ($1, $2) RETURNING *', 
            [title, budget]);
            res.status(201).send({
                status: 'Success',
                message: 'New envelope created!',
                data: newEnvelope.rows[0]
            });
        } catch (error) {
            console.error(error.message);
        };
    },
    updateEnvelopes: async(req,res)=>{
        try{
            const {envelopeId} = req.params;
            const {title, budget} = req.body;
            const updatedEnvelope = await pool.query('UPDATE envelopes SET title = $1, budget = $2 WHERE id = $3', 
            [title, budget, envelopeId]);
            res.status(200).send({
                status: 'Success',
                message: 'The envelope has been updated!',
                data: updatedEnvelope.rows[0]
            }) 
        }catch(err){
            console.log(err.message)
        }
    },
    deletedEnvelopes: async(req,res)=>{
        try{
            const {envelopeId} = req.params;
            const findEnvelope = await pool.query('SELECT * FROM envelopes WHERE id = $1', [envelopeId]);
            if(findEnvelope.row < 1){
                return res.status(404).send({
                    message: "There is no envelope with this id"
                });
            };
            await pool.query('DELETE FROM envelopes WHERE id = $1', [envelopeId]);
            res.status(200).send({
                message: "Success"
            })
        }catch(err){
            console.log(err.message)
        }
    },
    transferEnvelopes: async(req,res)=>{
        try{
            const {from, to} = req.params;
            const {amount} = req.body;
            await pool.query('UPDATE envelopes SET budget = budget - $1 WHERE id = $2', [amount, from]);
            await pool.query('UPDATE envelopes SET budget = budget + $1 WHERE id = $2', [amount, to]);
            res.json(`The budget of the envelopes number ${from} and ${to} have been successfully updated`);
        }catch(err){
            console.log(err.message)
        }
    } 

}

module.exports = envelopesController