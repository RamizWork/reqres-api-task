import {ResourceInterface} from "./resource.interface";

export interface ListResourcesInterface {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: ResourceInterface[];
  support: {
    url: string;
    text: string;
  }
}
