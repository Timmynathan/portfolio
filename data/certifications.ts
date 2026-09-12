import type { Certification } from "@/types";

export const CERTIFICATIONS: Certification[] = [
  {
    title: "AWS Certified Cloud Practitioner",
    issuer: "Amazon Web Services",
    date: "August 2026",
    expires: "August 2029",
    // Draft — no description was supplied for this one; tweak freely.
    description:
      "Validates foundational understanding of AWS Cloud concepts, core services, security, architecture, pricing, and support across compute, storage, and networking.",
    verifyUrl: "https://www.credly.com/badges/f2c554f8-9c68-4b08-a635-ee5a3043c299/linked_in?t=tkmu5q",
  },
  {
    title: "Claude Code in Action",
    issuer: "Anthropic",
    date: "July 2026",
    description:
      "Verified practitioner in configuring, customising, securing, and automating Claude Code in real development workflows — from local dev environments to CI/CD pipelines.",
    verifyUrl: "https://verify.skilljar.com/c/44waskeh3csi",
  },
  {
    title: "Introduction to Agent Skills",
    issuer: "Anthropic Education",
    date: "July 2026",
    description:
      "Foundational course on building and applying agent skills with Claude — designing reusable, composable skills that extend an agent's capabilities across development tasks.",
    verifyUrl: "https://verify.skilljar.com/c/2ed3bdcn4rxr",
  },
];
