import { LivroResponse } from "./LivroResponse";

interface Sort {
  direction: string;
  nullHandling: string;
  ascending: boolean;
  property: string;
  ignoreCase: boolean;
}

interface Pageable {
  paged: boolean;
  pageNumber: number;
  pageSize: number;
  offset: number;
  sort: Sort[];
  unpaged: boolean;
}

export class PaginacaoLivroResponse {
  totalElements: number;
  totalPages: number;
  first: boolean;
  last: boolean;
  pageable: Pageable;
  size: number;
  content: LivroResponse[];
  number: number;
  sort: Sort[];
  numberOfElements: number;
  empty: boolean;

  constructor(
    totalElements: number,
    totalPages: number,
    first: boolean,
    last: boolean,
    pageable: Pageable,
    size: number,
    content: LivroResponse[],
    number: number,
    sort: Sort[],
    numberOfElements: number,
    empty: boolean
  ) {
    this.totalElements = totalElements;
    this.totalPages = totalPages;
    this.first = first;
    this.last = last;
    this.pageable = pageable;
    this.size = size;
    this.content = content;
    this.number = number;
    this.sort = sort;
    this.numberOfElements = numberOfElements;
    this.empty = empty;
  }
}
