import { MaarchRmEventFormat } from '../entities/EventFormat.entity';

export class MaarchEventDto {
  eventId: string;
  eventType: string;
  timestamp: Date;
  instanceName: string;
  orgRegNumber: string;
  orgUnitRegNumber: string;
  accountId: string;
  objectClass: string;
  objectId: string;
  operationResult: boolean;
  description: string;
  eventInfo: string; // Updated to use Record<string, any> for dynamic key-value pairs
  eventInfoFormated: Record<string, any>; // Updated to use Record<string, any> for dynamic key-value pairs
  eventFormat: MaarchRmEventFormat;
  recipients: any[];
  axoneNotificationSent: boolean;
}
