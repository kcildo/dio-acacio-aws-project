"use strict";

const AWS = require('aws-sdk');

const updatePaper = async event => {
    const {paperStatus} = JSON.parse(event.body);
    const {id} = event.pathParameters;

    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    await dynamoDB.update({
        TableName: 'PaperTypes',
        Key: {id},
        UpdateExpression: 'set paperStatus = :paperStatus',
        ExpressionAttributeValues: {
            ':paperStatus': paperStatus
        },
        ReturnValues: 'ALL_NEW'
    }).promise();

    return{
        statusCode: 200,
        body: JSON.stringify({
            msg: 'Paper updated'
        })
    };
}
module.exports = {
    handler: updatePaper
}