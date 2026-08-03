"use client";

import NotFoundScreen from "@/components/NotFoundScreen";
import { useLocale, useTranslations } from "next-intl";

export default function NotFound() {
  const t = useTranslations("notFound");
  const locale = useLocale();

  return (
    <NotFoundScreen
      homeHref={`/${locale}/`}
      copy={{
        status: t("status"),
        heading: t("heading"),
        description: t("description"),
        backHome: t("backHome"),
      }}
    />
  );
}
