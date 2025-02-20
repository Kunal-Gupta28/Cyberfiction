//  locomotive setup
function locomotive() {
  gsap.registerPlugin(ScrollTrigger);

  // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

  const locoScroll = new LocomotiveScroll({
    el: document.querySelector("main"),
    smooth: true,
  });
  // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
  locoScroll.on("scroll", ScrollTrigger.update);

  // tell ScrollTrigger to use these proxy methods for the "main" element since Locomotive Scroll is hijacking things
  ScrollTrigger.scrollerProxy("main", {
    scrollTop(value) {
      return arguments.length
        ? locoScroll.scrollTo(value, 0, 0)
        : locoScroll.scroll.instance.scroll.y;
    }, // we don't have to define a scrollLeft because we're only scrolling vertically.
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
    pinType: document.querySelector("main").style.transform
      ? "transform"
      : "fixed",
  });

  // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll.
  ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

  // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
  ScrollTrigger.refresh();
}
locomotive();

// loader
function loader() {
  document.body.style.overflow = 'hidden';

  // img animation
  gsap.to("#loader img", {
    rotate: 360,
    duration: 1,
    ease: "power1.inOut",
    repeat: -1,
    repeatDelay: 0.4,
  });

  // removing loader page and re-enabling scrolling
  window.addEventListener("load", () => {
    gsap.to("#loader", {
      y: "-100%",
      duration: 0.5,
      ease: "power1.inOut",
      onComplete: () => {
        document.body.style.overflow = '';
      }
    });
  });
}

loader();


//  set text color
function setTextColor(targets, color) {
  targets.forEach((element) => {
    element.style.color = color;
  });
}

//  set stroke color
function setStrokeColor(targets, color) {
  targets.forEach((element) => {
    element.style.webkitTextStrokeColor = color;
  });
}

// light mode toggle
let mode_toggle = false; 
function light_mode() {
  const mode = document.querySelector("#mode");
  const marquee_nodeList = document.querySelectorAll("#herosection_marquee h1");
  const hollow_text_nodeList = document.querySelectorAll("#herosection_marquee h1 span");
  const herosection_text_nodelist = document.querySelectorAll("#herosection_text");
  const pin1 = document.querySelectorAll("#pin1");
  const pin2 = document.querySelectorAll("#pin2");
  const pin3 = document.querySelectorAll("#pin3");
  const road_map = document.querySelectorAll("#road_map > p");
  const hr = document.querySelector("hr");
  const marquee_trio_p = document.querySelectorAll("#marquee_trio > p");
  const marquee_trio_div = document.querySelectorAll("#marquee_trio > div > div");
  const last_section_p = document.querySelectorAll("#last_section  p");
  const last_section_span = document.querySelectorAll("#last_section  span");
  const footer_div_span = document.querySelectorAll("footer > div span");
  const footer_hollow_text = document.querySelectorAll("footer span");
  const footer_text = document.querySelectorAll("footer span:last-child");
  const footer_svg = document.querySelector("footer a svg path");


  mode.addEventListener("click", () => {
    mode_toggle = !mode_toggle;
    

    if (mode_toggle) {
      // Set light mode styles
      document.body.style.backgroundColor = "#f5f5f5";
      document.body.removeAttribute("dark_mode");
      document.querySelector("nav").style.color = "black";
      mode.classList.replace("fa-sun", "fa-moon");
      setTextColor(marquee_nodeList, "black");
      setStrokeColor(hollow_text_nodeList, "black");
      setTextColor(herosection_text_nodelist, "black");
      setTextColor(pin1, "black");
      setTextColor(pin2, "black");
      setTextColor(pin3, "black");
      setTextColor(road_map, "black");
      hr.style.borderColor = "black";
      setTextColor(marquee_trio_p, "black");
      setStrokeColor(marquee_trio_div, "black");
      setTextColor(last_section_p, "black");
      document.querySelectorAll(".vertical_lines").forEach((element)=>{
        element.style.borderColor="black"
      })
      setTextColor(last_section_span, "black");

      footer_div_span.forEach((element) => {
        element.style.borderColor = "black";
        element.style.color = "black";
        
        element.addEventListener("mouseenter", () => {
            element.style.backgroundColor = "black";
            element.style.color = "white";
        });
    
        element.addEventListener("mouseleave", () => {
            element.style.backgroundColor = "";
            element.style.color = "black";
        });
    });
    
      setStrokeColor(footer_hollow_text,"black")
      setTextColor(footer_text,"black")

      footer_svg.setAttribute("fill","black");
 

    } else {
      // Set dark mode styles
      document.body.style.backgroundColor = "black";
      document.body.setAttribute("dark_mode", "true");
      document.querySelector("nav").style.color = "white";
      mode.classList.replace("fa-moon", "fa-sun");
      setTextColor(marquee_nodeList, "white");
      setStrokeColor(hollow_text_nodeList, "white");
      setTextColor(herosection_text_nodelist, "white");
      setTextColor(pin1, "white");
      setTextColor(pin2, "white");
      setTextColor(pin3, "white");
      setTextColor(road_map, "white");
      hr.style.borderColor = "grey";
      setTextColor(marquee_trio_p, "white");
      setStrokeColor(marquee_trio_div, "white");
      setTextColor(last_section_p, "white");
      document.querySelectorAll(".vertical_lines").forEach((element)=>{
        element.style.borderColor="#dadadacb"
      })
      setTextColor(last_section_span, "white");

      footer_div_span.forEach((element) => {
        element.style.borderColor = "white";
        element.style.color = "white";
        
        element.addEventListener("mouseenter", () => {
            element.style.backgroundColor = "white";
            element.style.color = "black";
        });
    
        element.addEventListener("mouseleave", () => {
            element.style.backgroundColor = "";
            element.style.color = "white";
        });
    });
    

      setStrokeColor(footer_hollow_text,"white")
      setTextColor(footer_text,"white")

      footer_svg.setAttribute("fill","white");
 
    
    }





  });

 
}
light_mode();


