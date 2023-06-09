# @qavajs/xray-formatter

Xray formatter for cucumber framework

### Installation
To install formatter run

`npm install @qavajs/xray-formatter`

and add to formatter section in config file
 
cloud configuration:
```javascript
export default {
    format: ['@qavajs/xray-formatter:report/xray.out'],
    formatOptions: {
        xray: {
            client_id: 'client_id', // generated client_id from xray cloud
            client_secret: 'client_secret', // generated client_id from xray client_secret
            testExecutionKey: 'ABC-12' // test execution jira key to send result
        }
    }
}
```

server configuration:
```javascript
export default {
    format: ['@qavajs/xray-formatter:report/xray.out'],
    formatOptions: {
        xray: {
            endpoint: 'https://your.jira.instance/jira', //jira api endpoint
            client_secret: 'client_secret', // personal access key from jira instance
            testExecutionKey: 'ABC-12' // test execution jira key to send result
        }
    }
}
```

### How it works?
Plugin reads all tags in jira key format (@ABCD-123) and update corresponding scenarios in provided test execution

### Development
`npm install`

add config file xrayConfig.ts to test-e2e

### F.A.Q
- Does it work with Jira Server?
  
  Yes
  
- What multiple test automated cases mapped to one xray test case?
  
  Test will get status from last result with corresponding tag
  
- What multiple xray cases mapped to one test automation case?
  
  All mapped test cases will get same status

