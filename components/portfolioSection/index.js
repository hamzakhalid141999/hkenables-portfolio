import React, { useState, useEffect } from "react";
import classes from "./portfolioSection.module.css";
import bg from "../../public/assets/portfolio_section/rentto.png";
import github from "../../public/assets/aboutme_section_assets/github.svg";
import ai from "../../public/assets/aboutme_section_assets/ai.svg";
import aws from "../../public/assets/aboutme_section_assets/aws.svg";
import dart from "../../public/assets/aboutme_section_assets/dart.svg";
import figma from "../../public/assets/aboutme_section_assets/figma.svg";
import js from "../../public/assets/aboutme_section_assets/js.svg";
import metamask from "../../public/assets/aboutme_section_assets/metamask.svg";
import next from "../../public/assets/aboutme_section_assets/next.svg";
import psd from "../../public/assets/aboutme_section_assets/psd.svg";
import react from "../../public/assets/aboutme_section_assets/react.svg";
import ts from "../../public/assets/aboutme_section_assets/ts.svg";
import graph from "../../public/assets/aboutme_section_assets/graphql.svg";
import { useAnimation, useAnimationFrame, motion } from "framer-motion";
import right_arrow from "../../public/assets/portfolio_section/right_arrow.svg";
import { PROJECTS_DATA } from "../../projectsData";

function PortfolioSection() {
  const delay = (ms) => new Promise((res) => setTimeout(res, ms));
  const splashScreenAnimation = useAnimation();
  const headingAnimation = useAnimation();
  const techAnimation = useAnimation();
  const [projectData, setProjectData] = useState();
  const [currentProjectIndex, setCurrentProjectIndex] = useState(0);

  useEffect(() => {
    if (PROJECTS_DATA) {
      setProjectData(PROJECTS_DATA[currentProjectIndex]);
    }
  }, [PROJECTS_DATA]);

  console.log(projectData);

  const handleTriggleProjectPictureAnimation = async () => {
    splashScreenAnimation.start({
      x: "6vw",
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    });
    await delay(250);

    splashScreenAnimation.start({
      x: "-6vw",
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    });
    await delay(250);
    console.log(PROJECTS_DATA?.length, currentProjectIndex + 1);
    if (PROJECTS_DATA?.length === currentProjectIndex + 1) {
      setCurrentProjectIndex(0);
      setProjectData(PROJECTS_DATA[0]);
    } else {
      setProjectData(PROJECTS_DATA[currentProjectIndex + 1]);
      setCurrentProjectIndex(currentProjectIndex + 1);
    }
    splashScreenAnimation.start({
      x: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    });
  };

  const handleToggleHeadingAnimation = async () => {
    headingAnimation.start({
      y: "-10vh",
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    });

    techAnimation.start({
      opacity: 0,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    });

    await delay(500);
    headingAnimation.start({
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    });

    techAnimation.start({
      opacity: 1,
      transition: {
        type: "spring",
        duration: 0.5,
      },
    });
  };

  return (
    <div
      style={{
        backgroundImage: `url(${projectData?.project_image.src})`,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className={classes.container}
    >
      <div
        className={classes.left_panel}
        style={{ backgroundColor: projectData?.dark_color }}
      />
      <div
        style={{ backgroundColor: projectData?.secondary_color }}
        className={classes.bottom_panel}
      />
      <div className={classes.left_panel_blurred} />
      <div
        // style={{ backgroundColor: projectData?.primary_color }}
        className={classes.overlay}
      ></div>
      <div className={classes.tech_stack_container}>
        <motion.div animate={techAnimation} className={classes.icons_container}>
          <img
            onClick={async () => {
              handleTriggleProjectPictureAnimation();
              await delay(150);
              handleToggleHeadingAnimation();
            }}
            className={classes.right_arrow}
            src={right_arrow.src}
          />
          {projectData?.project_tech?.map((tech, index) => (
            <img src={tech.src} />
          ))}
        </motion.div>
      </div>

      <div className={classes.overlay_blurred}>
        <h2>asdsad</h2>
      </div>

      <h1 className={classes.heading}>PORTFOLIO</h1>
      <div className={classes.content_container}>
        <div className={classes.heading_row}>
          <motion.div
            animate={headingAnimation}
            className={classes.heading_container}
          >
            <h2 className={classes.project_title}>
              {projectData?.project_name}
            </h2>
            <div
              style={{ backgroundColor: projectData?.secondary_color }}
              className={classes.heading_underline}
            />
          </motion.div>

          <div className={classes.tag_1}>
            <p>FREELANCE PROJECT</p>
          </div>

          <div className={classes.tag_2}>
            <p>SOLO FRONTEND DEV</p>
          </div>
        </div>

        <div className={classes.project_desc_container}>
          <motion.div
            animate={headingAnimation}
            className={classes.description_section}
          >
            <h2>{projectData?.project_type}</h2>
            <p>{projectData?.project_description}</p>
          </motion.div>

          <motion.div
            animate={splashScreenAnimation}
            className={classes.picture_section}
          >
            <div className={classes.code_link_tab}>
              <img src={github.src} />
            </div>
            <div
              style={{ backgroundColor: projectData?.dark_color }}
              className={classes.live_link_tab}
            >
              <p>LIVE LINK</p>
            </div>
            <img
              src={projectData?.project_image.src}
              className={classes.project_pic}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default PortfolioSection;
