/** Fine engraving hatch behind the stage, top-left and bottom-right corners. */
export default function BackdropLines() {
  return (
    <svg
      viewBox="0 0 1440 900"
      preserveAspectRatio="xMidYMid slice"
      aria-hidden="true"
      className="backdrop-lines pointer-events-none absolute inset-0 z-0 h-full w-full"
    >
      <g fill="none" stroke="#8C8070">
        <path d="M0 32 C 22 16 36 40 58 20 S 78 8 88 0" opacity=".28" />
        <path d="M0 62 C 40 32 66 74 104 40 S 138 16 156 0" opacity=".22" />
        <path d="M0 92 C 62 52 96 108 148 62 S 200 22 226 0" opacity=".34" />
        <path d="M0 118 C 84 66 132 132 196 84 S 262 26 288 0" opacity=".4" />
        <path d="M0 152 C 54 112 102 172 152 118 S 222 46 258 0" opacity=".14" />
        <path d="M0 176 C 62 128 116 196 172 134 S 250 52 292 0" opacity=".26" />
        <path d="M0 206 C 86 154 148 236 226 158 S 330 62 372 0" opacity=".18" />
        <path d="M0 236 C 96 176 168 268 258 178 S 372 74 424 0" opacity=".3" />
        <path d="M0 290 C 108 232 182 330 288 234 S 434 92 500 0" opacity=".12" />
        <path d="M0 352 C 130 292 214 396 340 282 S 500 108 572 0" opacity=".2" />
        <path d="M0 424 C 150 356 244 468 396 330 S 566 126 648 0" opacity=".09" />
        <path d="M0 500 C 172 424 280 542 452 386 S 636 146 726 0" opacity=".07" />
        <path d="M1352 900 C 1382 872 1400 898 1422 876 S 1434 866 1440 858" opacity=".28" />
        <path d="M1272 900 C 1324 852 1352 894 1394 848 S 1424 826 1440 810" opacity=".22" />
        <path d="M1206 900 C 1268 838 1306 894 1358 826 S 1414 774 1440 748" opacity=".34" />
        <path d="M1132 900 C 1206 826 1256 892 1318 812 S 1400 736 1440 704" opacity=".4" />
        <path d="M1062 900 C 1146 818 1198 892 1268 800 S 1378 692 1440 634" opacity=".14" />
        <path d="M984 900 C 1090 812 1150 894 1244 778 S 1372 664 1440 588" opacity=".26" />
        <path d="M910 900 C 1030 796 1096 894 1200 764 S 1354 604 1440 512" opacity=".18" />
        <path d="M844 900 C 972 796 1042 896 1160 748 S 1348 578 1440 468" opacity=".3" />
        <path d="M760 900 C 906 782 984 894 1112 726 S 1330 520 1440 392" opacity=".12" />
        <path d="M672 900 C 840 768 924 892 1062 700 S 1310 456 1440 310" opacity=".2" />
        <path d="M582 900 C 772 752 862 890 1010 672 S 1288 386 1440 224" opacity=".09" />
        <path d="M492 900 C 704 736 800 888 958 642 S 1264 312 1440 134" opacity=".07" />
      </g>
    </svg>
  )
}
