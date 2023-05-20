const express = require('express');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();

const FetchUser = async (req, res, next) => {
    try {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send({ message: 'Missing token' });
    }
      const data = jwt.verify(token, process.env.JWT_SECRET);
      req.user = data.user;
      next();
    } catch (error) {
      console.log(error);
      if (error.name === 'JsonWebTokenError') {
        return res.status(401).send({ message: 'Invalid token' });
      }
      // Handle other types of JWT errors separately if needed
  
      return res.status(500).send({ message: 'Internal server error' });
    }
  };
  

module.exports = FetchUser