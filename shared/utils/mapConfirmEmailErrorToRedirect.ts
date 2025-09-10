export function mapConfirmEmailErrorToRedirect(status: number, message?: string): string | null {
  if (status === 400) {
    if (message === 'Confirmation code is expired' || message === 'Invalid confirmation code') {
      return '/expired-link'
    }
    if (message === 'Email is already confirmed') {
      return '/sign-in'
    }
  }

  if (status === 404) {
    return '/sign-up'
  }

  if (status === 429) {
    return null
  }

  return null
}
