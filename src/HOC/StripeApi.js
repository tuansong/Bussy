import React from 'react';
// A function that pass a component as a parameter then return another component 
export function callStripe(WrappedComponent, publicKey, secretKey) {

    const request = async (route, key, method, postData) => {
        let dataStr = null;
        if (postData) {
        dataStr = Object.keys(postData).map(k => {
            return `${k}=${postData[k]}`
        }).join('&');
    }

        const response = await fetch(`https://api.stripe.com/v1/${route}`, {
            method: method,
            headers: {
                'Accept': 'application/json',
                'Authorization': `Bearer ${key}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            body: dataStr
        });

        return await response.json();
    }

    // Return new Component with new logic
    return class extends React.Component {
        postPublic(route, postData) {
            return request(route, publicKey, 'POST', postData);
        }

        postSecret(route, postData) {
            return request(route, secretKey, 'POST', postData);
        }

        getSecret(route) {
            return request(route, secretKey, 'GET');
        }

        render() {
            return <WrappedComponent
                postPublic={this.postPublic}
                postSecret={this.postSecret}
                getSecret={this.getSecret}
                {...this.props} />
        }
    }
}