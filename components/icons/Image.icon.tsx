import * as React from 'react'

type TIcon = {
  width?: number
  height?: number
  fill?: string
  stroke?: string
}

const ImageIcon: React.FC<TIcon> = ({ width, height, fill, stroke }) => {
  return (
    <svg
      version="1.0"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 512.000000 512.000000"
      preserveAspectRatio="xMidYMid meet"
      fill={fill || stroke || 'black'}
      stroke={stroke || fill || 'black'}
      width={width || 24}
      height={height || 24}
    >
      <g transform="translate(0.000000,512.000000) scale(0.100000,-0.100000)">
        <path d="M1220 4877 c-92 -31 -156 -71 -222 -138 -63 -65 -119 -169 -137 -257 -8 -37 -11 -431 -11 -1290 0 -1362 -2 -1302 62 -1426 43 -82 148 -185 229 -225 130 -64 41 -61 1845 -61 1143 0 1658 3 1700 11 104 19 197 70 278 151 39 40 83 96 98 124 60 113 58 51 58 1429 0 1018 -3 1270 -14 1310 -48 182 -199 333 -381 381 -41 11 -364 14 -1745 14 l-1695 -1 -65 -22z m3410 -422 c63 -32 60 0 58 -828 l-3 -755 -300 351 c-383 448 -405 472 -479 510 -58 30 -67 32 -171 32 -101 0 -114 -2 -165 -28 -30 -16 -68 -40 -84 -55 -16 -15 -210 -244 -431 -509 l-402 -481 -149 149 c-163 164 -208 194 -314 209 -77 11 -153 -1 -228 -35 -48 -22 -107 -76 -370 -338 l-312 -312 2 1015 c3 946 4 1017 20 1040 10 13 28 30 40 37 18 10 363 12 1641 13 1427 0 1621 -2 1647 -15z" />
        <path d="M1765 4235 c-81 -33 -131 -70 -181 -132 -67 -82 -88 -148 -89 -273 0 -98 2 -110 32 -173 160 -337 627 -338 785 -2 23 51 31 84 35 148 12 184 -74 335 -235 414 -71 35 -82 38 -181 41 -95 2 -112 0 -166 -23z" />
        <path d="M503 3335 c-17 -55 -137 -446 -264 -870 l-233 -770 -1 -126 0 -126 42 -85 c50 -100 128 -180 217 -222 62 -29 3384 -922 3468 -932 126 -15 278 37 373 127 91 86 105 118 219 479 58 184 106 340 106 347 0 10 -340 13 -1612 15 l-1613 3 -74 23 c-150 46 -263 115 -367 224 -97 101 -155 203 -200 353 -17 55 -19 128 -24 860 l-5 800 -32 -100z" />
      </g>
    </svg>
  )
}

export default ImageIcon
