// Foi utilizado o https://github.com/kristerkari/react-native-svg-transformer
// para reconhecimento de imagens svg na aplicação

declare module "*.svg" {
    import React from 'react';
    import { SvgProps } from "react-native-svg";
    const content: React.FC<SvgProps>;
    export default content;
  }