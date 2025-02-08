export class LoginResponse {
    accessToken: string;
    expiresIn: number;
  
    constructor(accessToken: string, expiresIn: number) {
      this.accessToken = accessToken;
      this.expiresIn = expiresIn;
    }
  }
  