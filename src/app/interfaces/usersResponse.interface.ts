import {UserInterface} from "../interfaces/user.interface";

export interface UsersResponseInterface {
  page: number,
  per_page: number,
  total: number,
  total_pages: number,
  data: UserInterface[],
  support: {
    url: string,
    text: string
  }
}
