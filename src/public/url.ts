export const Urls = {
  GetBillTypes: `/return/thumbnail`,
  PROJECTS: `/project`,
  USERS: {
    ME: `/api/users/current`,
    PAGEQUERY: `/api/users`,
    CURRENT: `/api/users/current`,
    SAVE: `/api/users`,
    DETAILS: `/api/users/`,
    EDIT: `/api/users/`,
    DELETE: `/api/users/`,
    UPDATEROLES: `/api/users/roles`,
    VALIDUSERNAME: `/api/users/name/valid`
  },
  ROLES: {
    PAGEQUERY: `/api/roles`,
    SAVE: `/api/roles`,
    DETAILS: `/api/roles/`,
    EDIT: `/api/roles/`,
    DELETE: `/api/roles/`,
    UPDATEMENUS: `/api/roles/menus`,
    ALL: `/api/roles/all`,
    VALIDROLENAME: `/api/roles/name/valid`
  },
  REIMBURSEMENT: {
    PAGEQUERY: `/api/reimbursement`,
    SAVE: `/api/reimbursement`,
    DETAILS: `/api/reimbursement/`,
    DELETE: `/api/reimbursement/`,
    EDIT: `/api/reimbursement/`
  },
  MENUS: {
    PAGEQUERY: `/api/menus`,
    SAVE: `/api/menus`,
    DETAILS: `/api/menus/`,
    DELETE: `/api/menus/`,
    EDIT: `/api/menus/`,
    TOPMENUS: `/api/menus/tops`,
    SUBS: `/api/menus/subs`,
    VALIDMENUNAME: `/api/menus/name/valid`
  },
  WORKFLOW: {
    PAGEQUERY: `/api/workflow`,
    SAVE: `/api/workflow`,
    DELETE: `/api/workflow/`,
    EDIT: `/api/workflow/`,
    DETAILS: `/api/workflow/`,
    PUBLISH: `/api/workflow/publish/`,
    INSTANCE: {
      SAVE: `/api/workflow/instance`
    }
  },
  OPTIONS: {
    MENUS: {
      STATUS: `/api/options/menus/statuses`,
      LEVEL: `/api/options/menus/levels`
    },
    WORKFLOW: {
      TYPES: `/api/options/workflow/typies`,
      TYPE: `/api/options/workflow`
    }
  },
  SESSION: {
    LOGIN: `/login`,
    QRCODE: `/code/verify`,
    LOGOUT: `/signOut`,
    REJECTED: `/auth/require`,
    APP: '/app'
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
      LIST: `/app/flows`,
      ADD: `/app/flows/add`,
      EDIT: `/app/flows/edit`
    },
    REIMBURSEMENT: {
      LIST: `/app/reimbursement`,
      ADD: `/app/reimbursement/add`,
      EDIT: `/app/reimbursement/edit`
    }
  }
};
