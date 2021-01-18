/* eslint-disable @typescript-eslint/no-explicit-any */

export interface HttpData {
  message: string;
  data?: any;
}
class HttpExpection extends Error {
  statusCode: number;
  data: any[];
  constructor(statusCode: number, httpData: HttpData) {
    super(httpData.message);
    this.name = 'HttpExpection';
    this.statusCode = statusCode;
    this.data = httpData.data || null;
  }
}

export default HttpExpection;
