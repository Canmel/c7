import {StringUtils} from '../../utils/StringUtils';

export class ProcessDetails {
  id: string;
  name: string;
  busniessKey: string;
  flowType: string;

  constructor() {
    this.id = 'Process_' + StringUtils.getID();
    this.name = '未命名流程';
    this.flowType = '0';
  }

  getBusniessKey(): string {
    this.flowType += '';
    if (!this.busniessKey && this.flowType === '1') {
      return 'REIMBURSEMENT';
    }
    if (!this.busniessKey && this.flowType === '2') {
      return 'REIMBURSEMENT';
    }
    if (!this.busniessKey && this.flowType === '3') {
      return 'REIMBURSEMENT';
    }
    if (!this.busniessKey && this.flowType === '3') {
      return 'ERRAND';
    }
  }
}
