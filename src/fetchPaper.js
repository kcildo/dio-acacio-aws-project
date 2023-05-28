"use strict";

const AWS = require('aws-sdk');

const fetchPaper = async event => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();
    const {id} = event.pathParameters;

    let paper;

    try {
        const result = await dynamoDB.get({
            TableName: 'PaperTypes',
            Key: {id}
        }).promise();

        paper = result.Item;
    }catch (error) {
        console.log(error);
    }

    return{
        statusCode: 200,
        body: JSON.stringify(paper)
    }
}

module.exports = {
    handler: fetchPaper
};
