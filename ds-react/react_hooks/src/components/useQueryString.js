import { useState, useEffect, useCallback} from 'react';
// import crypto from 'crypto'
import crypto from 'crypto-js';

export default function useQueryString(queryString) {

    const md5HashString = useCallback(() => {
        debugger
        var paraarray = queryString.substring(1).split("=");
        var parahash = paraarray[paraarray.length-1];
        var base64_query = queryString.substring(1).split("=")[1].split("&")[0];
        var query = new Buffer.from(base64_query, "base64").toString();
        debugger
        // var md5String = crypto.createHash('md').update(queryString).digest('hex');
        // return md5String.substring(12,21)==parahash;
        let md5String = crypto.MD5(query).toString().toLocaleUpperCase();
        return md5String;
    });

    const getQueryString = useCallback((name) => {
        debugger
        var base64_query = queryString.substring(1).split("=")[1];

        var query = new Buffer.from(base64_query, "base64").toString();

        var vars = query.split("&");
        for (var i = 0; i < vars.length; i++) {
            var pair = vars[i].split("=");
            if (pair[0] == name) { return pair[1]; }
        }
        return (false);
    });

    return {
        // track: getQueryString("track")==null?4:getQueryString("track"),
        // write: getQueryString("write"),
        // ext_userid: getQueryString("ext_userid"),
        // ext_username: getQueryString("ext_username"),
        // timestamp: getQueryString("timestamp"),
        hash: md5HashString()
    }
}
