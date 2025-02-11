class Assistant_Right extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
    <div class="assistant_right">
        <div class="assistant_right-circle">
          <div class="assistant_right-circle-group_icon">
            <div class="assistant_right-circle-icon">
              <a href="../../6.Setting/Setting_First/Setting_First.html" data-icon="First">
                <img src="../../../assets/Setting/Assistant_right/First-active.png" alt="First">
              </a>
            </div>
            <div class="assistant_right-circle-icon">
              <a href="../../6.Setting/Setting_Second/Setting_Second.html" data-icon="Second">
                <img src="../../../assets/Setting/Assistant_right/Second-inactive.png" alt="Second">
              </a>
            </div>
            <div class="assistant_right-circle-icon">
              <a href="../../6.Setting/Setting_Third/Setting_Third.html" data-icon="Third">
                <img src="../../../assets/Setting/Assistant_right/Third-inactive.png" alt="Third">
              </a>
            </div>
          </div>
          <div class="assistant_right-circle-icon_box-tooltip">
                <div class="assistant_right-circle-icon_box-first">
                    <div class="assistant_right-circle-icon_tooltip-first">
                        <p id="firstLabel">My Card<br>Profile</p>
                    </div>
                  </div>
                  <div class="assistant_right-circle-icon_box-second">
                    <div class="assistant_right-circle-icon_tooltip-seconde">
                        <p id="secondLabel">Team<br>Management</p>
                    </div>
                  </div>
                  <div class="assistant_right-circle-icon_box-third">
                    <div class="assistant_right-circle-icon_tooltip-third">
                        <p id="thirdLabel">Other Card<br>Profile</p>
                    </div>
                  </div>
              </div>
        </div>
      </div>
      `;
  
      const style = document.createElement("style");
      style.textContent = `
        .assistant_right {
          position: absolute;
          right: -660px;
          z-index: var( --z-immediate);
        }
  
        .assistant_right-circle {
          position: relative;
          width: 800px;
          height: 800px;
          border-radius: 50%;
          border: 100px solid var(--bg-main-color-orange);
          box-shadow: 0 0 20px var(--bg-main-color-orange);
        }
  
        .assistant_right-circle-group_icon {
          position: absolute;
          top: 200px;
          left: -65px;
          display: flex;
          gap: 3rem;
          width: 75px;
          height: 370px;
          flex-direction: column;
        }
  
        .assistant_right-circle-icon img {
          width: 30px;
          transition: transform 0.2s ease-in-out;
        }
  
        .assistant_right-circle-icon img:hover {
          transform: scale(1.2);
        }
  
        .assistant_right-circle-icon:nth-child(1),
        .assistant_right-circle-icon:nth-child(3) {
          margin-left: 10px;
        }
          
          .assistant_right-circle-icon_box-first{
              position: absolute;
              left: -4.2rem;
              top: 14.5rem;
            }
            .assistant_right-circle-icon_box-tooltip  p{

              opacity: 0.5;
              transition: opacity 0.3s ease;
              font-size: var(--h3-font-size);
              color: var(--text-white);
              text-align:center;
              cursor:default;
            }

            .assistant_right-circle-icon_box-second{

              position: absolute;
              left: -5rem;
              top: 19.2rem;
              
            }

            .assistant_right-circle-icon_box-third{

              position: absolute;
              left: -3.8rem;
              top: 24.2rem;
              
            }
            .active_label{

              opacity: 1 !important;
            }
      `;
      this.appendChild(style);


      
  
      document.addEventListener("DOMContentLoaded", () => {
        const icons = this.querySelectorAll(".assistant_right-circle-icon img");
        const labels = {
            "First": this.querySelector("#firstLabel"),
            "Second": this.querySelector("#secondLabel"),
            "Third": this.querySelector("#thirdLabel")
        };

        // ฟังก์ชันสำหรับรีเซ็ต opacity ของทุกป้าย
        const resetLabels = () => {
            Object.values(labels).forEach(label => {
                label.classList.remove("active_label");
            });
        };

        // ฟังก์ชันสำหรับตั้งค่า opacity ของป้ายที่เลือก
        const setActiveLabel = (iconName) => {
            resetLabels();
            if (labels[iconName]) {
                labels[iconName].classList.add("active_label");
            }
        };

        // ตรวจสอบ URL ปัจจุบันเพื่อกำหนดไอคอนและป้ายที่ active
        const currentPage = window.location.pathname.split("/").pop();

        icons.forEach(icon => {
            const link = icon.closest("a");
            const iconName = link.getAttribute("data-icon");

            // ตรวจสอบว่าลิงก์ตรงกับหน้าปัจจุบันหรือไม่
            if (link.getAttribute("href").includes(currentPage)) {
                icon.src = `/assets/Setting/Assistant_right/${iconName}-active.png`;
                setActiveLabel(iconName);
            } else {
                icon.src = `/assets/Setting/Assistant_right/${iconName}-inactive.png`;
            }

            // เพิ่ม event listener สำหรับการคลิก
            link.addEventListener("click", (e) => {
                // ก่อนที่จะเปลี่ยนหน้า ให้ตั้งค่า active ป้าย
                setActiveLabel(iconName);
            });
        });
    });
}
}
  customElements.define("assistant-right-s", Assistant_Right);
  