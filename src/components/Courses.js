import React from "react";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InsertLinkIcon from "@material-ui/icons/InsertLink";
import { useStyles } from "../styles/ExpandedPanelSyles";

export default function Courses(props) {
  const sections = props.sections;
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      {sections.map((i) => (
        <div className={classes.root} key={i.name}>
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
                    {g.url ? (
                      <a href={g.url} target="_blank" rel="noopener noreferrer">
                        {">>"}project
                      </a>
                    ) : null}
                    {g.video ? (
                      <a
                        href={g.video}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {">>"}videos
                      </a>
                    ) : null}
                  </Typography>
                  <Typography className={classes.secondaryHeading}>
                    <a href={g.link} target="_blank" rel="noopener noreferrer">
                      {<InsertLinkIcon />}{" "}
                    </a>
                  </Typography>
                </ExpansionPanelSummary>
                <ExpansionPanelDetails>
                  <Typography>{g.desc}</Typography>
                </ExpansionPanelDetails>
              </ExpansionPanel>
            ))}
          </div>
        </div>
      ))}
    </>
  );
}
