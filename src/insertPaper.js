"use strict";

const {v4} = require('uuid');
const AWS = require('aws-sdk');

const insertPaper = async (event) => {
    const {name} = JSON.parse(event.body);
    const createdAt = new Date().toISOString();
    const id = v4();
    const {price} = JSON.parse(event.body);

    const dynamodb = new AWS.DynamoDB.DocumentClient();

    const newPaper = {
        id,
        name,
        price,
        createdAt,
        paperStatus: false
    }

    await dynamodb.put({
        TableName: 'PaperTypes',
        Item: newPaper
    }).promise()

    return {
        statusCode: 200,
        body: JSON.stringify(newPaper)
    };
}

module.exports = {
    handler: insertPaper
};