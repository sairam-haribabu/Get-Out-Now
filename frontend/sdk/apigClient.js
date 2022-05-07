/*
 * Copyright 2010-2016 Amazon.com, Inc. or its affiliates. All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with the License.
 * A copy of the License is located at
 *
 *  http://aws.amazon.com/apache2.0
 *
 * or in the "license" file accompanying this file. This file is distributed
 * on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either
 * express or implied. See the License for the specific language governing
 * permissions and limitations under the License.
 */

var apigClientFactory = {};
apigClientFactory.newClient = function (config) {
    var apigClient = { };
    if(config === undefined) {
        config = {
            accessKey: '',
            secretKey: '',
            sessionToken: '',
            region: '',
            apiKey: undefined,
            defaultContentType: 'application/json',
            defaultAcceptType: 'application/json'
        };
    }
    if(config.accessKey === undefined) {
        config.accessKey = '';
    }
    if(config.secretKey === undefined) {
        config.secretKey = '';
    }
    if(config.apiKey === undefined) {
        config.apiKey = '';
    }
    if(config.sessionToken === undefined) {
        config.sessionToken = '';
    }
    if(config.region === undefined) {
        config.region = 'us-east-1';
    }
    //If defaultContentType is not defined then default to application/json
    if(config.defaultContentType === undefined) {
        config.defaultContentType = 'application/json';
    }
    //If defaultAcceptType is not defined then default to application/json
    if(config.defaultAcceptType === undefined) {
        config.defaultAcceptType = 'application/json';
    }

    
    // extract endpoint and path from url
    var invokeUrl = 'https://xlvb6nuhve.execute-api.us-east-1.amazonaws.com/alpha';
    var endpoint = /(^https?:\/\/[^\/]+)/g.exec(invokeUrl)[1];
    var pathComponent = invokeUrl.substring(endpoint.length);

    var sigV4ClientConfig = {
        accessKey: config.accessKey,
        secretKey: config.secretKey,
        sessionToken: config.sessionToken,
        serviceName: 'execute-api',
        region: config.region,
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var authType = 'NONE';
    if (sigV4ClientConfig.accessKey !== undefined && sigV4ClientConfig.accessKey !== '' && sigV4ClientConfig.secretKey !== undefined && sigV4ClientConfig.secretKey !== '') {
        authType = 'AWS_IAM';
    }

    var simpleHttpClientConfig = {
        endpoint: endpoint,
        defaultContentType: config.defaultContentType,
        defaultAcceptType: config.defaultAcceptType
    };

    var apiGatewayClient = apiGateway.core.apiGatewayClientFactory.newClient(simpleHttpClientConfig, sigV4ClientConfig);
    
    
    
    apigClient.attendeventGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['name', 'eventid'], ['body']);
        
        var attendeventGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/attendevent').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['name', 'eventid']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(attendeventGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.attendeventOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var attendeventOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/attendevent').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(attendeventOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.eventGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['eventid'], ['body']);
        
        var eventGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['eventid']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(eventGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.eventOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var eventOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/event').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(eventOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['friendname', 'username'], ['body']);
        
        var followGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/follow').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['friendname', 'username']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.followOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var followOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/follow').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(followOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.friendseventsGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['username'], ['body']);
        
        var friendseventsGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/friendsevents').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['username']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(friendseventsGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.friendseventsOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var friendseventsOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/friendsevents').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(friendseventsOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.profileGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['username'], ['body']);
        
        var profileGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/profile').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['username']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(profileGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.profileOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var profileOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/profile').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(profileOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.searchGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['query'], ['body']);
        
        var searchGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/search').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['query']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(searchGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.searchOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var searchOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/search').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(searchOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.uploaddpItemPut = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['item', 'Content-Type'], ['body']);
        
        var uploaddpItemPutRequest = {
            verb: 'put'.toUpperCase(),
            path: pathComponent + uritemplate('/uploaddp/{item}').expand(apiGateway.core.utils.parseParametersToObject(params, ['item', ])),
            headers: apiGateway.core.utils.parseParametersToObject(params, ['Content-Type']),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(uploaddpItemPutRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.uploaddpItemOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var uploaddpItemOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/uploaddp/{item}').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(uploaddpItemOptionsRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userinfoGet = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, ['photo', 'username', 'bio', 'email', 'name'], ['body']);
        
        var userinfoGetRequest = {
            verb: 'get'.toUpperCase(),
            path: pathComponent + uritemplate('/userinfo').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, ['photo', 'username', 'bio', 'email', 'name']),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userinfoGetRequest, authType, additionalParams, config.apiKey);
    };
    
    
    apigClient.userinfoOptions = function (params, body, additionalParams) {
        if(additionalParams === undefined) { additionalParams = {}; }
        
        apiGateway.core.utils.assertParametersDefined(params, [], ['body']);
        
        var userinfoOptionsRequest = {
            verb: 'options'.toUpperCase(),
            path: pathComponent + uritemplate('/userinfo').expand(apiGateway.core.utils.parseParametersToObject(params, [])),
            headers: apiGateway.core.utils.parseParametersToObject(params, []),
            queryParams: apiGateway.core.utils.parseParametersToObject(params, []),
            body: body
        };
        
        
        return apiGatewayClient.makeRequest(userinfoOptionsRequest, authType, additionalParams, config.apiKey);
    };
    

    return apigClient;
};
