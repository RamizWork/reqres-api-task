import {UserInterface} from "./user.interface";

export interface PaginationInterface {
  userData: UserInterface[];
  pagination: {
    currentPage: number;
    totalPage: number;
  }
}
