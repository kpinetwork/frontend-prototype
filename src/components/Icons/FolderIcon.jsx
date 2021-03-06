import * as React from 'react'

function FolderIcon (props) {
  return (
    <svg
      width={100}
      height={100}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path
        d="M3.125 18.75l.25 5.438a12.438 12.438 0 00-2.137 8.193l3.98 43.75A12.5 12.5 0 0017.664 87.5H56.25v-6.25H17.663a6.25 6.25 0 01-6.22-5.688l-3.98-43.75A6.25 6.25 0 0113.687 25h72.626a6.25 6.25 0 016.224 6.813L90.875 50h6.281l1.6-17.619A12.502 12.502 0 0086.312 18.75H61.425a12.5 12.5 0 01-8.837-3.662l-5.175-5.175a12.5 12.5 0 00-8.838-3.663h-22.95a12.5 12.5 0 00-12.5 12.5zm35.45-6.25a6.25 6.25 0 014.419 1.831l4.419 4.419H13.688c-1.5 0-2.938.262-4.27.75l-.043-.875a6.25 6.25 0 016.25-6.125h22.95z"
        fill="#0E4DA4"
      />
      <path
        d="M84.375 62.5a3.125 3.125 0 013.125 3.125V75h9.375a3.125 3.125 0 110 6.25H87.5v9.375a3.125 3.125 0 11-6.25 0V81.25h-9.375a3.125 3.125 0 110-6.25h9.375v-9.375a3.125 3.125 0 013.125-3.125z"
        fill="#0E4DA4"
      />
    </svg>
  )
}

export default FolderIcon
