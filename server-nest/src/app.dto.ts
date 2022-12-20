/**
 * Follows the https://github.com/omniti-labs/jsend specification.
 */
export class IJSendResponse {
    status: "success" | "fail" | "error";
    data?: any;
    message?: string;
  }
  