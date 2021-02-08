export const apiService = async <T = any>(uri: string, method: string = 'GET', body?: {}) => {

    let headers = new Headers();
    let options: IOptions = {
        method,
        headers
    }

    if(method === 'PUT' || method === 'POST') {
        headers.append('Content-type', 'application/json');
        options.body = JSON.stringify(body);
    }

    try {
        let res = await fetch(uri, options);
        if(res.ok) {
            return <T>(await res.json());
        } else {
            return false;
        }
    } catch (e) {
        console.log(e);
        throw e;
    }
}

interface IOptions {
    [key: string]: any;
}