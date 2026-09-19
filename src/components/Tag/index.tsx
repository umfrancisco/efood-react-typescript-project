import type { ReactNode } from "react";
import { TagInfo, TagButton, TagLink } from "./styles";

export type Props = {
  children?: ReactNode;
  path?: string;
};

function Tag({ children, path }: Props) {
  if (path) {
    return (
      <TagButton path={path}>
        <TagLink to={path}>Saiba mais</TagLink>
      </TagButton>
    );
  }
  return <TagInfo>{children}</TagInfo>;
}

export default Tag;
