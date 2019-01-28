export const Properties = {
  SESSION: {
    CURRENT: 'current_user',
    CURRENT_USER_NAME: 'CURRENT_USER_NAME',
    CURRENT_NICKNAME: 'CURRENT_USER_NICKNAME',
    CURRENT_USER_ID: `CURRENT_USER_ID`
  },
  STRING: {
    SESSION: {
      DETAILS: `DETAILS`,
      AUTHORITIES: `AUTHORITIES`,
      AUTHENTICATED: `AUTHENTICATED`,
      PRINCIPAL: `PRINCIPAL`,
      NAME: `NAME`,
      NICKNAME: `NICKNAME`,
      ACCESS_TOKEN: `ACCESS_TOKEN`
    },
    ENUM: {
      WORKFLOWPUBLISH: {
        PUBLISHED: `PUBLISHED`,
        UNPUBLISH: `UNPUBLISH`
      },
      WORKFLOWTYPE: {
        FLOW_NORMAL: `FLOW_NORMAL`,
        FINANCE: `FINANCE`,
        REIMBURSEMENT: `REIMBURSEMENT`
      }
    },
    SYSTEM: {
      PROXY_ERROR: `Error occured while trying to proxy`
    }
  },
  ENUM: {
    WORKFLOWPUBLISH: {
      PUBLISHED: `1`
    }
  }
};
