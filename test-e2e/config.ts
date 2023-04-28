import xrayConfig from './xrayConfig';
export default {
    paths: ['test-e2e/features/**/*.feature'],
    require: ['./test-e2e/step_definitions/custom_steps.ts'],
    format: ['./src/formatter.ts', 'json:test-e2e/report/report.json'],
    formatOptions: {
        xray: xrayConfig
    },
    publishQuiet: true
}
