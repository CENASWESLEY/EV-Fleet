 

gsap.fromTo(".BG", 
    { y: 50, scale: 0.8, opacity: 0 },  
    { y: 0, scale: 1, opacity: 1, duration: 2, ease: "since.out" }
);

gsap.fromTo(".section_content-top-details", 
    { y: -50, opacity: 0 },  
    { y: 0, opacity: 1, duration: 2, ease: "expo.out", delay:1 }
);


gsap.fromTo(".assistant_right-circle", 
    { x: 200, opacity: 0, rotation: 360}, 
    { x: 0, opacity: 1, rotation: 0,duration: 2, ease: "expo.inOut", delay: 0.2 } 
);



setTimeout(() => {
    if (document.querySelector(".section_content-option > div")) {
        gsap.fromTo(".section_content-option> div:nth-child(1)",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1,delay:1.5 }
        ),
        gsap.fromTo(".section_content-option > div:nth-child(2)",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1,delay:1.6 }
        );

    }
},0); // รอ 0.5 วินาที


setTimeout(() => {
    if (document.querySelector(".section_content-charger_number > p")) {
        gsap.fromTo(".section_content-charger_number > p:nth-child(1)",
            { opacity: 0, y: 10 },
            { opacity: 1, y: 0, duration: 1,delay:0.5 }
        ),
        gsap.fromTo(".section_content-charger_number > p:nth-child(2)",
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1,delay:1.6 }
        );
        gsap.fromTo(".section_content-charger_number > p:nth-child(3)",
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 1,delay:1.7 }
        );
        gsap.fromTo(".section_content-charger_number > p:nth-child(4)",
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 1,delay:1.8 }
        );
        gsap.fromTo(".section_content-charger_number > p:nth-child(5)",
            { opacity: 0, y: 50 },
            { opacity: 1, y: 0, duration: 1,delay:1.9 }
        );

    }
},0); // รอ 0.5 วินาที


gsap.fromTo(".assistant_left-circle-group_icon > div:nth-child(1)", 
    {opacity: 0}, 
    { opacity: 1, delay:1} 
);
gsap.fromTo(".assistant_left-circle-group_icon > div:nth-child(2)", 
    {opacity: 0}, 
    { opacity: 1, delay:1.2} 
);
gsap.fromTo(".assistant_left-circle-group_icon > div:nth-child(3)", 
    {opacity: 0}, 
    { opacity: 1, delay:1.4} 
);
gsap.fromTo(".assistant_left-circle-group_icon > div:nth-child(4)", 
    {opacity: 0}, 
    { opacity: 1, delay:1.6} 
);
gsap.fromTo(".assistant_left-circle-group_icon > div:nth-child(5)", 
    {opacity: 0}, 
    { opacity: 1, delay:1.8} 
);


gsap.fromTo(".section_content-center", 
    { y: 200, opacity: 0 },  
    { y: 0, opacity: 1, duration: 2, ease: "power4", delay:1.5 }
);


gsap.fromTo(".section_content-center-transactions", 
    { y: 200, opacity: 0 },  
    { y: 0, opacity: 1, duration: 2, ease: "power4", delay:1.5 }
);

gsap.fromTo(".section_content-bottom-data-chart", 
    { y: 200, opacity: 0 },  
    { y: 0, opacity: 1, duration: 2, ease: "power4", delay:1.8 }
);


gsap.fromTo(".section_content-pages-arrow_right", 
    { x: 50, opacity: 0 },  
    { x: 0, opacity: 1, duration: 2, ease: "power4", delay:1.5 }
);

gsap.fromTo(".section_content-pages-arrow_left", 
    { x: -50, opacity: 0 },  
    { x: 0, opacity: 1, duration: 2, ease: "power4", delay:1.5 }
);
