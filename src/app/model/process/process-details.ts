import {StringUtils} from '../../utils/StringUtils';

export class ProcessDetails {
  id: string;
  name: string;
  busniessKey: string;
  flowType: string;

  constructor() {
    this.id = 'Process_' + StringUtils.getID();
    this.name = '未命名流程';
    this.busniessKey = 'BUSNIESSKEY_' + StringUtils.getID();
    this.flowType = '1';
  }

  getBusniessKey(): string {
    if (this.flowType === '1') {
      return 'REIMBURSEMENT';
    }
    if (this.flowType === '2') {
      return 'REIMBURSEMENT';
    }
    if (this.flowType === '3') {
      return 'REIMBURSEMENT';
    }
  }
}
