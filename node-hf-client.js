const request = require('request-promise-native');

class NodeHfClient {
    constructor(apiKey){
        this.apiKey = apiKey;
        this.apiUrl = "https://hackforums.net/api/v1";
        this.apiendPoints = {
            userInfo: {
                method: "GET",
                path: "/user/:id"
            },
            multipleUserInfo: {
                method: "GET",
                path: "/users/:ids"
            },
            categoryInfo: {
                method: "GET",
                path: "/category/:id"
            },
            postInfo: {
                method: "GET",
                path: "/post/:id"
            },
            threadInfo: {
                method: "GET",
                path: "/thread/:id"
            },
            forumInfo: {
                method: "GET",
                path: "/forum/:id"
            },
            privateMessage: {
                method: "GET",
                path: "/pm/:id"
            },
            listInbox: {
                method: "GET",
                path: "/pmbox/:pageNumber"
            },
            groupInfo: {
                method: "GET",
                path: "/group/:id"
            }
        };
    }

    request(endpoint) {
        const options = {
            uri: this.apiUrl + endpoint,
            headers: {
                'User-Agent': 'Mozilla/4.0 (compatible; MSIE 6.0; Windows NT 5.1; SV1; .NET CLR 1.0.3705; .NET CLR 1.1.4322)',
                "Authorization": "Basic " + new Buffer(this.apiKey + ":").toString("base64")
            },
            json: true
        };

        return request.get(options);
    }

    getUser(id) {
        const endpoint = this.apiendPoints.userInfo.path.replace(':id', id.toString());

        return this.request(endpoint);
    }

    getUsers(ids) {
        const endpoint = this.apiendPoints.multipleUserInfo.path.replace(':ids', ids.join(','));

        return this.request(endpoint);
    }

    getCategory(id) {
        const endpoint = this.apiendPoints.categoryInfo.path.replace(':id', id.toString());

        return this.request(endpoint);
    }

    getPost(id) {
        const endpoint = this.apiendPoints.postInfo.path.replace(':id', id.toString());

        return this.request(endpoint);
    }

    getThread(id, raw = false, pageNumber = null) {
        let endpoint;

        if (false !== raw && null !== pageNumber) {
            endpoint = `${this.apiendPoints.threadInfo.path.replace(':id', id.toString())}?raw&page=${pageNumber}`
        } else if (false !== raw && null === pageNumber) {
            endpoint = `${this.apiendPoints.threadInfo.path.replace(':id', id.toString())}?raw`;
        } else {
            endpoint = this.apiendPoints.threadInfo.path.replace(':id', id.toString());
        }

        return this.request(endpoint);
    }

    getForum(id) {
        const endpoint = this.apiendPoints.forumInfo.path.replace(':id', id.toString());

        return this.request(endpoint)
    }

    getPrivateMessage(id) {
        const endpoint = this.apiendPoints.privateMessage.path.replace(':id', id.toString());

        return this.request(endpoint)
    }

    getInbox(pageNumber = 1) {
        const endpoint = this.apiendPoints.listInbox.path.replace(':pageNumber', pageNumber.toString());

        return this.request(endpoint)
    }

    getGroup(id) {
        const endpoint = this.apiendPoints.listInbox.path.replace(':id', id.toString());

        return this.request(endpoint)
    }
}

exports.NodeHfClient = NodeHfClient;