import {StringUtils} from '../../utils/StringUtils';

export class ProcessDetails {
  id: string;
  name: string;
  busniessKey: string;

  constructor() {
    this.id = 'Process_' + StringUtils.getID();
    this.name = '未命名流程';
    this.busniessKey = 'BUSNIESSKEY_' + StringUtils.getID();
  }
}
