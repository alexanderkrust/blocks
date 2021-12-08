import React from "react";
import { Blocks, QuoteBasic, HeaderLogo2 } from "@blocks/react";
export default (() => {
  React.useEffect(() => {
    console.log('say hi');
  }, []);
  return <Blocks.Root><QuoteBasic>
      <QuoteBasic.Content sx={{
        bg: "highlight"
      }}>Science is magic that works.</QuoteBasic.Content>
      <QuoteBasic.Author>Kurt Vonnegut</QuoteBasic.Author>
    </QuoteBasic><HeaderLogo2>
      <HeaderLogo2.Logo to="/" />
      <HeaderLogo2.Nav>
        <HeaderLogo2.Link to="/about">About</HeaderLogo2.Link>
        <HeaderLogo2.Link to="/blog">Blog</HeaderLogo2.Link>
        <HeaderLogo2.Link to="/contact">Contact</HeaderLogo2.Link>
      </HeaderLogo2.Nav>
    </HeaderLogo2></Blocks.Root>;
});