import { redirect } from "next/navigation";
import { links } from "../components/links";

export default function Jobs () {
    redirect(links.home)
}