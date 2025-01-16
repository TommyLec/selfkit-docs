---
lastUpdate: 11/01/2025
---

# Authentication

**Selfkit** use Lucia for the authentication, it's a learning resource on implementing auth from scratch (previously a library).

## Why Lucia ?

Creating your own authentication system ensures full control, customization, and no reliance on third-party updates or vulnerabilities, offering a tailored, lightweight, and maintainable solution.

**Selfkit** provide many features by default (details below) directly in code, so you are free to add, modify or remove them as you want.

## Features

- Email/password login
- Email confirmation
- Authentication with Providers (i.e. Google)
- Forgot password
- 2FA (Two-factor authentication)
- Passkey
- Secret key
- Recovery code (for 2FA / passkey / secret key)
- Modifiy email/password (not possible for account created via providers)
- Rate limiting

## Setup Google Oauth

1. Create a new project on [Google Cloud](https://console.cloud.google.com/).  
2. Search for **Google Auth Platform** in the top search bar and select the first result.  
3. Navigate to the **Branding** tab, complete the required fields.
4. On the **App domain** add :
   - `https://your-domain`
   - `https://your-domain/privacy`
   - `https://your-domain/terms-of-services`
6. Click **Save**.  
7. Open the **Data Access** tab and add the following scopes:  
   - `.../auth/userinfo.email`  
   - `.../auth/userinfo.profile`  
   - `.../openid`  
8. Click **Save**.
9. Go to the **Clients** tab and click on **Create client** button.
10. Fill inputs and add these URIs on **Authorized Javascript origins**
   - `https://your-app-domain`
   - `http://localhost:5173`    // Not required but useful to test your app in local
11. On **Authorized redirect URIs** add:
   - `https://your-app-domain/auth/google/callback`
   - `http://localhost:5173/auth/google/callback` 
12. Click on **Save** and copy **Client ID** and **Client secret** to your environment variables file (GOOGLE_CLIENT_ID and GOOGLE_CLIENT_SECRET)
13. Also, fill the **GOOGLE_REDIRECTION_URI** according to your environment:
   - `https://your-app-domain/auth/google/callback` // For production
   - `http://localhost:5173/auth/google/callbackk` // For development
14. Go to the **Audience** tab and add test users.
15. Once your app is ready for production, click the **Publish App** button.  

## Handle authorizations

You can specify which routes require authorization by using the `checkAuthorization` function within the `load` function. Routes without this check will remain publicly accessible to both anonymous and authenticated users.

```svelte
import { checkAuthorization } from '$lib/server/auth/serverUtils';

export async function load({ locals }) {
	checkAuthorization(locals);
	return {};
}
```

The `checkAuthorization` function handle redirection like this :

| User | Redirection |
| --- | --- |
| Authenticated | No redirection |
| Authenticated and email not verified | Redirect to email verification page |
| Authenticated and 2FA not verified | Redirect to 2FA verification page |
| Not Authenticated | Redirect to authentication page |

This function also provide a second parameter to enable/disable some verification.
```svelte
type Config = {
        checkEmailVerified?: boolean; // Default : true
        checkRegistered2FA?: boolean;  // Default : false
        checkTwoFactor?: boolean; // Default : false
}
```

:::note[Note]
For most cases, I do **NOT** recommend using it. It is primarily intended for authentication-related routes (e.g. email verification).
:::

## Links

- [Google cloud console](https://console.cloud.google.com/)
- [Lucia website](https://lucia-auth.com/)