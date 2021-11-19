export interface Post {
    char_id: number;
    name: string;
    birthday: string;
    occupation?: (string)[] | null;
    img: string;
    status: string;
    nickname: string;
    appearance?: (number)[] | null;
    portrayed: string;
    category: string;
    better_call_saul_appearance?: (number)[] | null;
  }
  