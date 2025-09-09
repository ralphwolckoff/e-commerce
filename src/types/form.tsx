import { Role } from "@/common/role.enum";

export interface FormsType {
  control?: any;
  onSubmit?: any;
  register: any;
  errors: any;
  isLoading: boolean;
  handleSubmit: any;
}

export interface RegisterFormType {
  
    email: string
    password: string
    role: Role

}

export interface LoginFormType {
  email: string;
  password: string;
} 

export interface ResetPasswordFormType {
  password: string;
  confirmPassword: string;

}

export interface ForgetPasswordFormType {
  email: string;
}

export interface OnboardingFormFeildType{
  name: string
  address: string
  description:string
}

export interface UpdateUserFormType {
  
  role?: Role;
  onboardingIsCompleted?: boolean;
  profile?: UpdateUserProfileFormType;
  store?: OnboardingFormFeildType;
}

export interface UpdateUserProfileFormType {
  firstName: string;
  lastName: string;
  photoUrl?:string
  bio?: string;
  phoneNumber?: number;
 
}

