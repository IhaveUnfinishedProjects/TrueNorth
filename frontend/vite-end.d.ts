/// <reference types="vite-plugin-svgr/client" />

declare module '*.css' {
  // Tells TypeScript that importing any .css file is OK
  // and treats it as a module without specific content.
  const content: any; 
  export default content;
}

declare module '*.svg?url' {
  const content: string;
  export default content;
}