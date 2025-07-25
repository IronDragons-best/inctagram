/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    "/health": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Check the status of all microservices. */
        get: operations["AppController_healthCheck"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UsersController_getUsers"];
        put?: never;
        post: operations["UsersController_createUser"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/users/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["UsersController_getUserById"];
        put?: never;
        post?: never;
        delete: operations["UsersController_deleteUser"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/registration": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** User Registration. */
        post: operations["AuthController_registration"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/email-resend": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Resend Confirmation email. */
        post: operations["AuthController_resendEmail"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/confirm-email": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Confirm email to complete registration */
        post: operations["AuthController_confirmEmail"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/login": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** User login */
        post: operations["AuthController_login"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/refresh-token": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Refresh tokens. In cookie client must send refreshToken */
        post: operations["AuthController_refreshToken"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/logout": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** User Logout. */
        post: operations["AuthController_logout"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/me": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** Get current user information. */
        get: operations["AuthController_getMe"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/password-recovery": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Password recovery via email confirmation */
        post: operations["AuthController_passwordRecovery"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/new-password": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        /** Set new password */
        post: operations["AuthController_newPassword"];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/google": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Initiate Google OAuth authentication
         * @description Redirects user to Google OAuth authorization page. Frontend should redirect user to this endpoint via window.location.href or <a> tag.
         */
        get: operations["AuthController_googleAuth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/github": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Initiate GitHub OAuth authentication
         * @description Redirects user to GitHub OAuth authorization page. Frontend should redirect user to this endpoint via window.location.href or <a> tag.
         */
        get: operations["AuthController_githubAuth"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/google/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Google OAuth callback handler
         * @description Internal callback endpoint. Called automatically by Google after user authorization. Do not call manually.
         */
        get: operations["AuthController_googleAuthRedirect"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/auth/github/callback": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * GitHub OAuth callback handler
         * @description Internal callback endpoint. Called automatically by GitHub after user authorization. Do not call manually.
         */
        get: operations["AuthController_githubAuthRedirect"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/devices": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /**
         * Get all user devices
         * @description This endpoint retrieves all devices associated with the authenticated user.
         */
        get: operations["DeviceController_getAllUserDevices"];
        put?: never;
        post?: never;
        /**
         * Delete other sessions
         * @description Deletes all user sessions except the current one
         */
        delete: operations["DeviceController_terminateOtherSessions"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/devices/{sessionId}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /**
         * Delete device by session ID
         * @description This endpoint allows the user to delete a specific device session by providing its session ID.
         */
        delete: operations["DeviceController_terminateSessionById"];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostsController_getPosts"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    "/posts/{id}": {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations["PostsController_getPostById"];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        MainServiceInfo: {
            status: string;
            timestamp: string;
        };
        FilesServiceInfo: {
            status: string;
            timestamp: string;
        };
        NotificationServiceInfo: {
            status: string;
            timestamp: string;
        };
        HealthViewDto: {
            mainService: components["schemas"]["MainServiceInfo"];
            filesService: components["schemas"]["FilesServiceInfo"];
            notificationService: components["schemas"]["NotificationServiceInfo"];
        };
        UserInputDto: {
            username: string;
            /** @example user@email.com */
            email: string;
            password: string;
            /** @description Must match with password */
            passwordConfirmation: string;
            /** @description Agree to terms. Must be true. */
            agreeToTerms: boolean;
        };
        ErrorMessageDto: {
            message: string;
            field?: string;
        };
        ErrorResponseDto: {
            errorsMessages: components["schemas"]["ErrorMessageDto"][];
        };
        EmailResendInputDto: {
            email: string;
        };
        ConfirmCodeInputDto: {
            code: string;
        };
        ErrorMessageBaseDto: {
            message: string;
        };
        WithoutFieldErrorResponseDto: {
            errorsMessages: components["schemas"]["ErrorMessageBaseDto"][];
        };
        LoginInputDto: {
            /**
             * @description Email address. You can enter registered email.
             * @example user@example.com
             */
            email: string;
            password: string;
        };
        LoginViewDto: {
            accessToken: string;
        };
        AuthMeViewDto: {
            id: string;
            username: string;
            email: string;
            isConfirmed: boolean;
        };
        PasswordRecoveryInputDto: {
            /**
             * @description Email address of the user requesting password recovery
             * @example example@gmail.com
             */
            email: string;
            /**
             * @description Captcha token to verify the request
             * @example captcha-token-12345
             */
            captchaToken: string;
        };
        NewPasswordInputDto: {
            /**
             * @description New password for the user. Must be 6-20 characters long, include at least one uppercase letter, one lowercase letter, one digit, and one special character.
             * @example NewPassword123!
             */
            newPassword: string;
            /**
             * @description Recovery code for password reset. Sent to the user's email and required to set a new password.
             * @example d67d5893-ab05-4c1e-b866-f4c8494ca03f
             */
            recoveryCode: string;
        };
        TokenResponseDto: Record<string, never>;
        DeviceViewDto: {
            /**
             * @description Unique identifier of the device.
             * @example d67d5893-ab05-4c1e-b866-f4c8494ca03f
             */
            deviceId: number;
            /**
             * @description user id of the user associated with the device.
             * @example Ivan
             */
            userId: Record<string, never> | null;
            /**
             * @description Type of the device (e.g., "Chrome").
             * @example Chrome
             */
            deviceName: Record<string, never> | null;
            /**
             * @description IP address of the device.
             * @example 192.168.1.1
             */
            ip: Record<string, never> | null;
            /**
             * @description Session ID associated with the device.
             * @example d67d5893-ab05-4c1e-b866-f4c8494ca03f
             */
            sessionId: string;
            /**
             * @description Date and time when the device was last updated.
             * @example 2023-10-02T12:00:00Z
             */
            updatedAt: Record<string, never> | null;
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    AppController_healthCheck: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["HealthViewDto"];
                };
            };
        };
    };
    UsersController_getUsers: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UsersController_createUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserInputDto"];
            };
        };
        responses: {
            /** @description Returns the newly created user */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description If the inputModel has incorrect values */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Unauthorized */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UsersController_getUserById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    UsersController_deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_registration: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description User credentials and email */
        requestBody: {
            content: {
                "application/json": components["schemas"]["UserInputDto"];
            };
        };
        responses: {
            /** @description Registration successful, no content returned */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid input or username/email already taken */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description More than 2 attempts from one IP-address during 10 seconds */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_resendEmail: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Email */
        requestBody: {
            content: {
                "application/json": components["schemas"]["EmailResendInputDto"];
            };
        };
        responses: {
            /** @description Email resend successful, no content returned */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Email input has incorrect values or email already confirmed */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description More than 5 attempts from one IP-address during 10 seconds */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_confirmEmail: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Confirmation code */
        requestBody: {
            content: {
                "application/json": components["schemas"]["ConfirmCodeInputDto"];
            };
        };
        responses: {
            /** @description Email successfully confirmed. No content returned. */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Email is already confirmed or confirmation code has expired. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description User with this confirmation code was not found. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["WithoutFieldErrorResponseDto"];
                };
            };
            /** @description More than 5 attempts from one IP-address during 10 seconds */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_login: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** @description Username or email and password */
        requestBody: {
            content: {
                "application/json": components["schemas"]["LoginInputDto"];
            };
        };
        responses: {
            /** @description Login successful. The access token is returned in the response body, while the refresh token is set in the HttpOnly cookie. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LoginViewDto"];
                };
            };
            /** @description Login failed. Invalid credentials. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description More than 5 attempts from one IP-address during 10 seconds. */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_refreshToken: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description The access token is returned in the response body, while the refresh token is set in the HttpOnly cookie */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["LoginViewDto"];
                };
            };
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description More than 5 attempts from one IP-address during 10 seconds */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Logout successful, no content returned */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Logout failed. Bad request, possibly due to invalid input. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description Logout failed. User is not authenticated. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description More than 5 attempts from one IP-address during 10 seconds */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_getMe: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Returns the current user information. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["AuthMeViewDto"];
                };
            };
            /** @description User is not authenticated. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description More than 5 attempts from one IP-address during 10 seconds */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_passwordRecovery: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["PasswordRecoveryInputDto"];
            };
        };
        responses: {
            /** @description Password recovery email sent successfully. */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid email address */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description More than 5 attempts from one IP-address during 10 seconds */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_newPassword: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                "application/json": components["schemas"]["NewPasswordInputDto"];
            };
        };
        responses: {
            /** @description New password set successfully. */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description The request contains invalid data, or the password recovery code is invalid or has expired. */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User not found or password recovery code does not match. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description More than 5 attempts from one IP-address during 10 seconds */
            429: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    AuthController_googleAuth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully redirects to Google OAuth authorization page */
            307: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid OAuth parameters or missing configuration */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
        };
    };
    AuthController_githubAuth: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully redirects to GitHub OAuth authorization page */
            307: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Invalid OAuth parameters or missing configuration */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
        };
    };
    AuthController_googleAuthRedirect: {
        parameters: {
            query: {
                /** @description Authorization code from Google */
                code: string;
                /** @description State parameter for security */
                state?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Authentication successful, returns tokens */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponseDto"];
                };
            };
            /** @description Invalid authorization code from Google or OAuth parameters error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description Google OAuth authentication failed or invalid Google user data */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description User not found during login process */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
        };
    };
    AuthController_githubAuthRedirect: {
        parameters: {
            query: {
                /** @description Authorization code from GitHub */
                code: string;
                /** @description State parameter for security */
                state?: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Authentication successful, returns tokens */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["TokenResponseDto"];
                };
            };
            /** @description Invalid authorization code from GitHub or OAuth parameters error */
            400: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description GitHub OAuth authentication failed or invalid GitHub user data */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
            /** @description User not found during login process */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
        };
    };
    DeviceController_getAllUserDevices: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Successfully retrieved all user devices. */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["DeviceViewDto"];
                };
            };
            /** @description User is not authenticated or token is invalid. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    "application/json": components["schemas"]["ErrorResponseDto"];
                };
            };
        };
    };
    DeviceController_terminateOtherSessions: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Sessions deleted successfully. */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Refresh token is invalid or has expired. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description No other sessions found. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    DeviceController_terminateSessionById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                /** @description ID of the device session to delete */
                sessionId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Device session deleted successfully. */
            204: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description User is not authenticated or token is invalid. */
            401: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Device session not found. */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostsController_getPosts: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    PostsController_getPostById: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                id: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description Success */
            201: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
            /** @description Not Found */
            404: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
