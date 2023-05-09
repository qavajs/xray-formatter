import fetch from 'node-fetch';
import { ITestCaseAttempt } from '@cucumber/cucumber/lib/formatter/helpers/event_data_collector';
import { failed, passed } from './utils';

export type XRayOptions = {
    client_id: string;
    client_secret: string;
    testExecutionKey: string;
    endpoint?: string;
}

type AuthOptions = {
    client_id: string;
    client_secret: string;
}

export class XrayClient {

    token: Promise<string>;
    cloudXrayEndpoint: string = 'https://xray.cloud.getxray.app';
    authEndpoint: string = this.cloudXrayEndpoint + '/api/v2/authenticate';
    importExecutionEndpoint: string;
    cloudImportExecutionEndpoint: string = '/api/v2/import/execution';
    serverImportExecutionEndpoint: string = '/rest/raven/2.0/api/import/execution';
    isCloud = false;
    private options: XRayOptions;

    constructor(options: XRayOptions) {
        this.options = options;
        this.isCloud = !options.endpoint;

        this.token = this.isCloud
            ? this.auth({
                client_id: options.client_id,
                client_secret: options.client_secret
            })
            : this.token = Promise.resolve(options.client_secret);

        this.importExecutionEndpoint = this.isCloud
            ? this.cloudXrayEndpoint + this.cloudImportExecutionEndpoint
            : options.endpoint + this.serverImportExecutionEndpoint;
    }

    /**
     * Auth in xray cloud
     * @param {AuthOptions} credentials - id-client pair
     */
    async auth(credentials: AuthOptions): Promise<string> {
        const response = await fetch(this.authEndpoint, {
            method: 'POST',
            body: JSON.stringify(credentials),
            headers: {'Content-Type': 'application/json'}
        });
        return response.json()
    }

    async finishTest(result: ITestCaseAttempt) {
        const tags = result.pickle.tags
            .filter(tag => /@.+-\d+/.test(tag.name))
            .map(tag => tag.name.replace('@', ''));
        if (tags.length === 0) return;
        const token = await this.token;
        const status = result.worstTestStepResult.status === 'PASSED'
            ? passed(this.isCloud)
            : failed(this.isCloud);
        const payload = {
            testExecutionKey: this.options.testExecutionKey,
            tests: tags.map(testKey => ({testKey, status}))
        };
        try {
            const sendResultResponse = await fetch(this.importExecutionEndpoint, {
                method: 'POST',
                body: JSON.stringify(payload),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                }
            });
            const sendResultResponsePayload: any = await sendResultResponse.json();
            if (sendResultResponsePayload.error) {
                console.warn(sendResultResponsePayload.error);
            }
        } catch (err: any) {
            console.warn(err.message);
        }
    }
}
