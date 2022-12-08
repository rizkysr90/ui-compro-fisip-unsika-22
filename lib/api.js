export async function fetcher(url,options = {}) {
    let response;
    try {
        if(!options.hasOwnProperty()) {
            response = await fetch(url);
        } else {
            response = await fetch(url,options);
        }
        const data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}