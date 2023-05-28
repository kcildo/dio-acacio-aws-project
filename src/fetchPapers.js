"use strict";

const AWS = require('aws-sdk');

const fetchPapers = async event => {
    const dynamoDB = new AWS.DynamoDB.DocumentClient();

    let papers;

    try {
        const result = await dynamoDB.scan({
            TableName: 'PaperTypes'
        }).promise();

        papers = result.Items;
    }catch (error) {
        console.log(error);    
    }

    return{
        statusCode: 200,
        body: JSON.stringify(papers)
    };
}

module.exports = {
    handler: fetchPapers
};