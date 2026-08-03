import NotFoundScreen, { defaultNotFoundCopy } from "@/components/NotFoundScreen";
import { defaultLocale } from "./i18n/request";

/** Root not-found fallback used alongside global-not-found. */
export default function NotFound() {
  return (
    <NotFoundScreen
      homeHref={`/${defaultLocale}/`}
      copy={defaultNotFoundCopy}
    />
  );
}
