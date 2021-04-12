import React from "react";
import { Box } from "theme-ui";

const Giphy = ({ url }) => {
  return (
    <Box sx={{ maxWidth: '600px', width: "100%" }}>
      <div style={{ width: '100%', height: '0', paddingBottom: '50%', position: 'relative'}}>
        <iframe src={url} title={url} width="100%" height="100%" style={{ position: 'absolute' }} frameBorder="0" class="giphy-embed" allowFullScreen></iframe>
      </div>
    </Box>
  )
};

export default Giphy;
