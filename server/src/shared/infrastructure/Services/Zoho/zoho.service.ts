import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ZohoDocument } from 'src/shared/domain/Services/Zoho/zohoDocument.interface';
import * as FormData from 'form-data';

@Injectable()
export class ZohoService {
  #parseStringToJSON(data: string): any {
    return JSON.parse(JSON.stringify(data));
  }
  #refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  #clientId = process.env.ZOHO_CLIENT_ID;
  #clientSecret = process.env.ZOHO_CLIENT_SECRET;
  constructor(private readonly callApi: HttpService) {}

  async generateAccessTokenByRefreshToken(): Promise<string> {
    const refreshToken = this.#refreshToken;
    const clientId = this.#clientId;
    const clientSecret = this.#clientSecret;
    const url = `${process.env.ZOHO_ACCOUNTS_API_BASE_URL}/oauth/v2/token?refresh_token=${refreshToken}&client_id=${clientId}&client_secret=${clientSecret}&grant_type=refresh_token`;
    try {
      const result = await this.callApi.axiosRef.post(url);
      return result?.data?.access_token;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async createNewDocument(data: ZohoDocument): Promise<string> {
    try {
      const file = this.#parseStringToJSON(data?.file);
      const requestData = JSON.parse(JSON.parse(JSON.stringify(data?.data)));
      const { originalName, buffer } = file;
      const formData = new FormData();
      formData.append('file', Buffer.from(buffer?.data), {
        filename: originalName,
      });
      formData.append('data', JSON.stringify(requestData));
      // const authToken = await this.generateAccessTokenByRefreshToken();
      // console.log(authToken);
      console.log(requestData?.requests);
      const url = `${process.env.ZOHO_DOCS_API_BASE_URL}`;
      const response = await this.callApi.axiosRef.post(url, formData, {
        headers: {
          ...formData.getHeaders(),
          Authorization: `Zoho-oauthtoken 1000.480f2df4c7c0fbd4fa4a45f5a3d86ddd.cf621c5b3819a16d9e3d9a0f113ce77b`,
        },
      });
      console.log(url)
      console.log(response?.data, 'Prabadhya');
    } catch (error) {
      // console.log(error);
      return error;
    }
  }
}

// "request_type_id":"1",
