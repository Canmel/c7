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
    VALIDUSERNAME: `/system/sysUser/valid/`
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
    EDIT: `/system/sysRole`,
    DELETE: `/system/sysRole/`,
    UPDATEMENUS: `/system/sysRole/menus`,
    ALL: `/system/sysRole/all/list`,
    VALIDROLENAME: `/system/sysRole/valid/`
  },
  REIMBURSEMENT: {
    PAGEQUERY: `/api/reimbursement`,
    SAVE: `/api/reimbursement`,
    DETAILS: `/api/reimbursement/`,
    DELETE: `/api/reimbursement/`,
    APPLY: `/api/reimbursement/apply/`,
    CURRENT: `/api/reimbursement/current/`,
    TASKPASS: `/api/reimbursement/task/pass/`,
    TASKBACK: `/api/reimbursement/task/back/`,
    EDIT: `/api/reimbursement/`
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
    COMMENTS: `/bpm/workFlow/comments`,
    INSTANCE: {
      SAVE: `/api/workflow/instance`
    },
    TODO: `/api/workflow/todo`
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
      STATUS: `/api/reimbursement/status`
    }
  },
  SESSION: {
    LOGIN: `/login`,
    QRCODE: `/code/verify`,
    LOGOUT: `/signOut`,
    REJECTED: `/auth/require`,
    APP: '/app',
    USERINFO: '/api/user'
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
    }
  }
};
