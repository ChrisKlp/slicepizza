import { UserInfo_user_personal } from 'types/UserInfo';

export type TInitialFormValues = {
  email: string;
  name: string | null | undefined;
  phone: string | null | undefined;
  address: string | null | undefined;
  code: string | null | undefined;
  city: string | null | undefined;
};

const formatInitialFormValues = (
  email: string,
  userInfoData?: UserInfo_user_personal | null
): TInitialFormValues => {
  return {
    email,
    name: userInfoData?.name,
    phone: userInfoData?.phone,
    address: userInfoData?.address,
    code: userInfoData?.code,
    city: userInfoData?.city,
  };
};

export default formatInitialFormValues;
