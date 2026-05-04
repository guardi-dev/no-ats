'use client'

import { redirect } from "next/navigation";
import { useEffect } from "react";
import { links } from "../components/links";

export default function Jobs () {

    useEffect(() => {
        redirect(links.home);
    }, []);

    return null;
}