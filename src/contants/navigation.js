import { IoHome } from "react-icons/io5";
import { PiTelevisionSimple } from "react-icons/pi";
import { BiSolidMoviePlay } from "react-icons/bi";
import { GoSearch } from "react-icons/go";

export const navigation = [
  {
    label: "TV Shows",
    href: "/explore/tv",
    icon: <PiTelevisionSimple />,
  },
  {
    label: "Movies",
    href: "/explore/movie",
    icon: <BiSolidMoviePlay />,
  },
];

export const mobileNavigation = [
  {
    label: "Home",
    href: "/",
    icon: <IoHome />,
  },
  ...navigation,
  {
    label: "Search",
    href: "/search",
    icon: <GoSearch />,
  },
];
