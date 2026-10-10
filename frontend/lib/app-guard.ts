import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { serverApiUrl } from "./server-api";

async function fetchBackendProfile(userId: string) {
  const url = serverApiUrl(`/me/profile?user_id=${encodeURIComponent(userId)}`);
  try {
    const res = await fetch(url, { cache: "no-store" });
    if (!res.ok) {
      return null;
    }
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch profile in guard:", error);
    return null;
  }
}

export async function requireCompletedOnboardingProfile() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const profile = await fetchBackendProfile(session.user.id);
  if (!profile) {
    redirect("/login");
  }

  if (!profile.onboarding_completed) {
    redirect("/onboarding");
  }

  return { profile };
}

export async function requireIncompleteOnboardingProfile() {
  const session = await auth();
  if (!session?.user?.id) {
    redirect("/login");
  }

  const profile = await fetchBackendProfile(session.user.id);
  if (!profile) {
    redirect("/login");
  }

  if (profile.onboarding_completed) {
    redirect("/feed");
  }

  return { profile };
}

export async function redirectAuthenticatedUserAwayFromAuthPages() {
  const session = await auth();
  if (session?.user?.id) {
    const profile = await fetchBackendProfile(session.user.id);
    if (profile && !profile.onboarding_completed) {
      redirect("/onboarding");
    } else {
      redirect("/feed");
    }
  }
}

export async function redirectAuthenticatedUserToOnboardingIfNeeded() {
  const session = await auth();
  if (session?.user?.id) {
    const profile = await fetchBackendProfile(session.user.id);
    if (profile && !profile.onboarding_completed) {
      redirect("/onboarding");
    }
  }
}
