import axios from 'axios'

import {Peticiones} from './peticiones'

async function requestBuilder({method, url, body, headers}): Promise<any> {
  switch (method) {
    case Peticiones.POST:
      return await axios.post(url, body, headers);
    case Peticiones.GET:
      return await axios.get(url, headers);
    case Peticiones.PUT:
      return await axios.put(url, body, headers);
    case Peticiones.PATCH:
      return await axios.patch(url, body, headers);
    case Peticiones.DELETE:
      return await axios.delete(url, headers);
  }
}

async function multipartRequestBuilder({url, data, headers}) {
  return axios({
    method: "post",
    url: url,
    data: data,
    headers: headers
  });
}

export {
  requestBuilder,
  multipartRequestBuilder
}
