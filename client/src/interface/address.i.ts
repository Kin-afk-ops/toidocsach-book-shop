export type Province = {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  phone_code: number;
};

export type Ward = {
  code: number;
  codename: string;
  division_type: string;
  name: string;
  province_code: number;
};
