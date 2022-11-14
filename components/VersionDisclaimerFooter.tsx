import React from 'react'
import { VERSION } from 'version'

export const VersionDisclaimerFooter: React.FC = () => {
  return (
    <div className="bg-primary absolute left-0 right-0 text-center text-sm text-light p-8 mt-16 grid grid-col gap-y-2">
      <p>
        Meeste afbeeldingen zijn niet zelfgemaakt. <br className="hidden sm:inline" />
        Alle credits aan de gelinkte originele recepten.
      </p>
      <p className="font-semibold">Versie {VERSION}</p>
    </div>
  )
}
