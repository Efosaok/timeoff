import moment from "moment";

export const months = ["January","February","March","April","May","June","July","August","September","October","November","December"];
export const ADD_EMPLOYEE_DEFAULTS = {
    name: "",
    lastname: "",
    email_address: "",
    department: 0,
    admin: false,
    start_date: "",
    end_date: "",
    password_one: "",
    password_confirm: "",
    auto_approve: false,
    adjustment: ''
};

export const ADD_DEPARTMENT_INITIALS = {
  name__new: '',
  allowance__new: 20,
  include_public_holidays__new: true,
  is_accrued_allowance__new: false,
  boss_id__new: 0,
}

export const ADD_LEAVE_TYPE_INITIALS = {
  color__new: 'leave_type_color_1',
  limit__new: '',
  name__new: '',
}

export const ADD_BANK_HOLIDAY = {
  name__new: '',
  date__new: '',
};

export const ADD_BLOCKED_VIEW_DEFAULTS = {
  name: '',
  date: '',
};

export const FLASH_DEFAULTS = {
  messages: [],
  errors: [],
}

export const BOOK_LEAVE_DEFAULTS = {
  from_date_part: '1',
  from_date: moment().format("MM/DD/YY"),
  to_date_part: '1',
  to_date: moment().format("MM/DD/YY"),
}

export const FORGOT_PASSWORD_DEFAULTS = {
  email: '',
}

export const RESET_PASSWORD_DEFAULTS = {
  password: '',
  confirm_password: '',
};

export const API_BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '';
export const generateApiPath = (path: string) => `${API_BASE_URL}/${path}`;
