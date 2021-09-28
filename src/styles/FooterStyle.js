export default (style)=>{
  return(`

    .FooterLink {
      color: rgba(0,0,0,0.2);
      display: inline-block;
      font-size: 0.9rem;
      text-decoration: none;
      padding-top: 0;
      padding-bottom: 0;
    }

    .FooterLink:hover, .FooterLink:active {
      color: ${style.colors.primary};
    }
  `)
}
