export default (style)=>{
  return(`

    * {
      color: ${style.colors.text};
    }

    h1, h2, h3, h4, h5, h6 {
      display: block;
    }

    .Text {
      font-size: 16px;
      line-height: 24px
    }

    .TextLeft, .TextLeft * {
      text-align: left !important;
    }

    .TextCenter, .TextCenter * {
      text-align: center;
    }

    .LineHeightL {
      line-height: 32px;
    }

    .ErrorSnippetText {
      background: rgb(30, 30, 20);
      border-radius: 19px;
      border: 8px solid rgb(30, 30, 20);
      color: #00FF41;
      font-size: 15px;
      font-style: italic;
      max-height: 100px;
      padding: 6px;
      overflow-wrap: break-word;
      overflow-y: auto;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  `)
}
