import { Inject, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ZohoDocument } from 'src/shared/domain/Services/Zoho/zohoDocument.interface';
import * as FormData from 'form-data';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';

@Injectable()
export class ZohoService {
  #parseStringToJSON(data: string): any {
    return JSON.parse(JSON.stringify(data));
  }
  #refreshToken = process.env.ZOHO_REFRESH_TOKEN;
  #clientId = process.env.ZOHO_CLIENT_ID;
  #clientSecret = process.env.ZOHO_CLIENT_SECRET;
  constructor(
    private readonly callApi: HttpService,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getCachedToken(): Promise<string> {
    let value: string | undefined = await this.cacheManager.get('access_token');
    console.log(value);
    if (value === undefined) {
      const access_token = await this.generateAccessTokenByRefreshToken();
      console.log(access_token);
      if (access_token) {
        await this.cacheManager.set('access_token', access_token, 0);
      }
      value = access_token;
    }
    return value;
  }

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
          Authorization: `Zoho-oauthtoken 1000.66b947a2e7f6dfed4d8ef9f0a0427fc2.61996f21870d3de7db05f19216973107`,
        },
      });
      return response?.data;
    } catch (error) {
      console.log(error);
      return error;
    }
  }
}
