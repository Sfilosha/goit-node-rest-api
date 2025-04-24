import gravatar from "gravatar";

export const generateAvatar = (email) => {
  const avatarURL = gravatar.url(email, { s: "250", d: "retro" }, true);
  return avatarURL;
};
