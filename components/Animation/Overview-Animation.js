
  // Logo: เคลื่อนที่จากซ้าย
  gsap.fromTo(".section_top-menu-logo", 
    { x: -200, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1.5, ease: "since.inOut", delay: 0.2} 
);

// Header: เลื่อนลงมาจากด้านบน
gsap.fromTo(".section_top-menu-header", 
    { y: -100, opacity: 0 }, 
    { y: 0, opacity: 1, duration: 1.5, ease: "since.inOut", delay: 0.2 } 
);

// Profile: เคลื่อนที่จากขวา
gsap.fromTo(".section_top-menu-profile", 
    { x: 200, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1.5, ease: "since.inOut", delay: 0.2 } 
);

gsap.fromTo(".assistant_left-circle", 
    { x: -200, opacity: 0, rotation: 360}, 
    { x: 0, opacity: 1, rotation: 0,duration: 2, ease: "expo.inOut", delay: 0.2 } 
);

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

gsap.fromTo(".section_content-background", 
    { y: -50, scale: 0.8, opacity: 0 },  
    { y: 0, scale: 1, opacity: 1, duration: 2, ease: "since.out" }
);

gsap.fromTo(".section_content-details-widget", 
    { y: 50, opacity: 0 },  
    { y: 0, opacity: 1, duration: 2, ease: "since.out", delay: 2 }
);

gsap.fromTo(".section_content-details-datalize", 
    { opacity: 0 }, 
    {  opacity: 1, duration: 1, ease: "since.out", delay: 2  } 
);
gsap.fromTo(".section_content-details-text", 
    { x:-200,opacity: 0 },
    { x: 0, opacity: 1, duration: 2, ease: "power4", delay: 2  } 
);
gsap.fromTo(".section_content-details-widget-first", 
    { y: 0, scale: 0.8, opacity: 0 }, 
    { y: 0, scale: 1, opacity: 1, duration: 2, ease: "elastic.inOut", delay:2 } 
);
gsap.fromTo(".section_content-details-widget-pages", 
    { y: 0, scale: 0.8, opacity: 0 },
    { y: 0, scale: 1, opacity: 1, duration: 2, ease: "elastic.inOut", delay:2 }
);
gsap.fromTo(".section_content-menu", 
    { y: -50, opacity: 0 },  
    { y: 0, opacity: 1, duration: 2, ease: "expo.out", delay:2 }
);

gsap.fromTo(".section_bottom-content-charging_status", 
    { x: -200, opacity: 0 },  
    { x: 0, opacity: 1, duration: 2, ease: "power4", delay:2.5 }
);




window.setTimeout(() => {
    const elements = document.querySelectorAll(".section_bottom-content-charging_status-details > div");

    if (elements.length > 0) {
        let delay = 2.4; // กำหนด delay เริ่มต้น

        elements.forEach((element, index) => {
            gsap.fromTo(
                `.section_bottom-content-charging_status-details > div:nth-child(${index + 1})`,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: delay }
            );
            delay += 0.1; // เพิ่ม delay ทีละ 0.1
        });
    }
}, 500); // รอ 0.5 วินาที


gsap.fromTo(".section_bottom-content-data", 
    { y: 200, opacity: 0 },  
    { y: 0, opacity: 1, duration: 2, ease: "power4", delay:2.5 }
);

window.setTimeout(() => {
    const elements = document.querySelectorAll(".section_bottom-content-data-details > div");

    if (elements.length > 0) {
        let delay = 2.4; // กำหนด delay เริ่มต้น

        elements.forEach((element, index) => {
            gsap.fromTo(
                `.section_bottom-content-data-details > div:nth-child(${index + 1})`,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: delay }
            );
            delay += 0.1; // เพิ่ม delay ทีละ 0.1
        });
    }
}, 500); // รอ 0.5 วินาที




gsap.fromTo(".section_bottom-content-maintenance", 
    { x: 200, opacity: 0 },  
    { x: 0, opacity: 1, duration: 2, ease: "power4", delay:2.5 }
);



window.setTimeout(() => {
    const elements = document.querySelectorAll(".section_bottom-content-maintenance-details > div");

    if (elements.length > 0) {
        let delay = 2.4; // กำหนด delay เริ่มต้น

        elements.forEach((element, index) => {
            gsap.fromTo(
                `.section_bottom-content-maintenance-details > div:nth-child(${index + 1})`,
                { opacity: 0, y: 50 },
                { opacity: 1, y: 0, duration: 1, delay: delay }
            );
            delay += 0.1; // เพิ่ม delay ทีละ 0.1
        });
    }
}, 500); // รอ 0.5 วินาที

gsap.fromTo(".section_bottom-menu-help", 
    { x: 200, opacity: 0 }, 
    { x: 0, opacity: 1, duration: 1.5, ease: "since.inOut", delay: 0.2} 
);