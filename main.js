gsap.registerPlugin(ScrollTrigger);

let smoothScrolling = function () {
  const lenis = new Lenis({});

  lenis.on("scroll", (e) => {
    console.log(e);
  });

  lenis.on("scroll", ScrollTrigger.update);

  gsap.ticker.add((time) => {
    lenis.raf(time * 1000);
  });

  gsap.ticker.lagSmoothing(0);
};
smoothScrolling();

// "all": function () { // 모든 구간
$(window).scroll(function () {
  //$(this) -> $(window)
  let scrollTop = $(this).scrollTop();
  //offset().top : 전체 문서의 top에서 service영역의 top까지의 거리
  let offsets = $(".section1").offset().top;
  let offsets2 = $(".section2").offset().top;

  if (scrollTop > offsets) {
    $(".top-header").addClass("hide");
  } else {
    $(".top-header").removeClass("hide");
  }
  if (scrollTop > offsets) {
    $(".active-header").addClass("show");
  } else {
    $(".active-header").removeClass("show");
  }
  if (scrollTop > offsets2) {
    $("header").addClass("hide");
  } else {
    $("header").removeClass("hide");
  }
  if (scrollTop > offsets2) {
    $(".ani-right").addClass("hide");
  } else {
    $(".ani-right").removeClass("hide");
  }
});

function visual() {
  gsap
    .timeline({
      scrollTrigger: {
        trigger: ".sectionl",
        start: "0% 0%",
        end: "30% 0%",
        scrub: 1,
        // markers:true,
      },
    })
    .to(".thumb-box.box1", {
      "z-index": 1,
    })
    .to(".thumb-box.box2", {
      "z-index": 2,
    })
    .to(".thumb-box.box3", {
      "z-index": 3,
    })
    .to(".thumb-box.box4", {
      "z-index": 4,
    });

  const mainScrub = document.querySelectorAll(".section1 .visual_area");
  mainScrub.forEach((element) => {
    dataY = element.dataset.y;
    gsap.to(element, {
      scrollTrigger: {
        trigger: ".section1",
        start: "0% 50%",
        end: "50% 0%",
        scrub: 1,
        duration: 3,
        // markers: true,
      },
      yPercent: dataY,
    });
  });
}
visual();

function cursor() {
  gsap.set(".ball", {
    xPercent: -50,
    yPercent: -50,
  });
  let ball = document.querySelector(".ball");
  let pos = {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2,
  };
  let mouse = {
    x: pos.x,
    y: pos.y,
  };
  let speed = 1;
  let xSet = gsap.quickSetter(ball, "x", "px");
  let ySet = gsap.quickSetter(ball, "y", "px");

  window.addEventListener("mousemove", function (e) {
    console.log(e);
    mouse.x = e.x;
    mouse.y = e.y;
  });

  gsap.ticker.add(function () {
    let dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  });

  let section1 = document.querySelector(".wrap-title .mg-btn");
  section1.addEventListener("mouseover", () => {
    gsap.to(".ball", {
      scale: 1.5,
    });
    gsap.to(".ball span", {
      opacity: 1,
    });
  });
  section1.addEventListener("mouseleave", () => {
    gsap.to(".ball", {
      scale: 1,
    });
    gsap.to(".ball span", {
      opacity: 0,
    });
  });
}
cursor();

function benefits() {
  gsap.to(".title", {
    scrollTrigger: {
      trigger: ".history_1",
      start: "top bottom",
      scrub: 1.9,
    },
    // forEach((각각요소,인덱스)=>{})
    // y:(인덱스,각각요소)=>{}
    xPercent: -50,
  });
}
benefits();

function ani_txt() {
  let clutter = "";
  //textContent  --> 테스트만 추출
  let page2_h2 = document.querySelector(".history_1>p").textContent.split("");

  page2_h2.forEach(function (dets) {
    clutter += `<span>${dets}</span>`;
    //clutter = clutter + `<span>T</span>`
    document.querySelector(".history_1>p").innerHTML = clutter;
  });

  gsap.to(".history_1>p>span", {
    scrollTrigger: {
      trigger: ".history_1>p>span",
      start: "top bottom",
      end: "bottom top",
      scrub: 0.5,
    },
    color: "#fff",
    stagger: 0.2,
  });
}
ani_txt();

function particle() {
  const footer = gsap.timeline();
  footer
    .addLabel("a")
    .to(
      ".particle1",
      { opacity: 1, rotate: -50, yPercent: 70, duration: 50 },
      "a"
    )
    .to(".particle2", { opacity: 1, rotate: 10, duration: 40 }, "a")
    .to(
      ".particle3",
      { opacity: 1, rotate: 240, yPercent: -100, duration: 50 },
      "a"
    );

  ScrollTrigger.create({
    animation: footer,
    trigger: ".history_1",
    start: "top 50%",
    end: "bottom 50%",
    scrub: true,
    pin: false,
    markers: true,
  });
}
particle();

let cardWrapper = document.querySelectorAll(".cards_item");
let cardsEl = document.querySelectorAll(".cards_el");

cardWrapper.forEach(function (e, i) {
  //e:아이템, i:아이템의 index
  let card = cardsEl[i];
  let img = e.querySelector(".cards_img img");
  let scale = 1;
  let rotate = 0;

  gsap.to(card, {
    scale: scale,
    rotateX: rotate,
    transformOrigin: "center top",
    ease: "none",
    scrollTrigger: {
      trigger: e,
      start: "top ",
      end: "bottom +=650px",
      pin: e,
      endTrigger: ".end-anim",
      scrub: 1,
      pinSpacing: false,
    },
  });
});
