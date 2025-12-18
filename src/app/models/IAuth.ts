export interface ILoginRequest {
  email: string;
  password:string;
}


export interface ILoginResponse {
  message: string;
  data: {
    accessToken: string;
    refreshToken: string;
    profile: {
      _id: string;
      first_name: string;
      last_name: string;
      email: string;
      status: string;
      role: string;
      shipping_addresses: any[];
    };
  };
  code: number;
  status: string;
  timestamp: string;
}

export interface IRegisterRequest {
  id?: string;
  email: string;
  password:string;
  first_name: string;
  last_name: string;
  role: 'admin' | 'customer';
}

export interface IRegisterResponse {
  message: string;
  data: {
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    role: string;
    _id: string;
    shipping_addresses: any[];
    updatedAt: string;
    createdAt: string;
    __v: number;
  };
  code: number;
  status: string;
  timestamp: string;
}

export interface IForgetPasswordRequest{
  email:string;
}

export interface IForgetPasswordResponse{
  otp:number;
}

export interface IResetPasswordRequest{
  email:string;
  otp:number;
  password:string;
}

export interface IResetPasswordResponse {
  message: string;
  code: number;
  status: string;
  timestamp: string;
}

export interface IChangePasswordRequest{
  password :string;
  password_new :string;
}

export interface IChangePasswordResponse {
  message: string;
  data: {
    _id: string;
    first_name: string;
    last_name: string;
    email: string;
    status: string;
    role: string;
    shipping_addresses: any[];
  };
  code: number;
  status: string;
  timestamp: string;
}
