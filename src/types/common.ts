export type SortObject = {
  column: string;
  type: "asc" | "desc";
};
export type AccessToken = string | null;
export type WeekDays =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export enum OperationPosition {
  after = "after",
  before = "before",
}

export interface Timestamps {
  created_at: Date;
  updated_at: Date;
}

export type ErrorObj = {
  error: {
    message: string;
    data: any;
  };
};

export type ApiError = {
  error: {
    message: string;
    code: string;
  };
};

export type DialogProps = {
  isOpen: boolean;
  onClose: () => void;
};

export type PageParams<TList extends string[]> = {
  [K in TList[number]]: string;
};
