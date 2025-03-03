import { NextResponse } from 'next/server';
import { availableLocales } from './next.locales.mjs';
import type { NextRequest } from 'next/server';

// This Middleware is responsible for handling automatic language detection from a user's Browser
// This middleware should only run on "/" requests coming to the Website
export const middleware = async (request: NextRequest) => {
  const { pathname, search } = request.nextUrl;

  // This function allows us to redirect with a Locale Code
  const redirectWithLocale = (_locale: string) => {
    const redirectUrl = `/${_locale}${pathname}${search}`;

    return NextResponse.redirect(new URL(redirectUrl, request.url));
  };

  const localeCookie = request.cookies.get('NEXT_LOCALE');

  // If we already have a NEXT_LOCALE Cookie, then Redirect to the stored Locale Code
  if (localeCookie?.value && localeCookie.value !== 'default') {
    return redirectWithLocale(localeCookie.value);
  }

  // If not, we try to check if the Browser is sending `Accept-Language` Header
  const acceptedLanguagesRaw = request.headers.get('Accept-Language') || 'en';

  // If present, we try to split the format into ['code', 'q=order', ...]
  // Where q= is the precedence of the Accepted Language
  // We then filter those out as we don't want them
  const acceptedLanguages = acceptedLanguagesRaw
    .split(';')
    .map(collection => collection.split(','))
    .flat()
    .filter(locale => !locale.startsWith('q='));

  // We check if we have any matching Language in the order of preference given
  // And if yes, we return that Locale Code
  const matchedLocaleCode = acceptedLanguages.find(acceptedLocale =>
    availableLocales.some(locale => locale.code === acceptedLocale)
  );

  // We create a new Response Object containing the Locale Match or the default Language
  const responseWithCookie = redirectWithLocale(matchedLocaleCode || 'en');

  // Then we set a Cookie to avoid this calculation from happening on every / hit
  responseWithCookie.cookies.set('NEXT_LOCALE', matchedLocaleCode || 'en');

  return responseWithCookie;
};

export const config = { matcher: '/' };
