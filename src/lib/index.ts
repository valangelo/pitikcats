const isDev = import.meta.env.MODE === 'development'; // Check if in development mode

export const paths = {
    styles: isDev ? '/src/assets/styles/' : './assets/styles/',
    design: isDev ? '/src/assets/images/design/' : './assets/images/design/',
    gallery: isDev ? '/src/assets/images/gallery/' : './assets/images/gallery/'
};

export const designImages = {
    logo: `${paths.design}pitikElliot.svg`,
    mainBackgroundImage: `${paths.design}seamless_paper_texture.png`,
    secondaryBackgroundImage: `${paths.design}kelan-Paper-texture-filter.svg`,
    borderImage: `${paths.design}Border-border.svg`,
    buttonBorderImage: `${paths.design}Border-button.svg`,          
};
