import { useEffect } from "react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import HoverLinks from "./HoverLinks";
import { gsap } from "gsap";
import Lenis from "lenis";
import "./styles/Navbar.css";

gsap.registerPlugin(ScrollTrigger);

/** Lenis instance — smooth scroll without GSAP Club ScrollSmoother (trial redirects to greensock.com). */
export let lenis: Lenis | null = null;

const Navbar = () => {
  useEffect(() => {
    const wrapper = document.querySelector(
      "#smooth-wrapper"
    ) as HTMLElement | null;
    const content = document.querySelector(
      "#smooth-content"
    ) as HTMLElement | null;
    if (!wrapper || !content) return;

    const smooth = new Lenis({
      wrapper,
      content,
      lerp: 0.1,
      smoothWheel: true,
      autoResize: true,
    });
    lenis = smooth;

    smooth.on("scroll", ScrollTrigger.update);

    const ticker = (time: number) => {
      smooth.raf(time * 1000);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    ScrollTrigger.scrollerProxy(wrapper, {
      scrollTop(value?: number) {
        if (arguments.length && typeof value === "number") {
          smooth.scrollTo(value, { immediate: true });
        }
        return smooth.scroll;
      },
      getBoundingClientRect() {
        return {
          top: 0,
          left: 0,
          width: window.innerWidth,
          height: window.innerHeight,
        };
      },
    });

    ScrollTrigger.defaults({ scroller: wrapper });

    smooth.scrollTo(0, { immediate: true });
    smooth.stop();

    const links = document.querySelectorAll(".header ul a");
    const onLinkClick = (e: Event) => {
      if (window.innerWidth > 1024) {
        e.preventDefault();
        const elem = e.currentTarget as HTMLAnchorElement;
        const section = elem.getAttribute("data-href");
        if (section) {
          smooth.scrollTo(section, {});
        }
      }
    };
    links.forEach((elem) => {
      elem.addEventListener("click", onLinkClick);
    });

    const onResize = () => {
      smooth.resize();
      ScrollTrigger.refresh();
    };
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      links.forEach((elem) => {
        elem.removeEventListener("click", onLinkClick);
      });
      gsap.ticker.remove(ticker);
      smooth.destroy();
      lenis = null;
    };
  }, []);
  return (
    <>
      <div className="header">
        <a href="/#" className="navbar-title" data-cursor="disable">
          Logo
        </a>
        <a
          href="mailto:example@mail.com"
          className="navbar-connect"
          data-cursor="disable"
        >
          example@mail.com
        </a>
        <ul>
          <li>
            <a data-href="#about" href="#about">
              <HoverLinks text="ABOUT" />
            </a>
          </li>
          <li>
            <a data-href="#work" href="#work">
              <HoverLinks text="WORK" />
            </a>
          </li>
          <li>
            <a data-href="#contact" href="#contact">
              <HoverLinks text="CONTACT" />
            </a>
          </li>
        </ul>
      </div>

      <div className="landing-circle1"></div>
      <div className="landing-circle2"></div>
      <div className="nav-fade"></div>
    </>
  );
};

export default Navbar;
