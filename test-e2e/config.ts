export default {
    paths: ['test-e2e/features/**/*.feature'],
    require: ['./test-e2e/step_definitions/custom_steps.ts'],
    format: ['./src/formatter.ts', 'json:test-e2e/report/report.json'],
    formatOptions: {
        xray: {
            client_id: 'client_id', // generated client_id from xray cloud
            client_secret: 'client_secret', // generated client_id from xray client_secret
            testExecutionKey: 'ABC-12', // test execution jira key to send result
            tagRegexp: 'TEST_(.+)' // optional, parse tag regexp. default /@(.+-\d+)/
        }
    },
    publishQuiet: true
}
