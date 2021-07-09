import { UserInfo } from 'types/UserInfo';

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
  userInfoData: UserInfo
): TInitialFormValues => {
  return {
    email,
    name: userInfoData?.user?.personal?.name,
    phone: userInfoData?.user?.personal?.phone,
    address: userInfoData?.user?.personal?.address,
    code: userInfoData?.user?.personal?.code,
    city: userInfoData?.user?.personal?.city,
  };
};

export default formatInitialFormValues;