// navbar animation function
if(document.body.hasAttribute("dark_mode")){
  gsap.to("nav", {
    color: "black",
    duration: 0.1,
    scrollTrigger: {
      trigger: "#digital_avatar",
      scroller: "main",
      toggleActions: "play reset restart reverse",
      start: "300% 3%",
      end: "400% 3%",
    },
  });
}


// canvas
function canvas() {
  const canvas = document.querySelector("canvas");
  const context = canvas.getContext("2d");

  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  window.addEventListener("resize", function () {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render();
  });

  function files(index) {
    let data = `CYBERFICTION-IMAGES/male0001.png
    CYBERFICTION-IMAGES/male0002.png
    CYBERFICTION-IMAGES/male0003.png
    CYBERFICTION-IMAGES/male0004.png
    CYBERFICTION-IMAGES/male0005.png
    CYBERFICTION-IMAGES/male0006.png
    CYBERFICTION-IMAGES/male0007.png
    CYBERFICTION-IMAGES/male0008.png
    CYBERFICTION-IMAGES/male0009.png
    CYBERFICTION-IMAGES/male0010.png
    CYBERFICTION-IMAGES/male0011.png
    CYBERFICTION-IMAGES/male0012.png
    CYBERFICTION-IMAGES/male0013.png
    CYBERFICTION-IMAGES/male0014.png
    CYBERFICTION-IMAGES/male0015.png
    CYBERFICTION-IMAGES/male0016.png
    CYBERFICTION-IMAGES/male0017.png
    CYBERFICTION-IMAGES/male0018.png
    CYBERFICTION-IMAGES/male0019.png
    CYBERFICTION-IMAGES/male0020.png
    CYBERFICTION-IMAGES/male0021.png
    CYBERFICTION-IMAGES/male0022.png
    CYBERFICTION-IMAGES/male0023.png
    CYBERFICTION-IMAGES/male0024.png
    CYBERFICTION-IMAGES/male0025.png
    CYBERFICTION-IMAGES/male0026.png
    CYBERFICTION-IMAGES/male0027.png
    CYBERFICTION-IMAGES/male0028.png
    CYBERFICTION-IMAGES/male0029.png
    CYBERFICTION-IMAGES/male0030.png
    CYBERFICTION-IMAGES/male0031.png
    CYBERFICTION-IMAGES/male0032.png
    CYBERFICTION-IMAGES/male0033.png
    CYBERFICTION-IMAGES/male0034.png
    CYBERFICTION-IMAGES/male0035.png
    CYBERFICTION-IMAGES/male0036.png
    CYBERFICTION-IMAGES/male0037.png
    CYBERFICTION-IMAGES/male0038.png
    CYBERFICTION-IMAGES/male0039.png
    CYBERFICTION-IMAGES/male0040.png
    CYBERFICTION-IMAGES/male0041.png
    CYBERFICTION-IMAGES/male0042.png
    CYBERFICTION-IMAGES/male0043.png
    CYBERFICTION-IMAGES/male0044.png
    CYBERFICTION-IMAGES/male0045.png
    CYBERFICTION-IMAGES/male0046.png
    CYBERFICTION-IMAGES/male0047.png
    CYBERFICTION-IMAGES/male0048.png
    CYBERFICTION-IMAGES/male0049.png
    CYBERFICTION-IMAGES/male0050.png
    CYBERFICTION-IMAGES/male0051.png
    CYBERFICTION-IMAGES/male0052.png
    CYBERFICTION-IMAGES/male0053.png
    CYBERFICTION-IMAGES/male0054.png
    CYBERFICTION-IMAGES/male0055.png
    CYBERFICTION-IMAGES/male0056.png
    CYBERFICTION-IMAGES/male0057.png
    CYBERFICTION-IMAGES/male0058.png
    CYBERFICTION-IMAGES/male0059.png
    CYBERFICTION-IMAGES/male0060.png
    CYBERFICTION-IMAGES/male0061.png
    CYBERFICTION-IMAGES/male0062.png
    CYBERFICTION-IMAGES/male0063.png
    CYBERFICTION-IMAGES/male0064.png
    CYBERFICTION-IMAGES/male0065.png
    CYBERFICTION-IMAGES/male0066.png
    CYBERFICTION-IMAGES/male0067.png
    CYBERFICTION-IMAGES/male0068.png
    CYBERFICTION-IMAGES/male0069.png
    CYBERFICTION-IMAGES/male0070.png
    CYBERFICTION-IMAGES/male0071.png
    CYBERFICTION-IMAGES/male0072.png
    CYBERFICTION-IMAGES/male0073.png
    CYBERFICTION-IMAGES/male0074.png
    CYBERFICTION-IMAGES/male0075.png
    CYBERFICTION-IMAGES/male0076.png
    CYBERFICTION-IMAGES/male0077.png
    CYBERFICTION-IMAGES/male0078.png
    CYBERFICTION-IMAGES/male0079.png
    CYBERFICTION-IMAGES/male0080.png
    CYBERFICTION-IMAGES/male0081.png
    CYBERFICTION-IMAGES/male0082.png
    CYBERFICTION-IMAGES/male0083.png
    CYBERFICTION-IMAGES/male0084.png
    CYBERFICTION-IMAGES/male0085.png
    CYBERFICTION-IMAGES/male0086.png
    CYBERFICTION-IMAGES/male0087.png
    CYBERFICTION-IMAGES/male0088.png
    CYBERFICTION-IMAGES/male0089.png
    CYBERFICTION-IMAGES/male0090.png
    CYBERFICTION-IMAGES/male0091.png
    CYBERFICTION-IMAGES/male0092.png
    CYBERFICTION-IMAGES/male0093.png
    CYBERFICTION-IMAGES/male0094.png
    CYBERFICTION-IMAGES/male0095.png
    CYBERFICTION-IMAGES/male0096.png
    CYBERFICTION-IMAGES/male0097.png
    CYBERFICTION-IMAGES/male0098.png
    CYBERFICTION-IMAGES/male0099.png
    CYBERFICTION-IMAGES/male0100.png
    CYBERFICTION-IMAGES/male0101.png
    CYBERFICTION-IMAGES/male0102.png
    CYBERFICTION-IMAGES/male0103.png
    CYBERFICTION-IMAGES/male0104.png
    CYBERFICTION-IMAGES/male0105.png
    CYBERFICTION-IMAGES/male0106.png
    CYBERFICTION-IMAGES/male0107.png
    CYBERFICTION-IMAGES/male0108.png
    CYBERFICTION-IMAGES/male0109.png
    CYBERFICTION-IMAGES/male0110.png
    CYBERFICTION-IMAGES/male0111.png
    CYBERFICTION-IMAGES/male0112.png
    CYBERFICTION-IMAGES/male0113.png
    CYBERFICTION-IMAGES/male0114.png
    CYBERFICTION-IMAGES/male0115.png
    CYBERFICTION-IMAGES/male0116.png
    CYBERFICTION-IMAGES/male0117.png
    CYBERFICTION-IMAGES/male0118.png
    CYBERFICTION-IMAGES/male0119.png
    CYBERFICTION-IMAGES/male0120.png
    CYBERFICTION-IMAGES/male0121.png
    CYBERFICTION-IMAGES/male0122.png
    CYBERFICTION-IMAGES/male0123.png
    CYBERFICTION-IMAGES/male0124.png
    CYBERFICTION-IMAGES/male0125.png
    CYBERFICTION-IMAGES/male0126.png
    CYBERFICTION-IMAGES/male0127.png
    CYBERFICTION-IMAGES/male0128.png
    CYBERFICTION-IMAGES/male0129.png
    CYBERFICTION-IMAGES/male0130.png
    CYBERFICTION-IMAGES/male0131.png
    CYBERFICTION-IMAGES/male0132.png
    CYBERFICTION-IMAGES/male0133.png
    CYBERFICTION-IMAGES/male0134.png
    CYBERFICTION-IMAGES/male0135.png
    CYBERFICTION-IMAGES/male0136.png
    CYBERFICTION-IMAGES/male0137.png
    CYBERFICTION-IMAGES/male0138.png
    CYBERFICTION-IMAGES/male0139.png
    CYBERFICTION-IMAGES/male0140.png
    CYBERFICTION-IMAGES/male0141.png
    CYBERFICTION-IMAGES/male0142.png
    CYBERFICTION-IMAGES/male0143.png
    CYBERFICTION-IMAGES/male0144.png
    CYBERFICTION-IMAGES/male0145.png
    CYBERFICTION-IMAGES/male0146.png
    CYBERFICTION-IMAGES/male0147.png
    CYBERFICTION-IMAGES/male0148.png
    CYBERFICTION-IMAGES/male0149.png
    CYBERFICTION-IMAGES/male0150.png
    CYBERFICTION-IMAGES/male0151.png
    CYBERFICTION-IMAGES/male0152.png
    CYBERFICTION-IMAGES/male0153.png
    CYBERFICTION-IMAGES/male0154.png
    CYBERFICTION-IMAGES/male0155.png
    CYBERFICTION-IMAGES/male0156.png
    CYBERFICTION-IMAGES/male0157.png
    CYBERFICTION-IMAGES/male0158.png
    CYBERFICTION-IMAGES/male0159.png
    CYBERFICTION-IMAGES/male0160.png
    CYBERFICTION-IMAGES/male0161.png
    CYBERFICTION-IMAGES/male0162.png
    CYBERFICTION-IMAGES/male0163.png
    CYBERFICTION-IMAGES/male0164.png
    CYBERFICTION-IMAGES/male0165.png
    CYBERFICTION-IMAGES/male0166.png
    CYBERFICTION-IMAGES/male0167.png
    CYBERFICTION-IMAGES/male0168.png
    CYBERFICTION-IMAGES/male0169.png
    CYBERFICTION-IMAGES/male0170.png
    CYBERFICTION-IMAGES/male0171.png
    CYBERFICTION-IMAGES/male0172.png
    CYBERFICTION-IMAGES/male0173.png
    CYBERFICTION-IMAGES/male0174.png
    CYBERFICTION-IMAGES/male0175.png
    CYBERFICTION-IMAGES/male0176.png
    CYBERFICTION-IMAGES/male0177.png
    CYBERFICTION-IMAGES/male0178.png
    CYBERFICTION-IMAGES/male0179.png
    CYBERFICTION-IMAGES/male0180.png
    CYBERFICTION-IMAGES/male0181.png
    CYBERFICTION-IMAGES/male0182.png
    CYBERFICTION-IMAGES/male0183.png
    CYBERFICTION-IMAGES/male0184.png
    CYBERFICTION-IMAGES/male0185.png
    CYBERFICTION-IMAGES/male0186.png
    CYBERFICTION-IMAGES/male0187.png
    CYBERFICTION-IMAGES/male0188.png
    CYBERFICTION-IMAGES/male0189.png
    CYBERFICTION-IMAGES/male0190.png
    CYBERFICTION-IMAGES/male0191.png
    CYBERFICTION-IMAGES/male0192.png
    CYBERFICTION-IMAGES/male0193.png
    CYBERFICTION-IMAGES/male0194.png
    CYBERFICTION-IMAGES/male0195.png
    CYBERFICTION-IMAGES/male0196.png
    CYBERFICTION-IMAGES/male0197.png
    CYBERFICTION-IMAGES/male0198.png
    CYBERFICTION-IMAGES/male0199.png
    CYBERFICTION-IMAGES/male0200.png
    CYBERFICTION-IMAGES/male0201.png
    CYBERFICTION-IMAGES/male0202.png
    CYBERFICTION-IMAGES/male0203.png
    CYBERFICTION-IMAGES/male0204.png
    CYBERFICTION-IMAGES/male0205.png
    CYBERFICTION-IMAGES/male0206.png
    CYBERFICTION-IMAGES/male0207.png
    CYBERFICTION-IMAGES/male0208.png
    CYBERFICTION-IMAGES/male0209.png
    CYBERFICTION-IMAGES/male0210.png
    CYBERFICTION-IMAGES/male0211.png
    CYBERFICTION-IMAGES/male0212.png
    CYBERFICTION-IMAGES/male0213.png
    CYBERFICTION-IMAGES/male0214.png
    CYBERFICTION-IMAGES/male0215.png
    CYBERFICTION-IMAGES/male0216.png
    CYBERFICTION-IMAGES/male0217.png
    CYBERFICTION-IMAGES/male0218.png
    CYBERFICTION-IMAGES/male0219.png
    CYBERFICTION-IMAGES/male0220.png
    CYBERFICTION-IMAGES/male0221.png
    CYBERFICTION-IMAGES/male0222.png
    CYBERFICTION-IMAGES/male0223.png
    CYBERFICTION-IMAGES/male0224.png
    CYBERFICTION-IMAGES/male0225.png
    CYBERFICTION-IMAGES/male0226.png
    CYBERFICTION-IMAGES/male0227.png
    CYBERFICTION-IMAGES/male0228.png
    CYBERFICTION-IMAGES/male0229.png
    CYBERFICTION-IMAGES/male0230.png
    CYBERFICTION-IMAGES/male0231.png
    CYBERFICTION-IMAGES/male0232.png
    CYBERFICTION-IMAGES/male0233.png
    CYBERFICTION-IMAGES/male0234.png
    CYBERFICTION-IMAGES/male0235.png
    CYBERFICTION-IMAGES/male0236.png
    CYBERFICTION-IMAGES/male0237.png
    CYBERFICTION-IMAGES/male0238.png
    CYBERFICTION-IMAGES/male0239.png
    CYBERFICTION-IMAGES/male0240.png
    CYBERFICTION-IMAGES/male0241.png
    CYBERFICTION-IMAGES/male0242.png
    CYBERFICTION-IMAGES/male0243.png
    CYBERFICTION-IMAGES/male0244.png
    CYBERFICTION-IMAGES/male0245.png
    CYBERFICTION-IMAGES/male0246.png
    CYBERFICTION-IMAGES/male0247.png
    CYBERFICTION-IMAGES/male0248.png
    CYBERFICTION-IMAGES/male0249.png
    CYBERFICTION-IMAGES/male0250.png
    CYBERFICTION-IMAGES/male0251.png
    CYBERFICTION-IMAGES/male0252.png
    CYBERFICTION-IMAGES/male0253.png
    CYBERFICTION-IMAGES/male0254.png
    CYBERFICTION-IMAGES/male0255.png
    CYBERFICTION-IMAGES/male0256.png
    CYBERFICTION-IMAGES/male0257.png
    CYBERFICTION-IMAGES/male0258.png
    CYBERFICTION-IMAGES/male0259.png
    CYBERFICTION-IMAGES/male0260.png
    CYBERFICTION-IMAGES/male0261.png
    CYBERFICTION-IMAGES/male0262.png
    CYBERFICTION-IMAGES/male0263.png
    CYBERFICTION-IMAGES/male0264.png
    CYBERFICTION-IMAGES/male0265.png
    CYBERFICTION-IMAGES/male0266.png
    CYBERFICTION-IMAGES/male0267.png
    CYBERFICTION-IMAGES/male0268.png
    CYBERFICTION-IMAGES/male0269.png
    CYBERFICTION-IMAGES/male0270.png
    CYBERFICTION-IMAGES/male0271.png
    CYBERFICTION-IMAGES/male0272.png
    CYBERFICTION-IMAGES/male0273.png
    CYBERFICTION-IMAGES/male0274.png
    CYBERFICTION-IMAGES/male0275.png
    CYBERFICTION-IMAGES/male0276.png
    CYBERFICTION-IMAGES/male0277.png
    CYBERFICTION-IMAGES/male0278.png
    CYBERFICTION-IMAGES/male0279.png
    CYBERFICTION-IMAGES/male0280.png
    CYBERFICTION-IMAGES/male0281.png
    CYBERFICTION-IMAGES/male0282.png
    CYBERFICTION-IMAGES/male0283.png
    CYBERFICTION-IMAGES/male0284.png
    CYBERFICTION-IMAGES/male0285.png
    CYBERFICTION-IMAGES/male0286.png
    CYBERFICTION-IMAGES/male0287.png
    CYBERFICTION-IMAGES/male0288.png
    CYBERFICTION-IMAGES/male0289.png
    CYBERFICTION-IMAGES/male0290.png
    CYBERFICTION-IMAGES/male0291.png
    CYBERFICTION-IMAGES/male0292.png
    CYBERFICTION-IMAGES/male0293.png
    CYBERFICTION-IMAGES/male0294.png
    CYBERFICTION-IMAGES/male0295.png
    CYBERFICTION-IMAGES/male0296.png
    CYBERFICTION-IMAGES/male0297.png
    CYBERFICTION-IMAGES/male0298.png
    CYBERFICTION-IMAGES/male0299.png
    CYBERFICTION-IMAGES/male0300.png`;
    return data.split("\n")[index];
  }

  const frameCount = 300;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 0; i < frameCount; i++) {
    const img = new Image();
    img.src = files(i);
    images.push(img);
  }

  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: "frame",
    ease: "none",
    scrollTrigger: {
      scrub: 0.01,
      trigger: "canvas",
      pin: true,
      start: "top top",
      end: "725% top",
      scroller: "main",
    },
    onUpdate: render,
  });

  images[1].onload = render;

  function render() {
    scaleImage(images[imageSeq.frame], context);
  }

  function scaleImage(img, ctx) {
    var canvas = ctx.canvas;
    var hRatio = canvas.width / img.width;
    var vRatio = canvas.height / img.height;
    var ratio = Math.max(hRatio, vRatio);
    var centerShift_x = (canvas.width - img.width * ratio) / 2;
    var centerShift_y = (canvas.height - img.height * ratio) / 2;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(
      img,
      0,
      0,
      img.width,
      img.height,
      centerShift_x,
      centerShift_y,
      img.width * ratio,
      img.height * ratio
    );
  }
  ScrollTrigger.create({
    trigger: "#herosection",
    pin: true,
    scroller: "main",
    scrub: 5,
    start: "top top",
    end: "bottom% top",
  });
}
canvas();

// text pining
function Text_pinning() {
  gsap.to("#pin1", {
    scrollTrigger: {
      trigger: "#pin1",
      scroller: "main",
      pin: true,
      scrub: 5,
      start: "top top",
      end: "bottom top",
    },
  });
  gsap.to("#pin2", {
    scrollTrigger: {
      trigger: "#pin2",
      scroller: "main",
      pin: true,
      scrub: 5,
      start: "top top",
      end: "bottom top",
    },
  });
  gsap.to("#pin3", {
    scrollTrigger: {
      trigger: "#pin3",
      scroller: "main",
      pin: true,
      scrub: 5,
      start: "top top",
      end: "bottom top",
    },
  });
}
Text_pinning();