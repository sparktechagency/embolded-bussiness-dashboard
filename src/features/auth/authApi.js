import { baseApi } from "../../apiBaseQuery";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Signup
    signup: builder.mutation({
      query: (data) => ({
        url: "/users/",
        method: "POST",
        body: data,
      }),
    }),

    // Login
    login: builder.mutation({
      query: (credentials) => ({
        url: "/auth/login",
        method: "POST",
        body: credentials,
      }),
    }),

    // Email Verification
    verifyEmail: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    // Forgot Password
    forgotPassword: builder.mutation({
      query: (data) => ({
        url: "/auth/forget-password",
        method: "POST",
        body: data,
      }),
    }),


    forgotPasswordVerifyOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/verify-email",
        method: "POST",
        body: data,
      }),
    }),

    resetPassword: builder.mutation({ 
      query: ({ data, token }) => {
        console.log('API Query - Data:', data);
        console.log('API Query - Token:', token)
        return {
          url: "/auth/reset-password", 
          method: "POST", 
          body: data,
          headers: {
            resetToken: token,
            'Content-Type': 'application/json',
          },
        };
      }, 
    }),



    // Resend OTP
    resendOtp: builder.mutation({
      query: (data) => ({
        url: "/auth/resend-otp",
        method: "POST",
        body: data,
      }),
    }),
  }),
});


// Export hooks
export const {
  useSignupMutation,
  useLoginMutation,
  useVerifyEmailMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
  useResendOtpMutation,
} = authApi;
