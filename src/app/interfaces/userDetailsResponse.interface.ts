import {UserInterface} from "./user.interface";

export interface UserDetailsResponseInterface {
  data: UserInterface;
  support: {
    url: string;
    text: string
  }
}
