const e = require('express');
const {envelopes} = require('../config/db');
const {getElementById, getNewId, getIndexById} = require('../utils/utils');


const envelopesController = {
    getEnvelopes:(req,res) =>{
        res.status(200).send(envelopes);
        console.log(envelopes)
    },
    paramId:(req,res,next)=>{
        const id = Number(req.params.id);
        if(id){
            const envelope = getElementById(envelopes,id);
            if(envelope){
                req.body.envelope = envelope;
                next();
            }else{
                res.status(404).send();
            }
        }else{
            res.status(400).send();
        }
    },

    getEnvelopesById:(req,res)=>{
        res.status(200).send(req.body.envelope);
    },
    
    postEnvelopes: (req,res) => {
        const envelope = req.envelope;
        envelope.id = getNewId(envelopes);
        envelopes.push(envelope);
        res.status(201).send(envelope);
    },

    paramAmount: (req,res,next)=>{
        const withdraw = Number(req.params.amount);
        const envelope = req.body.envelope;
        if(withdraw < envelope.balance){
            envelope.balance -= withdraw;
            req.body.amount = withdraw;
            req.body.envelope = envelope;
            next();
        }else{
            res.status(400).send(envelope);
        }
    },

    postAmount:(req,res) =>{
        res.status(400).send(req.body.envelope);
    },

    deleteByID:(req,res)=>{
        const index = getIndexById(envelopes,req.body.envelope.id);
        envelopes.splice(index,1);
        res.status(204).send();
    },

    paramTo:(req,res,next)=>{
        const to = Number(req.params.to);
        if(to){
            const toEnvelope = getElementById(envelopes, to);
            if(toEnvelope){
                req.body.toEnvelope = toEnvelope;
                next();
            }else{
                res.status(404).send();
            }
        }else{
            res.status(400).send();
        }
    },

    postToAmount:(req,res)=>{
        const toEnvelope = req.body.toEnvelope;
        const amount = req.body.amount;
        toEnvelope.balance += amount;
        res.status(200).send();
    },

}

const validateEnvelope = (req, res, next) => {
    const envelope = req.body;
    if (envelope.category && envelope.balance) {
      req.envelope = envelope;
      next();
    } else {
      res.status(400).send();
    }
  };

module.exports = {envelopesController,validateEnvelope}