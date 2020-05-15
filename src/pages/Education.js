import React, { useState, useEffect } from "react";
import "../styles/EducationStyles.scss";
import { makeStyles } from "@material-ui/core/styles";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import Loader from "../components/Loader";
import Axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  heading: {
    fontSize: theme.typography.pxToRem(20),
    flexShrink: "50%",
    fontFamily: "Belleza",
    textDecoration: "none",
    transition: "all 600ms",
    "&:hover": {
      fontSize: theme.typography.pxToRem(23),
    },
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(18),
    color: theme.palette.text.secondary,
    paddingLeft: "1%",
    fontFamily: "Belleza",
  },
}));

export default function Education() {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
  const [sections, setSections] = useState([]);
  const [loading, setLoading] = useState(true);

  //   const sleep = (milliseconds) => {
  //     return new Promise((resolve) => setTimeout(resolve, milliseconds));
  //   };

  useEffect(() => {
    getSections();
  }, []); // eslint-disable-line

  const getSections = async () => {
    Axios.get("../../Edu.json").then((response) => {
      setSections(response.data.sections);
      setLoading(false);
    });
  };

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className="edu">
      <div className="container">
        <h1>Haaga Helia UAS 2017-2020 (257 cr GPA 4.08)</h1>
        {loading && <Loader />}
        {sections.map((i) => (
          <div key={i.name}>
            <h2>{i.name}</h2>
            <div className={classes.root}>
              {i.courses.map((g) => (
                <ExpansionPanel
                  key={g.id}
                  expanded={expanded === `${g.id}`}
                  onChange={handleChange(`${g.id}`)}
                >
                  <ExpansionPanelSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                  >
                    <Typography className={classes.heading}>
                      {g.title}
                    </Typography>
                    <Typography className={classes.secondaryHeading}>
                      <a
                        href={g.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {<InsertLinkIcon />}{" "}
                      </a>
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails>
                    <Typography>{g.desc}</Typography>
                    {g.url ? (
                      <Typography className={classes.secondaryHeading}>
                        <a
                          href={g.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {">"}project
                        </a>
                      </Typography>
                    ) : null}
                    {g.video ? (
                      <Typography className={classes.secondaryHeading}>
                        <a
                          href={g.video}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {"_>"}videos
                        </a>
                      </Typography>
                    ) : null}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ))}
            </div>
          </div>
        ))}
        <section className="empty"></section>
      </div>
    </div>
  );
}
