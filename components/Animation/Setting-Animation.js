

gsap.fromTo(".section_content", 
    { y: 100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.5, ease: "since.inOut", delay: 0.2 } 
);

gsap.fromTo(".section_content-details-title_user img", 
    { x: -100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1.5, ease: "since.inOut", delay: 0.6 } 
);

 
gsap.fromTo(".section_content-details-title_user_text > p:nth-child(1)", 
    { opacity: 0, x: 50 },
    { opacity: 1, x: 0, duration: 1,delay:0.8 }
);
gsap.fromTo(".section_content-details-title_user_text > p:nth-child(2)", 
    { opacity: 0, x: -50 },
    { opacity: 1, x: 0, duration: 1,delay:1.0 }
);

gsap.fromTo(".section_content-details-title_bg", 
    {  opacity: 0 },  
    {  opacity: 1, duration: 3, ease: "since.out" }
);


gsap.fromTo(".section_content-details-cards", 
    { y: 200, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1, ease: "since.inOut", delay: 1.0 } 
);


gsap.fromTo(".section_content-details-icons_setting", 
    { x: 100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1, ease: "since.inOut", delay: 1.0 } 
);


gsap.fromTo(".section_content-details-icons_logout", 
    { x: 100, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1, ease: "since.inOut", delay: 1.4 } 
);

gsap.fromTo(".assistant_right-circle", 
    { x: 200, opacity: 0, rotation: 360}, 
    { x: 0, opacity: 1, rotation: 0,duration: 2, ease: "expo.inOut", delay: 0.2 } 
);

gsap.fromTo(".section_content-details-number", 
    { x: 0, opacity: 0, scale:0.8}, 
    { x: 0, opacity: 1, scale:1.0,duration: 2, ease: "expo.inOut", delay: 0.5 } 
);


gsap.fromTo(".section_content-pages-arrow_right", 
    { x: 50, opacity: 0 },  
    { x: 0, opacity: 1, duration: 2, ease: "power4", delay:1.5 }
);

gsap.fromTo(".section_content-pages-arrow_left", 
    { x: -50, opacity: 0 },  
    { x: 0, opacity: 1, duration: 2, ease: "power4", delay:1.5 }
);


gsap.fromTo(".assistant_right-circle-group_icon > div:nth-child(1)", 
    {opacity: 0}, 
    { opacity: 1, delay:1} 
);
gsap.fromTo(".assistant_right-circle-group_icon > div:nth-child(2)", 
    {opacity: 0}, 
    { opacity: 1, delay:1.2} 
);
gsap.fromTo(".assistant_right-circle-group_icon > div:nth-child(3)", 
    {opacity: 0}, 
    { opacity: 1, delay:1.4} 
);
gsap.fromTo(".assistant_right-circle-group_icon > div:nth-child(4)", 
    {opacity: 0}, 
    { opacity: 1, delay:1.6} 
);
gsap.fromTo(".assistant_right-circle-group_icon > div:nth-child(5)", 
    {opacity: 0}, 
    { opacity: 1, delay:1.8} 
);

gsap.fromTo(".section_content-center-transactions", 
    { y: 200, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1, ease: "since.inOut", delay: 1.0 } 
);
