import { makeQuery } from './query-parser';

export default class Model {
  protected _riotUrl = 'https://kr.api.riotgames.com';
  protected _serverUrl = 'https://ryuturn.shop';

  // -------------------- 일반 http 요청 --------------------
  // (1) http 통신하는 메소드
  protected async _httpRequest(url: string, method: 'GET' | 'POST' | 'PUT' | 'DELETE', dataObj?: object, additionalOptions?: object) {
    if (method === 'GET') url = url + makeQuery(dataObj);
    const options = this.makeOptions(method, dataObj, additionalOptions);
    const response = await fetch(url, options);
    const responseObj: { status: number; data?: MutableObject } = { status: response.status };

    if (response.status != 204) responseObj.data = await response.json();
    return responseObj;
  }

  // fetch 파라미터인 options을 만드는 s메소드(기본 옵션 + 추가 옵션)
  private makeOptions(method: string, body?: object, additionalOptions?: MutableObject) {
    let options: MutableObject = {
      method: method,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    };
    if (additionalOptions) {
      if (additionalOptions.body) console.error('makeOptions : cannot put body here');
      if (additionalOptions.headers) additionalOptions.headers = Object.assign(options.headers, additionalOptions.headers);
      options = Object.assign(options, additionalOptions);
    }
    if (body && method !== 'GET') options.body = JSON.stringify(body);
    return options;
  }
}
