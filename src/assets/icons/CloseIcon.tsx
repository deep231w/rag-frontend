import SvgIcon from "@mui/material/SvgIcon";
import type { SvgIconProps } from "@mui/material/SvgIcon";

export default function CrossIcon(props: SvgIconProps) {
  return (
    <SvgIcon {...props} viewBox="0 0 25 25">
      <path
        d="M20.396 22.4c-.782.78-2.049.78-2.832 0l-7.08-7.08-7.08 7.08c-.782.78-2.05.78-2.832 0-.782-.79-.782-2.05 0-2.84l7.08-7.08-7.08-7.08c-.782-.78-.782-2.05 0-2.83.782-.78 2.05-.78 2.832 0l7.08 7.08 7.08-7.08c.783-.78 2.05-.78 2.832 0 .783.78.783 2.05 0 2.83l-7.08 7.08 7.08 7.08c.783.79.783 2.05 0 2.84z"
        fill="currentColor"
      />
    </SvgIcon>
  );
}