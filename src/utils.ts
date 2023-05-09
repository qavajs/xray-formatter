export function passed(isCloud: boolean) {
    return isCloud ? 'PASSED' : 'PASS';
}

export function failed(isCloud: boolean) {
    return isCloud ? 'FAILED' : 'FAIL';
}
