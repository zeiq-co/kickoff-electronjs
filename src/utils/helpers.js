export const log = value => console.log(value); // eslint-disable-line

// Usage: await timeout(3000);
export const timeout = ms => new Promise(resolve => setTimeout(resolve, ms));
