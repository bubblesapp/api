import {Alert} from './Alert';

export type NewAlert = {
  alert: Alert;
  createdBy: string;
  to: string[];
};
