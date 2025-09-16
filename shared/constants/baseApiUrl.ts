export const baseApiUrl = {
  production: 'https://irondragon.site/api/v1',
  staging: 'https://nodewebdev.online/api/v1',
}

export const baseUrl =
  process.env.NEXT_PUBLIC_APP_ENV === 'development' ? baseApiUrl.staging : baseApiUrl.production

export const redirectLinkToGoogleAuth = `${baseUrl}/auth/google`
export const redirectLinkToGitAuth = `${baseUrl}/auth/github`
