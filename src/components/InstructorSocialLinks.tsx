import React, { type JSX } from "react";
import {
  FaEnvelope,
  FaPhone,
  FaLinkedin,
  FaTwitter,
  FaGlobe,
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaDiscord,
} from "react-icons/fa";
import Skeleton from "./Skeleton";
import type { SocialLinks } from "../@types/instructor";

interface Props {
  social?: SocialLinks[]|[];
  loading?: boolean;
}

const ICON_MAP: Record<SocialLinks["platform"], { icon: JSX.Element; label: string }> = {
  email: { icon: <FaEnvelope />, label: "Email" },
  phone: { icon: <FaPhone />, label: "Call" },
  website: { icon: <FaGlobe />, label: "Website" },
  linkedin: { icon: <FaLinkedin />, label: "LinkedIn" },
  github: { icon: <FaGithub />, label: "GitHub" },
  facebook: { icon: <FaFacebook />, label: "Facebook" },
  x: { icon: <FaTwitter />, label: "X" },
  instagram: { icon: <FaInstagram />, label: "Instagram" },
  discord: { icon: <FaDiscord />, label: "Discord" },
};

const InstructorSocialLinks = ({ social, loading = false }: Props) => {
  if (loading) {
    return (
      <div className="flex flex-wrap gap-3 mt-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <Skeleton
            key={i}
            extraClass="h-6 w-24 rounded-md bg-gray-300"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="flex flex-wrap gap-3 mt-2 social_links">
      {(social??[]).map(({ platform, url }) => {
        const item = ICON_MAP[platform];
        if (!item) return null;

        const href =
          platform === "email"
            ? `mailto:${url}`
            : platform === "phone"
            ? `tel:${url}`
            : url;

        return (
          <a
            key={url}
            href={href}
            target={["email", "phone"].includes(platform) ? "_self" : "_blank"}
            rel="noreferrer"
            className="flex items-center gap-1 hover:underline text-blue-400 hover:text-blue-500 transition-colors"
          >
            {item.icon}
          </a>
        );
      })}
    </div>
  );
};

export default InstructorSocialLinks;
