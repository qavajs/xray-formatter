import {
    Formatter,
    IFormatterOptions
} from '@cucumber/cucumber';
import { XRayOptions, XrayClient } from './XrayClient';
import { TestCaseFinished } from '@cucumber/messages';
import { ITestCaseAttempt } from '@cucumber/cucumber/lib/formatter/helpers/event_data_collector';
export default class XrayFormatter extends Formatter {

    formatterOptions: XRayOptions;
    client: XrayClient;

    constructor(options: IFormatterOptions) {
        super(options);
        options.eventBroadcaster.on('envelope', this.processEnvelope.bind(this));
        this.formatterOptions = options.parsedArgvOptions.xray as XRayOptions;
        this.client = new XrayClient(this.formatterOptions);
    }

    async processEnvelope(envelope: any) {
        if (envelope.testCaseFinished) {
            return this.finishTestCase(envelope.testCaseFinished)
        }
    }

    async finishTestCase(testCaseAttempt: TestCaseFinished) {
        if (testCaseAttempt.willBeRetried) return;
        const testCase: ITestCaseAttempt = this.eventDataCollector.getTestCaseAttempt(testCaseAttempt.testCaseStartedId);
        await this.client.finishTest(testCase);
    }

}
