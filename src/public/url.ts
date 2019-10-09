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
  NOTICE: {
    SAVE: `/system/sysNotice`,
    PAGEQUERY: `/system/sysNotice`,
    EDIT: `/system/sysNotice/`,
    DELETE: `/system/sysNotice/`,
    TARGETTYPE: `/system/sysNotice/targetType`,
    TOP: `/system/sysNotice/top/`,
    PUSH: `/system/sysNotice/push/`
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
    UPDATE: `/oa/errand`,
    APPLY: `/oa/errand/apply/`,
    TASKPASS: `/oa/errand/pass/`,
    TASKBACK: `/oa/errand/back/`,
    EDIT: `/oa/errand/`,
    CURRENT: `/oa/errand/current/`,
    COMPLETEVALID: `/oa/errand/complete/valid/`,
    IMPERFECT: `/oa/errand/imperfect`,
    TRIPS: `/oa/errand/trips/`,
    ROUTES: `/oa/errand/routes/`,
    TRAFFICS: `/oa/errand/traffic/`
  },
  ROUTERS: {
    PAGEQUERY: `/oa/route`,
    SAVE: `/oa/route/`
  },
  TRAFFIC: {
    SAVE: `/oa/traffic`,
    DELETE: `/oa/traffic/`,
    DETAIL: `/oa/traffic/`
  },
  IMPERFECT: {
    COMPLETEVALID: `/oa/imperfect/errand/valid/`,
    TRIPS: `/oa/imperfect/trips/`
  },
  TRIP: {
    SAVE: `/oa/trip`,
    DELETE: `/oa/trip/`,
  },
  MENUS: {
    PAGEQUERY: `/system/sysMenu`,
    SAVE: `/system/sysMenu`,
    DETAILS: `/system/sysMenu/`,
    DELETE: `/system/sysMenu/`,
    EDIT: `/system/sysMenu/`,
    TOPMENUS: `/system/sysMenu/tops`,
    SUBS: `/system/sysMenu/subs`,
    VALIDMENUNAME: `/system/sysMenu/valid/`,
    ALL: `system/sysMenu/all/list`
  },
  WORKFLOW: {
    PAGEQUERY: `/bpm/workFlow`,
    SAVE: `/bpm/workFlow`,
    DELETE: `/bpm/workFlow/`,
    EDIT: `/bpm/workFlow/`,
    DETAILS: `/bpm/workFlow/`,
    PUBLISH: `/bpm/flow/deploy/`,
    DEPLOYED: `/acti/deployments`,
    TASKIMAGE: `/acti/process/trace/`,
    TASKPASS: `/bpm/workFlow/task/pass/`,
    TASKBACK: `/bpm/workFlow/task/back/`,
    COMMENTS: `/oa/reimbursement/comment/`,
    INSTANCE: {
      SAVE: `/api/workflow/instance`
    },
    TODO: `/acti/process/todo`
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
    RESOURCES: {
      LIST: `/app/resources`,
      ADD: `/app/resources/add`,
      EDIT: `/app/resources/edit`
    },
    NOTICE: {
      LIST: `/app/notice`,
      ADD: `/app/notice/add`,
      EDIT: `/app/notice/edit`
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
    PROJECT: {
      LIST: `/app/project`,
      ADD: `/app/project/add`,
      EDIT: `/app/project/edit`
    },
    MERCHANT: {
      LIST: `/app/merchant`,
      ADD: `/app/merchant/add`,
      EDIT: `/app/merchant/edit`
    },
    STAGE: {
      LIST: `/app/stage`,
      ADD: `/app/stage/add`,
      EDIT: `/app/stage/edit`
    },
    INDUSTRY: {
      LIST: `/app/industry`,
      ADD: `/app/industry/add`,
      EDIT: `/app/industry/edit`
    },
    PROJECT_GROUP: {
      LIST: `/app/project_group`,
      ADD: `/app/project_group/add`,
      EDIT: `/app/project_group/edit`
    },
    DEMO: {
      LIST: `/app/demo`,
      ADD: `/app/demo/add`,
      EDIT: `/app/demo/edit`
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
      ADD: `/app/process-designer`,
      EDIT: `/app/process-designer/edit`
    },
    REIMBURSEMENT: {
      LIST: `/app/reimbursement`,
      ADD: `/app/reimbursement/add`,
      EDIT: `/app/reimbursement/edit`
    },
    ERRAND: {
      LIST: `/app/errand`,
      ADD: `/app/errand/add`,
      EDIT: `/app/errand/edit`,
      CPMPLETE: `/app/errand/complete`
    }
  }
};
