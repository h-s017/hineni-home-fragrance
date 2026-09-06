export default function Footer(){
  const socials=[
    {name:"Instagram",href:"https://www.instagram.com/hanas.scent/",icon:"/icons/footer/instagram.svg"},
    {name:"Facebook",href:"https://www.facebook.com/Hanas017",icon:"/icons/footer/facebook.svg"},
    {name:"LINE",href:"https://lin.ee/OI4bzr1",icon:"/icons/footer/line.svg"},
    {name:"Email",href:"mailto:hanascent@gmail.com",icon:"/icons/footer/email.svg"},
  ];

  return <footer className="site-footer">
    <div className="site-footer__left">
      <div className="site-footer__brand">
        <span>HINENI <strong>此域 選物</strong></span>
        <i>SCENT &amp; LIVING OBJECTS</i>
      </div>
      <p>© 2026 HINENI</p>
    </div>

    <nav className="site-footer__social" aria-label="社群與聯絡方式">
      {socials.map(item=><a
        key={item.name}
        href={item.href}
        target={item.name==="Email"?undefined:"_blank"}
        rel={item.name==="Email"?undefined:"noreferrer"}
        aria-label={item.name}
      ><img src={item.icon} alt="" aria-hidden="true"/></a>)}
    </nav>

    <div className="site-footer__address">
      <p>台北市北投區新民路42號</p>
      <p><a href="https://www.beitouheartvillage.taipei/" target="_blank" rel="noreferrer">北投中心新村</a> D1區C棟</p>
    </div>
  </footer>;
}
