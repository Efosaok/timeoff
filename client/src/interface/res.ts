export interface AllowanceOption {
  value: number;
  caption: number | string;
};

export interface User {
  start_date?: string;
  end_date?: string;
  id: number;
  email: string;
  password: string;
  name: string;
  lastname: string;
  activated: boolean;
  admin: boolean;
  auto_approve: boolean;
  createdAt: string;
  updatedAt: string;
  companyId: number;
  DepartmentId: number;
}
