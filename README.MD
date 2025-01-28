# @qavajs/xray-formatter

Xray formatter for cucumber framework

### Installation
To install formatter run

`npm install @qavajs/xray-formatter`

add to formatter section in config file
 
cloud configuration:
```javascript
export default {
    format: ['@qavajs/xray-formatter:report/xray.out'],
    formatOptions: {
        xray: {
            client_id: 'client_id', // generated client_id from xray cloud
            client_secret: 'client_secret', // generated client_id from xray client_secret
            testExecutionKey: 'ABC-12', // test execution jira key to send result
            tagRegexp: 'TEST_(.+)' // optional, parse tag regexp. default /@(.+-\d+)/
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
            testExecutionKey: 'ABC-12', // test execution jira key to send result
            tagRegexp: 'TEST_(.+)' // optional, parse tag regexp
        }
    }
}
```

### How it works?
Plugin reads all tags in jira key format (@ABCD-123) or ones that matches `tagRegexp` and update corresponding scenarios in provided test execution

### Development
`npm install`

add config file xrayConfig.ts to test-e2e

### F.A.Q
- Does it work with Jira Server?
  
  Yes
  
- What if multiple automated test cases are mapped to one Xray test case?

  The Xray test will fail if any one of the test cases fails.
  
- What multiple xray cases mapped to one test automation case?
  
  All mapped test cases will get same status

