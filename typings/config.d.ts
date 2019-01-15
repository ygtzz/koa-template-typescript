interface Config{
    env: string,
    gzip: boolean,
    template: string,
    [key:string]: any
}

declare let config:Config;

export default config;