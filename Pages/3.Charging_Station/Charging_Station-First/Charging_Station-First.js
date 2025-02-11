document.addEventListener("DOMContentLoaded", function() {
    const optionIcon3D = document.getElementById('section_content-option_icon_3D');
    const sectionStation = document.querySelector('.section_content-option-station');
    const topDetailsBanner = document.querySelector('.section_content-top-details');
    const sectionCenter = document.querySelector('.section_content-center');
    const sectionContent = document.querySelector('.section_content');
    const topImage = document.querySelector('.section_content-top img');
    let isActive = false;
    let isAnimating = false;

    optionIcon3D.addEventListener("click", function() {
        if (isAnimating) return;  // หยุดถ้ากำลังมีการทำแอนิเมชั่นอยู่แล้ว
        isAnimating = true;

        if (!isActive) {
            // เปลี่ยนชื่อไฟล์เป็น 3D-active
            optionIcon3D.src = "../../../assets/Charging_Station/Option_status/3D-active.png";

            // เปลี่ยนแปลง .section_content-option-station ให้ display เป็น block
            sectionStation.style.display = "flex";

            // .section_content-top-details-banner ลอยขึ้นและจางหายไป
            gsap.to(topDetailsBanner, {
                y: -50,
                opacity: 0,
                duration: 1,
                ease: "power2.out"
            });

            // .section_content-center เลื่อนลง
            gsap.to(sectionCenter, {
                y: 50, // ประมาณ 5rem
                duration: 1,
                ease: "power2.out"
            });

            // .section_content เปลี่ยน height เป็น 900px
            gsap.to(sectionContent, {
                height: "900px",
                duration: 1,
                ease: "power2.out"
            });

            // .section_content-top img เปลี่ยนเป็น none และทำ fade out
            gsap.to(topImage, {
                opacity: 0,
                duration: 1,
                ease: "power2.out",
                onComplete: function() {
                    topImage.style.display = "none";
                    isAnimating = false;
                }
            });

            isActive = true;
        } else {
            // กลับไปเป็นเหมือนเดิม

            // เปลี่ยนชื่อไฟล์กลับเป็น 3D-inactive
            optionIcon3D.src = "../../../assets/Charging_Station/Option_status/3D-inactive.png";

            // เปลี่ยนแปลง .section_content-option-station ให้ display เป็น none
            sectionStation.style.display = "none";

            // .section_content-top-details-banner กลับมาที่เดิม
            gsap.to(topDetailsBanner, {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power2.out"
            });

            // .section_content-center กลับมาเลื่อนขึ้น
            gsap.to(sectionCenter, {
                y: 0,
                duration: 1,
                ease: "power2.out"
            });

            // .section_content เปลี่ยน height กลับมาเดิม
            gsap.to(sectionContent, {
                height: "800px",
                duration: 1,
                ease: "power2.out"
            });

            // .section_content-top img กลับมาและทำ fade in
            topImage.style.display = "block";
            gsap.to(topImage, {
                opacity: 1,
                duration: 1,
                ease: "power2.out",
                onComplete: function() {
                    isAnimating = false;
                }
            });

            isActive = false;
        }
    });
});
