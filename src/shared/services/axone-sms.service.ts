import { HttpStatus, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';

export interface AxoneSmsResponse {
  messages: Message[];
}

export interface Message {
  to: string;
  status: Status;
  messageId: string;
  smsCount: number;
}

export interface Status {
  groupId: number;
  groupName: string;
  id: number;
  name: string;
  description: string;
}

@Injectable()
export class AxoneSmsService {
  constructor(private httpService: HttpService) {}

  async sendSms(phone: string, message: string): Promise<any> {
    const baseUrl = 'https://api.freebusiness.sn/sms/1/text/single';
    const authString = 'ZGppYnJpbGd1ZXllZTpnalAzYThzTEhYajhud3ohMjAyMg==';
    const authorizationHeader = `Basic ${authString}`;

    const payload = {
      from: 'AXONE SN',
      to: phone,
      text: message,
    };

    const headers = {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: authorizationHeader,
    };
    try {
      const response = await this.httpService
        .post<AxoneSmsResponse>(baseUrl, payload, { headers })
        .toPromise();
      const responseData = response.data;

      if (
        response.status === HttpStatus.OK &&
        responseData.messages.length > 0
      ) {
        const message = responseData.messages[0];
        const { groupId } = message.status;

        if (groupId === 1) {
          return responseData;
        } else {
          throw new Error('Failed to send SMS. Invalid response.');
        }
      } else {
        throw new Error('Failed to send SMS. Invalid response.');
      }
    } catch (error) {
      throw new Error('Failed to send SMS. Error in API request.');
    }
  }
}
