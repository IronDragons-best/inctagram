import {
  BaseQueryApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
  QueryReturnValue,
} from "@reduxjs/toolkit/query/react";

export const handleError = (
  api: BaseQueryApi,
  result: QueryReturnValue<unknown, FetchBaseQueryError, FetchBaseQueryMeta>,
) => {
  let error = "Some error occurred";

  if (result.error) {
    switch (result.error.status) {
      case "FETCH_ERROR": {
        break;
      }
      case "PARSING_ERROR":
      case "CUSTOM_ERROR":
        error = result.error.error;
        break;
      case 403:
        error = "403 Forbidden Error. Check API-KEY";
        break;
      case 400:
      default:
        error = JSON.stringify(result.error);
        break;
    }
  }

  // const clientError = (result.data as { resultCode: ResultCode }).resultCode

  // if (clientError === ResultCode.Error || clientError === ResultCode.CaptchaError) {
  //   const messages = (result.data as { messages: string[] }).messages
  //   error = messages.length ? messages[0] : error
  //   api.dispatch(setAppErrorAC({ error }))
  // }
};
