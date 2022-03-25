import React from "react";
import { Link } from 'gatsby'

export default function Header({ locale }) {

  const homePath =  !locale || locale === 'en' ? '/' : `/${locale}`

  return (
    <h2 className="text-2xl md:text-4xl font-bold tracking-tight md:tracking-tighter leading-tight mb-20 mt-8">
      <Link to={homePath} className="hover:underline">
        UPM-Bioarki
      </Link>
    </h2>
  )
}
