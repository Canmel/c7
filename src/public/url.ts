export const Urls = {
  GetBillTypes: `/return/thumbnail`,
  PROJECTS: `/project`,
  UNAUTHENTICATION: `/unauthentication`,
  DEPLOYEDWORKFLOW: {
    PAGEQUERY: `/bpm/deployedWorkflows`,
    DELETE: `/bpm/deployedWorkflows/`
  },
  DEFINITIONWORKFLOW: {
    PAGEQUERY: `/bpm/flow/defWorkflows`,
    DELETE: `/bpm/flow/defWorkflows/`
  },
  USERS: {
    ME: `/system/sysUser/me`,
    PAGEQUERY: `/system/sysUser`,
    CURRENT: `/system/sysUser/current`,
    SAVE: `/system/sysUser`,
    DETAILS: `/system/sysUser/`,
    EDIT: `/system/sysUser/`,
    ROLES: `/system/sysUser/roles`,
    DELETE: `/system/sysUser/`,
    UPDATEROLES: `/system/sysUser/roles`,
    VALIDUSERNAME: `/system/sysUser/valid/`,
    ALL: `/system/sysUser/all`
  },
  MACRO: {
    PAGEQUERY: `/system/sysMacro`,
    SAVE: `/system/sysMacro`,
    DETAILS: `/system/sysMacro/`,
    EDIT: `/system/sysMacro/`,
    DELETE: `/system/sysMacro/`
  },
  LOGS: {
    PAGEQUERY: `/system/sysLog`
  },
  ROLES: {
    PAGEQUERY: `/system/sysRole`,
    SAVE: `/system/sysRole`,
    DETAILS: `/system/sysRole/`,
    EDIT: `/system/sysRole/`,
    DELETE: `/system/sysRole/`,
    UPDATEMENUS: `/system/sysRole/menus`,
    ALL: `/system/sysRole/all/list`,
    VALIDROLENAME: `/system/sysRole/valid/`
  },
  REIMBURSEMENT: {
    PAGEQUERY: `/oa/reimbursement`,
    SAVE: `/oa/reimbursement`,
    DETAILS: `/oa/reimbursement/`,
    DELETE: `/oa/reimbursement/`,
    APPLY: `/oa/reimbursement/apply/`,
    CURRENT: `/oa/reimbursement/current/`,
    TASKPASS: `/oa/reimbursement/pass/`,
    TASKBACK: `/oa/reimbursement/back/`,
    EDIT: `/oa/reimbursement/`,
    COMMENT: `/oa/reimbursement/comment/`
  },
  ERRAND: {
    PAGEQUERY: `/oa/errand`,
    SAVE: `/oa/errand`,
    DELETE: `/oa/errand/`,
    APPLY: `/oa/errand/apply/`,
    TASKPASS: `/oa/errand/pass/`,
    TASKBACK: `/oa/errand/back/`,
    EDIT: `/oa/errand/`,
    CURRENT: `/oa/errand/current/`,
  },
  MENUS: {
    PAGEQUERY: `/system/sysMenu`,
    SAVE: `/system/sysMenu`,
    DETAILS: `/system/sysMenu/`,
    DELETE: `/system/sysMenu/`,
    EDIT: `/system/sysMenu/`,
    TOPMENUS: `/system/sysMenu/tops`,
    SUBS: `/system/sysMenu/subs`,
    VALIDMENUNAME: `/system/sysMenu/valid/`
  },
  WORKFLOW: {
    PAGEQUERY: `/bpm/workFlow`,
    SAVE: `/bpm/workFlow`,
    DELETE: `/bpm/workFlow/`,
    EDIT: `/bpm/workFlow/`,
    DETAILS: `/bpm/workFlow/`,
    PUBLISH: `/bpm/flow/deploy/`,
    DEPLOYED: `/bpm/workFlow/deployed`,
    TASKIMAGE: `/bpm/flow/trace/`,
    TASKPASS: `/bpm/workFlow/task/pass/`,
    TASKBACK: `/bpm/workFlow/task/back/`,
    COMMENTS: `/oa/reimbursement/comment/`,
    INSTANCE: {
      SAVE: `/api/workflow/instance`
    },
    TODO: `/bpm/flow/todo`
  },
  OPTIONS: {
    MENUS: {
      STATUS: `/system/sysMenu/typies`,
      LEVEL: `/system/sysMenu/typies`
    },
    WORKFLOW: {
      TYPES: `/bpm/workFlow/typies`,
      TYPE: `/api/options/workflow`
    },
    REIMBURSEMENT: {
      STATUS: `/oa/reimbursement/status`
    },
    ERRAND: {
      STATUS: `/oa/errand/status`
    }
  },
  SESSION: {
    LOGIN: `/login`,
    QRCODE: `/code/verify`,
    LOGOUT: `/auth/session/exit`,
    REJECTED: `/auth/require`,
    APP: '/app',
    USERINFO: '/auth/session/me'
  },
  BUSINESS: {
    USERS: {
      LIST: `/app/users`,
      ADD: `/app/users/add`,
      EDIT: `/app/users/edit`
    },
    ROLES: {
      LIST: `/app/roles`,
      ADD: `/app/roles/add`,
      EDIT: `/app/roles/edit`
    },
    MENUS: {
      LIST: `/app/menus`,
      ADD: `/app/menus/add`,
      EDIT: `/app/menus/edit`
    },
    FLOWS: {
      LIST: `/app/flows`,
      ADD: `/app/flows/add`,
      EDIT: `/app/flows/edit`
    },
    MAIN: {
      HOME: `/app/home`
    },
    WORKFLOW: {
      LIST: `/app/workflows`,
      ADD: `/app/workflows/add`,
      EDIT: `/app/workflows/edit`
    },
    REIMBURSEMENT: {
      LIST: `/app/reimbursement`,
      ADD: `/app/reimbursement/add`,
      EDIT: `/app/reimbursement/edit`
    },
    ERRAND: {
      LIST: `/app/errand`,
      ADD: `/app/errand/add`,
      EDIT: `/app/errand/edit`
    }
  }
};
