export const Urls = {
  GetBillTypes: `/return/thumbnail`,
  PROJECTS: `/project`,
  DEPLOYEDWORKFLOW: {
    PAGEQUERY: `/api/deployedWorkflows`,
    DELETE: `/api/deployedWorkflows/`
  },
  USERS: {
    ME: `/system/user`,
    PAGEQUERY: `/system/users`,
    CURRENT: `/system/users/current`,
    SAVE: `/system/users`,
    DETAILS: `/system/users/`,
    EDIT: `/system/users/`,
    ROLES: `/system/users/roles`,
    DELETE: `/system/users/`,
    UPDATEROLES: `/system/users/roles`,
    VALIDUSERNAME: `/system/users/name/valid`
  },
  LOGS: {
    PAGEQUERY: `/system/logs`
  },
  ROLES: {
    PAGEQUERY: `/system/roles`,
    SAVE: `/system/roles`,
    DETAILS: `/system/roles/`,
    EDIT: `/system/roles/`,
    DELETE: `/system/roles/`,
    UPDATEMENUS: `/system/roles/menus`,
    ALL: `/system/roles/all`,
    VALIDROLENAME: `/system/roles/name/valid`
  },
  REIMBURSEMENT: {
    PAGEQUERY: `/api/reimbursement`,
    SAVE: `/api/reimbursement`,
    DETAILS: `/api/reimbursement/`,
    DELETE: `/api/reimbursement/`,
    APPLY: `/api/reimbursement/apply/`,
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
    VALIDMENUNAME: `/system/sysMenu/name/valid`
  },
  WORKFLOW: {
    PAGEQUERY: `/api/workflow`,
    SAVE: `/api/workflow`,
    DELETE: `/api/workflow/`,
    EDIT: `/api/workflow/`,
    DETAILS: `/api/workflow/`,
    PUBLISH: `/api/workflow/publish/`,
    DEPLOYED: `/api/workflow/deployed`,
    TASKIMAGE: `/api/workflow/task/image/`,
    TASKPASS: `/api/workflow/task/pass/`,
    TASKBACK: `/api/workflow/task/back/`,
    COMMENTS: `/api/workflow/comments`,
    INSTANCE: {
      SAVE: `/api/workflow/instance`
    },
    TODO: `/api/workflow/todo`
  },
  OPTIONS: {
    MENUS: {
      STATUS: `/api/options/menus/statuses`,
      LEVEL: `/api/options/menus/levels`
    },
    WORKFLOW: {
      TYPES: `/api/options/workflow/typies`,
      TYPE: `/api/options/workflow`
    },
    REIMBURSEMENT: {
      STATUS: `/api/options/reimbursement/status`
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
