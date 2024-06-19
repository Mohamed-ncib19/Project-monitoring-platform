
export const roles = {
    MANAGER: process.env.NEXT_PUBLIC_MANAGER_ROLE,
    TEAM_LEAD: process.env.NEXT_PUBLIC_TEAMLEAD_ROLE,
    TEAM_MEMBER: process.env.NEXT_PUBLIC_TEAMMEMBER_ROLE,
  };
  
  
  export const pagePermissions = {
    sidebar:{
      [process.env.NEXT_PUBLIC_MANAGER_ROLE]: ['Dashboard', 'Portfolio', 'Products', 'Projects', 'Permissions', 'CompanyBalance'] ,
    },
    permissions:{
      [process.env.NEXT_PUBLIC_MANAGER_ROLE]: ['consult', 'manage']
    },
    portfolio: {
      [process.env.NEXT_PUBLIC_MANAGER_ROLE]: ['consult', 'manage'],
      [process.env.NEXT_PUBLIC_TEAMLEAD_ROLE]: ['consult'],
      [process.env.NEXT_PUBLIC_TEAMMEMBER_ROLE]: ['consult',],
    },
    products: {
      [process.env.NEXT_PUBLIC_MANAGER_ROLE]: ['consult', 'manage'],
      [process.env.NEXT_PUBLIC_TEAMLEAD_ROLE]: ['consult'],
      [process.env.NEXT_PUBLIC_TEAMMEMBER_ROLE]: ['consult'],
    },
    projects: {
      [process.env.NEXT_PUBLIC_MANAGER_ROLE]: ['consult', 'manage'],
      [process.env.NEXT_PUBLIC_TEAMLEAD_ROLE]: ['consult', 'manage'],
      [process.env.NEXT_PUBLIC_TEAMMEMBER_ROLE]: ['consult'],
    },
  };
  