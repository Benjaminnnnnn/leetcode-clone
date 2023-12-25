import Link from "next/link";

type Props = {
  to: string;
  name: string;
};

const NavbarItem = ({ to, name }: Props) => {
  return (
    <Link
      href={to}
      className="block bg-accent-foreground bg-clip-text font-normal text-transparent hover:bg-gradient-primary"
    >
      {name}
    </Link>
  );
};

export default NavbarItem;
