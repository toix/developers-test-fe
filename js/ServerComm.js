export function make_xhr(url, data={}, method='get', responseType='json') {
    if (typeof url !== 'string') {
        throw 'Error: No valid URL provided for XMLHttpRequest.';
    }

    var xhr = new XMLHttpRequest();
    xhr.responseType = responseType;
    xhr.open(method, encodeURI(url));

    return new Promise((resolve, reject) => {
        xhr.onload = () => {
            resolve(xhr.response);
        };
        xhr.onerror = () => {
            reject(xhr.response);
        };

        xhr.send(data);
    });
}